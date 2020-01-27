<template>
    <div id="app">
        <div class="tw-leftbar">
            <Menu mode="horizontal" active-name="1-1" theme="theme3" width="auto" :class="menuitemClasses">
                <router-link to="/">
                    <MenuItem name="1-1">
                        <Icon type="ios-home"></Icon>
                        <span>首页</span>
                    </MenuItem>
                </router-link>
                <router-link to="/monitor">
                    <MenuItem name="1-1">
                        <Icon type="ios-pulse"></Icon>
                        <span>监测</span>
                    </MenuItem>
                </router-link>
                <router-link to="/census">
                    <MenuItem name="1-1">
                        <Icon type="ios-stats"></Icon>
                        <span>统计</span>
                    </MenuItem>
                </router-link>
            </Menu>
        </div>
        <div class="tw-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hce'
    }
</script>

<style>
    /* CSS */
    .tw-leftbar {
        padding-top: 30px;
        width: 180px;
        height: 100%;
        background-color: #fff;
        position: fixed;
        z-index: 99;
    }

    .tw-container {
        padding-left: 190px;
    }
</style>
