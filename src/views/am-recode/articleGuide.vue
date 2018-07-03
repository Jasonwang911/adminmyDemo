<template>
  <div class='chart-container'>
    <el-row :gutter="20" class="marginT">
        <el-col :span="4">
            <el-radio-group v-model="viewOptions.type">
                <el-radio :label="0">日</el-radio>
                <el-radio :label="1">月</el-radio>
                <el-radio :label="2">年</el-radio>
            </el-radio-group>
        </el-col>

        <el-col :span="6" :offset="1">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-button>开始时间</el-button>
                </el-col>
                <el-col :span="10">
                    <el-date-picker
                    v-model="viewOptions.startDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="6" :offset="1">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-button>结束时间</el-button>
                </el-col>
                <el-col :span="10">
                    <el-date-picker
                    v-model="viewOptions.endDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
    
    <el-row style="margin: 30px 0">
        <el-col :span="6" class="clearfix">
          <div class="searchTitle fl">一级标题</div>
          <el-select class="fl" v-model="oneIdValue" placeholder="请选择" @change="changeOneIdChange">
            <el-option
              v-for="item in oneIdOptions"
              :key="item.id"
              :label="item.titleName"
              :value="item.titleName">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="6" class="clearfix">
          <div class="searchTitle fl">二级标题</div>
          <el-select class="fl" v-model="twoIdValue" placeholder="请选择" @change="changeTwoIdChange">
            <el-option
              v-for="item in twoIdOptions"
              :key="item.id"
              :label="item.titleName"
              :value="item.titleName">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="6" :offset="1" class="clearfix">
          <div class="searchTitle fl">标题</div>
          <div class="fl">
            <el-input v-model="viewOptions.titleName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="4">
            <el-button type="primary" @click="changeViewTab">搜索</el-button>
            <!-- <el-button type="primary">导出</el-button> -->
        </el-col>

        
    </el-row>

    <el-col style="marginBottom:60px">
        
    </el-col>

    <el-row>
        <div :id="id" :style="{height:'500px',width:'100%'}"></div>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'keyboardChart',
  data() {
    return {
          oneIdOptions: [

          ],
          change_oneIdOptions: [],
          oneIdValue: '',
          oneFilterJson: {},
          change_oneIDValue: '',
          change_oneFilterJson: {},
          twoIdOptions: [

          ],
          change_twoIdOptions: [],
          twoIdValue: '',
          twoFilterJson: {},
          change_twoIDValue: '',
          change_twoFilterJson: {},

        chart: null,
        x_axisArr: [],
        y_axisArr: [],
        id: 'allGuide',
        viewOptions: {
          "endDate": "",
          "oneId": 0,
          "startDate": "",
          "titleName": "",
          "twoId": 0,
          "type": 0
        },
    }
  },
  created() {
      this.$get('/admin/titleList/oneTitleList')
        .then(res => {
          console.log(res)
          this.oneIdValue = res.data[0].titleName;
          this.oneIdOptions = res.data;
          this.oneFilterJson = res.data[0];
          this.viewOptions.oneId = res.data[0].id;
          this.$post('/admin/titleList/twoTitleList', {
            id: res.data[0].id
          })
          .then( res => {
              this.twoIdValue = res.data[0].titleName;
              this.twoIdOptions = res.data;
              this.twoFilterJson = res.data[0];  
              this.viewOptions.twoId = res.data[0].id;

              // 添加以及标题和耳机标题下拉框 默认属性
              this.change_oneIdOptions = this.oneIdOptions;
              this.change_twoIdOptions = this.twoIdOptions;

              this.changeViewTab();
          })
          .catch( error => {
              this.$notify.error({
                title: '错误',
                message: error
              });
          })
        })
        .catch(err => {
            this.$notify.error({
              title: '错误',
              message: err
            });
        })
      
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    changeViewTab() {
        this.x_axisArr.splice(0, this.x_axisArr.length);
        this.y_axisArr.splice(0, this.y_axisArr.length);

        this.$post('/admin/getTittleVisit',this.viewOptions)
        .then( res => {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
                this.x_axisArr.push(arr[i].name);
                this.y_axisArr.push(arr[i].count);
            }
            this.initChart()
        })
        .catch( err => {
            this.$notify.error({
              title: '错误',
              message: err
            });
        })
    },
    changeOneIdChange() {
        let obj = {};
          obj = this.oneIdOptions.find((item)=>{
              return item.titleName == this.oneIdValue;
          });
          this.oneFilterJson = obj
          this.viewOptions.oneId = obj.id;

          this.$post('/admin/titleList/twoTitleList', {
              id: this.oneFilterJson.id
            })
            .then( res => {
                if(res.data.length == 0) {
                    this.twoIdValue = '';
                    this.twoIdOptions = { };
                    this.twoFilterJson = { id: '', titleName: ''};
                    this.viewOptions.twoId = '';
                }else{
                    this.twoIdValue = res.data[0].titleName;
                    this.twoIdOptions = res.data;
                    this.twoFilterJson = res.data[0];
                    this.viewOptions.twoId = res.data[0].id;
                }
            })
            .catch( err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                });
            })
    },
    changeTwoIdChange() {
          let obj = {};
          obj = this.twoIdOptions.find((item)=>{
              return item.titleName == this.twoIdValue;
          });
          this.twoFilterJson = obj
          this.viewOptions.twoId = obj.id;
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(
          {
            title: {
                text: "中国手艺网前端访问数据总览",
                // subtext: "纯属虚构"
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["点击量"]
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: true
                    },
                    magicType: {
                        show: false,
                        type: ["line", "bar"]
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: "category",
                    // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    data: this.x_axisArr
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "点击量",
                    type: "bar",
                    // data: [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20, 6.4, 3.3]
                    data: this.y_axisArr
                }
            ],
            label: {
            normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black'
                    }
                }
            }
        }
      )
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
.searchTitle{
  height: 36px;
  line-height: 36px;
}
</style>

