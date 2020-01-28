<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div>
        <Breadcrumb :style="{'height':'40px','line-height': '40px','padding-left':' 20px'}">
            <BreadcrumbItem to="/">
                <Icon type="ios-stats" size="20"></Icon>
                数据统计
            </BreadcrumbItem>
        </Breadcrumb>
        <div id="echart" style="width: 100%;height:544px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "RealPage",
        data() {
            return {}
        },
        mounted() {
            /*  var data = [];
              var now = +new Date(1997, 9, 3);
              var oneDay = 24 * 3600 * 1000;
              var value = Math.random() * 1000;
              for (var i = 0; i < 1000; i++) {
                  data.push(randomData());
              }
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById('echart'));


              function randomData() {
                  now = new Date(+now + oneDay);
                  value = value + Math.random() * 21 - 10;
                  return {
                      name: now.toString(),
                      value: [
                          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                          Math.round(value)
                      ]
                  }
              }

              setInterval(function () {

                  for (var i = 0; i < 5; i++) {
                      data.shift();
                      data.push(randomData());
                  }

                  myChart.setOption({
                      series: [{
                          data: data
                      }]
                  });
              }, 1000);
              // 绘制图表
              var option = {
                  title: {
                      text: '温度曲线图'
                  },
                  tooltip: {
                      trigger: 'axis',
                      formatter: function (params) {
                          params = params[0];
                          var date = new Date(params.name);
                          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                      },
                      axisPointer: {
                          animation: false
                      }
                  },
                  xAxis: {
                      type: 'time',
                      splitLine: {
                          show: false
                      }
                  },
                  yAxis: {
                      type: 'value',
                      boundaryGap: [0, '100%'],
                      splitLine: {
                          show: false
                      }
                  },
                  series: [{
                      name: '模拟数据',
                      type: 'line',
                      showSymbol: false,
                      hoverAnimation: false,
                      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                      // data: data
                  }]
              };
              myChart.setOption(option);*/
            var myChart = echarts.init(document.getElementById('echart'));
            var option = {
                title: {
                    text: 'test'
                },
                tooltip: {},
                legend: {
                    data: ['销量 ']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            myChart.setOption(option);
        }
    }
</script>