<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
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
    }

    .ivu-menu-light {
        background-color: #f5f7f9;
    }

    .ivu-layout-sider-children {
        background-color: #f5f5f7;
    }

    .ivu-menu-vertical.ivu-menu-light::after {
        background-color: transparent;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        left: 0;
    }

    .ivu-layout {
        background-color: #fafafa;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <div class="tw-logo">
                    <p>次奥物联网上位机软件</p>
                </div>
                <div class="tw-menubar" style="-webkit-app-region: no-drag;">
                    <a href="">
                        <Icon type="ios-settings" size="18"/>
                    </a>
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
                <Sider hide-trigger style="-webkit-app-region: no-drag;">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout>
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