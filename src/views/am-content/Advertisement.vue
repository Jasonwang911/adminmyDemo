<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
        <!-- <keep-alive> -->
          <tab-pane v-if='activeName==item.key' :isAdv="item.isAdv" :showLocation="item.showLocation" :NO2Title="item.NO2Title" :type='item.type' @create='showCreatedTimes'></tab-pane>
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
        { label: '广告首页', key: 'CN', type: 2 , NO2Title: '图片', showLocation: true , isAdv: true},
        { label: '专题策划广告', key: 'US', type: 7 , NO2Title: '图片', isAdv: true}
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
