<template>
  <div class="tab-container">
    <!-- <el-tag>mounted times ：{{createdTimes}}</el-tag> -->
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
        <!-- <keep-alive> -->
          <tab-pane v-if='activeName==item.key' :isAdv="item.isAdv" :NO2Title="item.NO2Title" :type='item.type' @create='showCreatedTimes'></tab-pane>
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/headlineTab'

export default {
  name: 'tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '首页头条配置', key: 'CN', type: 1 , NO2Title: '平台名称', isAdv: false},
        // { label: '专题策划一组', key: 'US', type: 5 , NO2Title: '平台名称', isAdv: false},
        // { label: '专题策划二组', key: 'JP', type: 6 }
      ],
      activeName: 'CN',
      createdTimes: 0
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
