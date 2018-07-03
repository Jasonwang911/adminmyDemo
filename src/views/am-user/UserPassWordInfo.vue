<template>
  <div class="formBorder">
      <el-form ref="form" :model="form" label-width="100px">

        <el-form-item label="请输入新密码">
          <el-input v-model="password"></el-input>
        </el-form-item>

        <el-form-item label="确认">
          <el-input v-model="resetPassWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        id: '',
        password: '',
      },
      password: '',
      resetPassWord: '',
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
    this.form.id = this.userInfo.id;
  },
  methods: {
    reset: function() {
      this.form.password = '';
      this.password = '';
      this.resetPassWord = '';
    },    
    onSubmit: function() {
      if(this.password.trim() !== this.resetPassWord.trim()) {
          this.$message({
            message: '两次输入的密码不一致',
            type: '提交失败'
          })

          return;
      }

      this.form.password = this.password;
      this.$post('/admin/user/userBasicsUpdate', this.form)
      .then( res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          
          this.$router.push({path: '/'});
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


