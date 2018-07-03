<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      router
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
        <!-- <el-menu-item index="/userCenter">
          <i class="el-icon-menu"></i>
          <span slot="title">用户信息</span>
        </el-menu-item> -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <!-- <el-menu-item index="/structure/index">用户管理系统</el-menu-item> -->
            <el-menu-item index="/userCenter">用户信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 栏目管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>栏目管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/structure/index">网站结构</el-menu-item>
            <el-menu-item index="/floatingWindow/index">浮窗配置</el-menu-item>
            <el-menu-item index="/banner/index">banner</el-menu-item>
            <el-menu-item index="/QRcode/index">二维码</el-menu-item>
            <el-menu-item index="/newMedia/index">新媒体</el-menu-item>
            <el-menu-item index="/thematicTwoName/index">自定义专题策划</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 内容管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/addver/index">文章管理</el-menu-item>
            <el-menu-item index="/headline/index">头条</el-menu-item>
            <el-menu-item index="/thematic/index">特别策划</el-menu-item>
            <el-menu-item index="/thematicTwo/index">自定义专题策划</el-menu-item>
            <el-menu-item index="/advertisement/index">广告</el-menu-item>
            <el-menu-item index="/information/index">官方信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 访问统计 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>访问统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/allGuide/index">访问总量</el-menu-item>
            <el-menu-item index="/navGuide/index">菜单访问量</el-menu-item>
            <el-menu-item index="/articleGuide/index">文章访问量</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

    
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
