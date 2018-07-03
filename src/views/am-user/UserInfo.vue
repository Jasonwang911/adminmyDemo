<template>
  <div class="formBorder">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="性别">
            <el-radio v-model="form.sex" :label="Number(0)">男</el-radio>
            <el-radio v-model="form.sex" :label="Number(1)">女</el-radio>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="qq">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>

        <el-form-item label="微信">
          <el-input v-model="form.weiXin"></el-input>
        </el-form-item>

        <el-form-item  class="clearfix" label="头像">
            <el-input style="width: 360px; marginRight: 30px" class="fl" :disabled="true" v-model="form.headUrl"></el-input>
            <el-button class="fl" type="warning" @click="SearchMedia">查询</el-button>
        </el-form-item>

        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.des"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>

     <!-- 图片搜索弹窗 -->
    <el-dialog title="新增" :visible.sync="mediaSearchDialog">
      <el-form ref="mediaSearch" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="预览" prop="img">
          <!-- <div v-if="mediaType == '/image'"> -->
            <img v-show="mediaSearchValue" :src="mediaSearchValue" style="height:100px;width: 100px;">
          <!-- </div> -->
        </el-form-item>

        <el-form-item label="平台名称" prop="title" >
            <el-select 
              v-model="mediaSearchValue"
              :multiple="false"
              :filterable="true"
              :remote="true"
              reserve-keyword
              placeholder="请输入关键词"
              no-data-text="数据库中无此条消息"
              :remote-method="remoteMethod"
              ref="select"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item.id"
                :label="item.name"
                :value="item.path">
              </el-option>
            </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mediaSearchDialog = false">取消</el-button>
        <el-button type="primary" @click="mediaSearchSuccess">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      mediaSearchDialog: false,
      options4: [],
      loading: false,
      mediaSearchValue: '',
      form: {
        "des": "",
        "email": "",
        "headUrl": "",
        "id": 0,
        "phone": "",
        "qq": "",
        "sex": 0,
        "username": "",
        "weiXin": ""
      },
      resetInfo: {

      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },
  created() {
    // 获取当前用户资料
    this.$get('/admin/user/userBasicsSearch')
    .then( res => {
      this.form = res.data;
      this.resetInfo = Object.assign({}, res.data);
    })
    .catch( err => {
        this.$message({
          message: err,
          type: '获取当前用户资料失败'
        })
    })

  },
  methods: {
    SearchMedia: function() {
        // 开弹窗
        this.mediaSearchDialog = true;
    },
    remoteMethod(query) {
      if (query !== '') {
          this.loading = true;
          this.$get(`/admin/file/image?type=0&pageNo=1&pageSize=10000&name=${query}`)
          .then( res => {
            this.loading = false;
            this.pageList = res.data;
            this.options4 = res.data.list;
          })
          .catch( err => {
            this.loading = false;
          })
      } else {
          this.options4 = [];
      }
    },
    mediaSearchSuccess: function() {
        this.form.headUrl = this.mediaSearchValue;        
        this.mediaSearchDialog =false;
    },
    reset: function() {
      this.form = Object.assign({}, this.resetInfo);
    },    
    onSubmit: function() {
      this.$post('/admin/user/userBasicsUpdate', this.form)
      .then( res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$get('/admin/user')
            .then(res => {
              if(res.code == '000000') {
                  this.$store.commit('AM_STORE_USER_INFO', res.data);
              }
              this.$router.push({path: '/'});
            })
            .catch( err => {
              this.$router.push({path: '/'});
            })
      })
      .catch( err => {
        this.$message({
          message: err,
          type: '提交失败'
        })
      })
    }
  }
}
</script>

<style scoped>
  .formBorder{
    width: 40%;
    margin: 30px auto;
  }
</style>


