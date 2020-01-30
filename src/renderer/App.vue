<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: transparent;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .tw-logo {
        width: 200px;
        height: 50px;
        color: #f5f7f9;
        float: left;
        line-height: 50px;
    }

    .tw-menubar {
        width: 100px;
        float: right;
        height: 50px;
        text-align: right;
        line-height: 50px;
    }

    .tw-menubar > a {
        color: #f5f7f9;
    }

    .ivu-layout-header {
        height: 50px;
        padding-left: 25px;
        padding-right: 7px;
    }

    .ivu-divider {
        width: 0.5px;
        background-color: #d7dde4 !important;
    }

    .ivu-layout-sider {
        background-color: #f5f7f9;
        border-right: 1px solid #e1e1e2;
        height: 600px !important;
    }

    .ivu-menu-light {
        background-color: #f5f7f9;
        width: 199px !important;
    }

    .ivu-layout-sider-children {
        background-color: #f5f5f7;
    }

    .ivu-menu-vertical.ivu-menu-light::after {
        background-color: transparent;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        left: 0;
        width: 3px;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #000000;
        background: #e6e7ea;
    }

    .ivu-layout {
        background-color: #fafafa;
    }

    .tw-leftbar::-webkit-scrollbar { /*滚动条整体样式*/
        width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .tw-leftbar::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
        background: #e1e1e2;
    }
</style>
<template>
    <div class="layout" style="border: none;border-radius: 0;background-color: transparent;">
        <Layout>
            <Header>
                <div class="tw-logo">
                    <p>次奥物联网上位机软件</p>
                </div>
                <div class="tw-menubar" style="-webkit-app-region: no-drag;">
                    <router-link to="/setting">
                        <Icon type="ios-settings" size="18"/>
                    </router-link>
                    <Divider type="vertical"/>
                    <a href="">
                        <Icon type="ios-remove" size="24"/>
                    </a>
                    <a href="">
                        <Icon type="ios-close" size="24"/>
                    </a>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger class="tw-leftbar" style="-webkit-app-region: no-drag;"
                       :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
                    <Menu active-name="1-1" theme="light">
                        <MenuGroup title="首页">
                            <router-link to="/" style="color: #5c5c5c;">
                                <MenuItem name="1-1">
                                    <Icon type="ios-home" size="20"/>
                                    系统首页
                                </MenuItem>
                            </router-link>
                        </MenuGroup>
                        <MenuGroup title="监测">
                            <router-link to="/monitor" style="color: #5c5c5c;">
                                <MenuItem name="2-1">
                                    <Icon type="ios-pulse" size="20"/>
                                    实时监测
                                </MenuItem>
                            </router-link>
                            <router-link to="/monitor" style="color: #5c5c5c;">
                                <MenuItem name="2-2">
                                    <Icon type="ios-pulse" size="20"/>
                                    监测
                                </MenuItem>
                            </router-link>
                            <router-link to="/monitor" style="color: #5c5c5c;">
                                <MenuItem name="2-3">
                                    <Icon type="ios-pulse" size="20"/>
                                    监测
                                </MenuItem>
                            </router-link>
                        </MenuGroup>
                        <MenuGroup title="统计">
                            <router-link to="/census" style="color: #5c5c5c;">
                                <MenuItem name="3-1">
                                    <Icon type="ios-stats" size="20"/>
                                    数据统计
                                </MenuItem>
                            </router-link>
                            <router-link to="/census" style="color: #5c5c5c;">
                                <MenuItem name="3-2">
                                    <Icon type="ios-stats" size="20"/>
                                    统计
                                </MenuItem>
                            </router-link>
                        </MenuGroup>
                        <MenuGroup title="控制">
                            <router-link to="/control" style="color: #5c5c5c;">
                                <MenuItem name="4-1">
                                    <Icon type="ios-switch" size="20"/>
                                    系统控制
                                </MenuItem>
                            </router-link>
                        </MenuGroup>
                    </Menu>
                </Sider>
                <Layout style="padding-left: 199px;">
                    <Content>
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>