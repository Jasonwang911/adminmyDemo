<template>
  <div class="app-container">

    <img src="~@/assets/tree.png" alt="">
    
  </div>
</template>

<style scoped>
.app-container{
  width: 100%;
  height: 100%;
}
img{
  width: 100%;
}
</style>


<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'

export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '目录',
          value: 'event',
          width: 200
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '时间线',
          value: 'timeLine'
        },
        {
          text: '备注',
          value: 'comment'
        }
      ],
      data: [
        {
          id: 0,
          event: '中国手艺网',
          timeLine: 50,
          comment: '无'
        },
        {
          id: 1,
          event: '首页',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              event: '专题',
              timeLine: 10,
              comment: '无'
            }
          ]
        },
        {
          id: 2,
          event: '文旅资讯',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 3,
              event: '要闻',
              timeLine: 10,
              comment: '无'
            }
          ]
        },
      ]
    }
  }
}
</script>
