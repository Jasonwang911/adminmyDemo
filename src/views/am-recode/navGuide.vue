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
    
    <el-row>
        <el-col :span="6">
            <el-button type="primary" @click="changeViewTab">搜索</el-button>
            <!-- <el-button type="primary">导出</el-button> -->
        </el-col>
    </el-row>
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
        chart: null,
        viewOptions: {
          "endDate": "",
          "startDate": "",
          "titleName": "",
          "type": 0
        },
        // /getWebSiteVisit

        id: 'allGuide',
        x_axisArr: [],
        y_axisArr: [],
    }
  },
  created() {
      this.changeViewTab();
  },
  mounted() {
    this.initChart()
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(
          {
            title: {
                text: "中国手艺文章访问统计",
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
  height: 500px;
}
.marginT{
    margin: 30px 0;
}
</style>

