<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>
    
    <div class="right-menu clearfix">
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->

      <!-- <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> -->

      <!-- <lang-select class="international right-menu-item"></lang-select> -->

      <!-- <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> -->
      <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper clearfix">
          <div>文件管理系统</div>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/imageCenter/index">
            <el-dropdown-item>
              图片/视频
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown> -->
      <router-link to="/userCenter">
        <el-menu-item class="fl" index="/userCenterr">官网管理系统</el-menu-item>
      </router-link>
      <router-link to="/userModule/fountuser/index">
        <el-menu-item class="fl" index="/userModule/fountuser">用户管理系统</el-menu-item>
      </router-link>
      <router-link to="/mediaModule/allImg">
        <el-menu-item class="fl" index="/mediaModule/allImg">文件管理系统</el-menu-item>
      </router-link>
      <el-dropdown class="avatar-container right-menu-item fl" trigger="click">
        <div class="avatar-wrapper clearfix">
          <img v-if="userInfo.headUrl" class="user-avatar" :src="userInfo.headUrl">
          <div>{{userInfo.username}}</div>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userInfo/index">
            <el-dropdown-item>
              基本资料
            </el-dropdown-item>
          </router-link>  
          <router-link to="/userPassWordInfo/index">
            <el-dropdown-item>
              安全设置
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      sessionStorage.clear();
       this.$userGet('/user/logout')
        .then( res => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
        })
        .catch( err => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          float:left;
          width: 40px;
          height: 40px;
          border-radius: 100%;
          border: 1px solid #000;
        }
        >div {
          float: left;
          margin-left: 8px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          float:left;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
