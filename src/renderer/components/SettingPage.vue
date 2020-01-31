<style>
    .ivu-anchor-ink {
        right: 0;
        left: 58px !important;
    }

    .ivu-anchor-link {
        padding-left: 0 !important;
        padding-right: 52px !important;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }

    .ivu-anchor-link-title {
        font-size: 12px;
        text-align: right;
    }

    .ivu-anchor-ink:before {
        width: 1px !important;
    }

    .ivu-anchor-ink-ball {
        background-color: #2d8cf0 !important;
    }

    h2 {
        font-family: SimSun, '等线 Light';
        margin-bottom: 20px !important;
    }

    .tw-setting-item {
        padding-left: 22px;
    }

    .ivu-form-item-label {
        font-size: 13px !important;
        font-weight: bold;
    }

    .tw-rightbar::-webkit-scrollbar { /*滚动条整体样式*/
        width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .tw-rightbar::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
        background: #e1e1e2;
    }
</style>

<template>
    <div>
        <div style="border-bottom: 0.5px solid #e6e7ea;padding-left: 22px;">
            <Button :size="buttonSize" type="primary" @click="backPush"
                    style="height: 50px;line-height: 50px;font-size: 20px;color:#515a6e;border:none;background-color:transparent;font-weight: 100;font-family: '等线 Light';-webkit-app-region: no-drag;">
                <Icon type="ios-arrow-back" size="24"/>
                设置
            </Button>
        </div>
        <div style="padding-left: 100px;padding-top: 20px;z-index:99;-webkit-app-region: no-drag;"
             :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Anchor show-ink container=".tw-rightbar">
                <AnchorLink href="#serialport" title="串口"/>
                <AnchorLink href="#mysql" title="MySQL"/>
                <AnchorLink href="#ip" title="IP"/>
                <AnchorLink href="#websocket" title="WebSocket"/>
                <AnchorLink href="#tcp" title="TCP"/>
                <AnchorLink href="#udp" title="UDP"/>
            </Anchor>
        </div>
        <div class="tw-rightbar"
             style="padding-left: 234px;width:100%;padding-top: 20px;padding-right: 30px;height:calc(100% - 100px);padding-bottom:50px;-webkit-app-region: no-drag;"
             :style="{position: 'fixed', left: 0, overflow: 'auto'}">
            <Form :model="formLeft" label-position="left" :label-width="60">
                <div class="tw-setting-item" id="serialport">
                    <h2>串口</h2>
                    <FormItem label="开关">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口">
                        <Select v-model="formLeft.input1" style="width:260px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="波特率">
                        <Select v-model="formLeft.input1" style="width:260px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="mysql">
                    <h2>MySQL</h2>
                    <FormItem label="开关">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="主机">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="用户名">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="数据库">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="表名">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="ip">
                    <h2>IP</h2>
                    <FormItem label="本机IP">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="websocket">
                    <h2>WebSocket</h2>
                    <FormItem label="开关">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="tcp">
                    <h2>TCP</h2>
                    <FormItem label="开关">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="udp">
                    <h2>UDP</h2>
                    <FormItem label="开关">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="value" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    let routerTo, routerFrom;
    export default {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                routerTo = to;
                routerFrom = from
            })
        },
        name: "SettingPage.vue",
        data() {
            return {
                switch1: false,
                formLeft: {
                    input1: '',
                    input2: '',
                    input3: ''
                }
            }
        },
        methods: {
            change(status) {
                this.$Message.info('开关状态：' + status);
            },
            backPush() {
                console.log(routerFrom);
                if (routerFrom == null)
                    this.$router.push({path: '/'});
                else
                    this.$router.push({path: routerFrom.path});
            }
        }
    }
</script>

