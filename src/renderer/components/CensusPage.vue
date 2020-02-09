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
        <Tabs value="tab1">
            <TabPane label="近7日平均温度" name="tab1">
                <avg-temp7day></avg-temp7day>
            </TabPane>
            <TabPane label="近7日平均湿度" name="tab2">
                <avg-hum7day></avg-hum7day>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    const echarts = require('echarts');
    const axios = require('axios');
    import avgTemp7day from './CensusPage/avgTemp7day'
    import avgHum7day from "./CensusPage/avgHum7day";

    export default {
        name: "CensusPage",
        components: {avgTemp7day, avgHum7day},
        data() {
            return {}
        },
        mounted() {}
    }
</script>