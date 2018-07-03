<template>
    <div>
        <one-mode
        v-if="info.mode == 1"
        :info="info"
        ></one-mode>
        <two-mode
        v-else
        :info="info"
        ></two-mode>
    </div>  
</template>

<script>
  import oneMode from './infoTabMode1'
  import twoMode from './infoTabMode2'

  export default{
      name: 'addver',
      components: {
          oneMode,
          twoMode,
      },
      props: {
          info: Object
      },
      data(){
        return {
        }
      }
  }

</script>

<style lang="scss">
.am-content{ 
  .searchTitle{
    border: 1px solid #ccc;
    line-height: 34px;
    padding: 0 10px;
  }
}
</style>

