<style scoped>

</style>

<template>

</template>

<script>
    const echarts = require('echarts');
    const axios = require('axios');
    export default {
        name: "avgTemp7day",
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