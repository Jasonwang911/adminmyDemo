<template>
<div>
     <!-- 搜索和添加 -->
    <div class="clearfix marginT">
        <div class="clearfix fl marginL">
            <div class="searchTitle fl">文件名称：</div>
            <el-input class="fl search-input" v-model="userFileName" placeholder="请输入要查询的文件名"></el-input>
        </div>

        <div class="clearfix fl marginL">
            <div class="searchTitle fl">开始日期：</div>
            <el-date-picker
              class="search-input fl"
              :span="14"
              v-model="startTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </div>

        <div class="clearfix fl marginL">
            <div class="searchTitle fl">结束日期：</div>
            <el-date-picker
              class="search-input fl"
              :span="14"
              v-model="endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>
     <!-- 搜索和添加 -->
    <el-row :gutter="10" style="width: 60%; margin: 20px 22px">
      <el-col :span="5"><el-button type="primary" @click="searchList">搜一个</el-button></el-col>
      <el-col :span="5"><el-button type="primary" @click="dialogFormVisible = true">添加</el-button></el-col>
    </el-row>


    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编号" width="65"  v-loading="loading"
      element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="220px" label="视频">
        <template slot-scope="scope">
          <cm-video-player
              :src="scope.row.path"
              :width="'200px'"
              :height="'140px'"
          ></cm-video-player>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="url链接">
        <template slot-scope="scope">
          <span>{{scope.row.path}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上传日期" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.uploadTime | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      style="width: 400px;margin:30px auto;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      :background="true"
      layout="total, prev, pager, next"
      :total="pageList.total"
      :page-count="pageList.pages">
    </el-pagination>

    <!-- 添加文件模态框 -->
    <el-dialog title="信息" :visible.sync="dialogFormVisible">
          <form>
            <label>文件名称：</label>
            <el-input v-model="mediaForm.name" auto-complete="off"></el-input>
            <input type="file" name="fileName" @change="getFile($event)">
            
          </form>

          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm($event)">确 定</el-button>
            </div>
      
    </el-dialog>

</div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { baseUrl } from '@/config/env'
import CmVideoPlayer from '@/components/am-video/cm-video'

export default {
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      pageList: {},
      currentPage: 1,
      userFileName: '',
      startTime: '',
      endTime: '',
      searchInput: '',
      fileList: [],
      headers: {
        Authorization:`Bearer ${this.token}`
      },
      dialogFormVisible: false,
      mediaForm: {
        fileName: '',
        file: ''
      },
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  components: {
    CmVideoPlayer
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList()
    },
    getFile(event) {
      this.mediaForm.file = event.target.files[0];
      console.log(this.mediaForm.file);
    },
    submitForm(event) {
      event.preventDefault();
      if(!this.mediaForm.name) {
          this.$message({
            message: '图片名称必须输入',
            type: '操作失败'
          })

          return false;
      }

      if(!this.mediaForm.file) {
          this.$message({
            message: '请添加上传的文件',
            type: '操作失败'
          })

          return false;
      }

      let formData = new FormData();
      formData.append('fileName', this.mediaForm.name);
      formData.append('file', this.mediaForm.file);

      const server = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
          Authorization:`Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      let data = {
        covertPath: '',
        id: 0,
        isDelete: false,
        name: this.mediaForm.name,
        path: '',
        size: '',
        type: '',
        uploadTime: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        userId: 0
      }

      server.post('/admin/file/upload/video', formData)
      .then(res => {
        this.list.unshift(data);
        this.dialogFormVisible = false;

        this.getList();

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
    getList() {
      this.$get(`/admin/file/video?type=0&pageNo=${this.currentPage}&startTime=${this.startTime}&endTime=${this.endTime}&pageSize=10`)
      .then( res => {
        this.pageList = res.data;
        this.list = res.data.list
        console.log(res)
      })
      .catch( err => {
        console.log(err)
      })
    },
    searchList() {
      this.$get(`/admin/file/video?type=0&pageNo=1&pageSize=1000&name=${this.userFileName}&startTime=${this.startTime}&endTime=${this.endTime}`)
      .then( res => {
        this.pageList = res.data;
        this.list = res.data.list
        console.log(res)
      })
      .catch( err => {
        console.log(err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}


</script>

<style>
.video-js .vjs-big-play-button {
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
</style>


