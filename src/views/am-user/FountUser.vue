<template>

<div>
  <el-row :gutter="20" style="margin: 30px 0">
        <!-- <el-col :span="6">
          <el-row :gutter="5">
            <el-col :span="8">
              <div class="searchTitle">状态：</div>
            </el-col>
            <el-col :span="12">
              <el-select v-model="stausValue" placeholder="" @change="statusChange">
                <el-option
                  v-for="item in stausOptions"
                  :key="item.status"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col> -->

        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input v-model="viewOptions.username" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="searchName">搜索</el-button>
            </el-col>
            <!-- <el-col :span="8" v-if="type.userType == 1">
              <el-button type="warning" @click="addUser">添加</el-button>
            </el-col> -->
          </el-row>
        </el-col>

        

    </el-row>


    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="addUserInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form >
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="addUserInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="登录密码" label-width="120px">
          <el-input v-model="addUserInfo.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formAddUser">确 定</el-button>
      </div>
    </el-dialog>



  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="用户名" width="65"  v-loading="loading"
    element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{scope.row.username}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="头像">
      <template slot-scope="scope">
        <img :src="scope.row.headUrl" alt="" style="width: 40px; height: 40px; margin: 5px auto">
      </template>
    </el-table-column>

    <el-table-column label="手机号">
      <template slot-scope="scope">
        <span>{{scope.row.phone}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="qq">
      <template slot-scope="scope">
        <span>{{scope.row.qq}}</span>
      </template>
    </el-table-column>

    <el-table-column label="微信">
      <template slot-scope="scope">
        <span>{{scope.row.weiXin}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="邮箱" width="95">
      <template slot-scope="scope">
        <span>{{scope.row.email}}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="性别" width="110">
      <template slot-scope="scope">
        <span v-if="scope.row.sex == 0">男</span>
        <span v-if="scope.row.sex == 1">女</span>
      </template>
    </el-table-column>

    <!-- <el-table-column align="center" label="操作" width="95">
      <template slot-scope="scope">
        <el-button type="danger" @click="delUser(scope.row)">删除</el-button>
      </template>
    </el-table-column> -->

  </el-table>
</div>
  
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  data() {
    return {
      type: {
        userType: 2
      },
      options4: [],
      value9: '',
      loading: false,

      stausOptions: [
        {
          status: 1,
          label: '在用'
        }, {
          status: 0,
          label: '注销'
        }
      ],
      stausValue: '在用',
      viewOptions: {
          "pageNo": 1,
          "pageSize": 10,
          "status": 1,
          "userType": 2,
          "username": ""
      },
      userStatus: 1,

      dialogFormVisible: false,
      addUserInfo: {
        phone: '',
        username: '',
        password: ''
      },

      list: [],
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
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
    }
  },
  created() {
    this.viewOptions.userType = this.type.userType;
    this.getList()
  },
  methods: {
    searchName() {
      this.loading = true;
      if(this.stausValue == '在用') {
        this.viewOptions.status = 1;
      }else {
        this.viewOptions.status = 0;
      }
      
      this.$post('/admin/user/userListSearch', this.viewOptions)
      .then( res => {
          this.list = res.data.list;
          this.loading = false;
      })
      .catch( err => {

      })
    },
    addUser() {
        this.dialogFormVisible = true;
    },
    // 注册用户点击注册
    formAddUser() {
      let userInfo = {
        "email": "",
        "headUrl": "",
        "id": 0,
        "isDelete": 0,
        "phone": "",
        "qq": "",
        "sex": 0,
        "username": "",
        "weiXin": ""
      }
      this.$post('/admin/register', this.addUserInfo)
      .then( res => {
          if(res.code == '000000') {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.list.unshift(this.addUserInfo);
          }else {
              this.$message({
                message: res.msg,
                type: '操作失败'
              })
          }
          this.dialogFormVisible = false;
      })
      .catch( err => {
          this.$message({
            message: err,
            type: '操作失败'
          })
      })
    },

    delUser(userInfo) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$get(`/admin/del?id=${userInfo.id}`)
              .then(res => {
                this.list = this.list.filter(function(v){
                  return userInfo.id !== v.id;
                });
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    remoteMethod(query) {

        
    },
    statusChange() {
        let obj = {};
        obj = this.stausOptions.find((item)=>{
            return item.label == this.stausValue;
        });
        this.viewOptions.status = obj.status;
        this.getList()
    },
    getList() {
      this.loading = true;
      if(this.stausValue == '在用') {
        this.viewOptions.status = 1;
      }else {
        this.viewOptions.status = 0;
      }
      
      this.$post('/admin/user/userListSearch', this.viewOptions)
      .then( res => {
          this.list = res.data.list;
          this.loading = false;
      })
      .catch( err => {

      })
    }
  }
}
</script>

