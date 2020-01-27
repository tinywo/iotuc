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
                <Sider hide-trigger :style="{background: '#fff'}" style="-webkit-app-region: no-drag;">
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
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
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