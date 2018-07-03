<template>
  <div class="tab-container">

    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
          <tab-pane v-if='activeName==item.key' :type='item.type' @create='showCreatedTimes'></tab-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/tabPane'

export default {
  name: 'userCenter',
  components: { tabPane },
  data() {
    return {
      showCreatedTimes: 0,
      tabMapOptions: [
        { label: '前台用户', key: 'CN', type: {userType: 0} },
        { label: '后台用户', key: 'US', type: {userType: 1} },
      ],
      activeName: 'CN',
    }
  },
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
