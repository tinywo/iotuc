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
                <Icon type="ios-pulse" size="20"></Icon>
                实时监测
            </BreadcrumbItem>
        </Breadcrumb>
        <div id="echart" style="width: 100%;height:512px;"></div>
    </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        name: "RealPage",
        data() {
            return {}
        },
        mounted() {
            const electron = require('electron');
            const ipcRenderer = electron.ipcRenderer;
            ipcRenderer.send('serviceSerial');
            //ipcRenderer.send('listenTemp');

            ipcRenderer.send('getIpAddress');
            ipcRenderer.on('showSerialData', function (event, args) {

                var serialdata = document.getElementById("serialdata");
                serialdata.value = serialdata.value + args + '\n';
            });
            var data = (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 10; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }());

            function randomData() {
                return {
                    name: (new Date()).getTime().toString(),
                    value: [(new Date()).getTime(), Math.floor((Math.random() * 30) + 1)]
                };
            }

            let myChart = echarts.init(document.getElementById('echart'));
            let option = {
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
                    },
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
                    data: data
                }]
            };
            myChart.setOption(option);

            function nowData(data) {
                return {
                    name: (new Date()).getTime().toString(),
                    value: [(new Date()).getTime(), data]
                };
            }

            ipcRenderer.on('showTemp', function (event, args) {
                console.log(args);
                data.shift();
                data.push(nowData(args));
                myChart.setOption({
                    series: [{
                        data: data
                    }]
                });
            });
        }
    }
</script>