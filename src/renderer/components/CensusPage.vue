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
        <div id="echart" style="width: 100%;height:512px;"></div>
    </div>
</template>

<script>
    const echarts = require('echarts');
    const axios = require('axios');
    export default {
        name: "RealPage",
        data() {
            return {}
        },
        mounted() {
            let data = {};
            let tempData = [];
            let dateData = [];
            axios.post('http://api.s/api/temp/avgTemp7day').then(res => {
                data = res['data'];
                for (let i = 0; i < 7; i++) {
                    let temp = data[i]['temp'];
                    let date = data[i]['date'];
                    tempData.push(temp);
                    dateData.push(date);
                }
                myChart.setOption({
                    xAxis: {
                        data: dateData
                    },
                    series: [{
                        data: tempData
                    }]
                });
            }).catch(err => {
                console.log(err);
            });
            var myChart = echarts.init(document.getElementById('echart'));
            var option = {
                title: {
                    text: '近7日平均温度'
                },
                tooltip: {},
                legend: {
                    data: ['温度 ']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '日期',
                    type: 'bar',
                    data: []
                }]
            };
            myChart.setOption(option);
        }
    }
</script>