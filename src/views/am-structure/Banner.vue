<template>
  <div class="app-container calendar-list-container">
    <!-- <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div> -->

    <el-table :key='tableKey' :data="this.backMsg"  border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="编号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.serialNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="图片" min-width="100">
        <template slot-scope="scope" v-if="scope.row.name">
          <img style="width:200px;height:120px" :src="scope.row.name" alt="">
          <!-- <span>{{scope.row.name}}</span> -->
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="url链接" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="更新日期">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="150px" align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">下架</span>
          <span v-else-if="scope.row.status == 1">上架</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <!-- <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

     <el-pagination
      style="width: 400px;margin:30px auto;"
      @current-change="handleCurrentChange"
      :current-page.sync="viewOptions.pageNo"
      :page-size="10"
      :background="true"
      layout="total, prev, pager, next"
      :total="pageList.total"
      :page-count="pageList.pages">
    </el-pagination>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <!-- <el-form-item label="编号" prop="title">
          <span v-if="textMap[dialogStatus] == 'add' ">{{temp.serialNumber}}</span>
          <el-input v-else v-model="temp.serialNumber"></el-input>
        </el-form-item> -->
        <el-form-item label="图片预览" prop="title" style="height: 140px">
          <img :src="temp.name" alt="" style="width: 200px;height:120px">
        </el-form-item>
        <el-form-item label="图片地址" prop="title">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="url链接" prop="title">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogFormAdd">
      <el-form :rules="rules" ref="dataFormAdd" :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <!-- <el-form-item label="编号" prop="title">
          <span v-if="textMap[dialogStatus] == 'add' ">{{temp.serialNumber}}</span>
          <el-input v-else v-model="temp.serialNumber"></el-input>
        </el-form-item> -->
        <el-form-item label="平台名称" prop="title">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="url链接" prop="title">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取消</el-button>
        <el-button type="primary" @click="addDataSuccess">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      pageList: {

      },
      viewOptions:  {
        type: 4 ,  // 0:新媒体 1:首页头条配置 2: 首页广告 3:二维码 4:banner 5:专题策划一组 6:专题策划二组 7:专题策划广告 8:浮窗配置
        pageNo: 1,  // 页数 
        pageSize: 10   // 请求多少条
      },

      backMsg: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      // 修改的弹窗
      dialogFormVisible: false,
      // 添加的弹框
      dialogFormAdd: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '删除',
        add: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: false, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
      // 浮窗配置  /file/upload/image
    this.$post(`/admin/titleLink/search`, this.viewOptions)
    .then( res => {
        this.pageList = res.data;
        this.backMsg = res.data.list;
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.viewOptions.pageNo = val;
      this.$post(`/admin/titleLink/search`, this.viewOptions)
      .then( res => {
          this.pageList = res.data;
          this.backMsg = res.data.list;
      })
    },

    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // 表格的数据
        this.list = response.data.items
        console.log(this.list)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$post('/admin/body/articleStatChenge', {
        "articleOrTitleLink": 1,
        "id": row.id,
        "status": 2
      })
      .then(res => {
        this.backMsg = this.backMsg.filter(function(v){
          return row.id !== v.id;
        });
        cthis.$post(`/admin/titleLink/search`, this.viewOptions)
        .then( res => {
            this.pageList = res.data;
            this.backMsg = res.data.list;
        })
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
      .catch( err => {
        this.$message({
          message: err,
          type: '操作失败'
        })
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormAdd = true
      console.log(this.temp)
      // this.$nextTick(() => {
      //   this.$refs['dataFormAdd'].validate((valid) => {
          
      //   })
      // })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新增 的确定按钮
    addDataSuccess() {
      console.log(this.temp)
      this.$post('/admin/titleLink/publish',{
          "id": 0,
          "name": this.temp.name,
          "type": 4,
          "url": this.temp.url
      })
      .then( res => {
          let o = new Date();
          this.temp.updateTime = `${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}`
          this.backMsg.push(this.temp);
          this.dialogFormAdd = false;

          this.$post(`/admin/titleLink/search`, this.viewOptions)
          .then( res => {
              this.pageList = res.data;
              this.backMsg = res.data.list;
          })

          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
      })
      .catch(err => {
          this.dialogFormAdd = false
          this.$notify({
            title: '失败',
            message: err,
            type: 'err',
            duration: 2000
          })
      })
      // this.$refs['dataForm'].validate((valid) => {
      //     console.log(valid)
      // })
    },
    // 修改
    updateData() {
        // console.log(this.$refs['dataForm'])
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          console.log(tempData)
          this.$post('/admin/titleLink/publish', {
              "id": tempData.id,
              "name": tempData.name,
              "type": 4,
              "url": tempData.url
          })
          .then(res => {
              for (const v of this.backMsg) {
                if (v.id === this.temp.id) {
                  const index = this.backMsg.indexOf(v)
                  this.backMsg.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false;

              this.$post(`/admin/titleLink/search`, this.viewOptions)
              .then( res => {
                  this.pageList = res.data;
                  this.backMsg = res.data.list;
              })

              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
          })
          .catch( err => {
              this.$notify({
                title: '失败',
                message: err,
                type: 'success',
                duration: 2000
              })
          })
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
