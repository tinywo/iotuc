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

    #btn-save {
        text-align: center;
    }

    .tw-btn-save {
        background-color: rgb(81, 90, 110);
        margin-top: 30px !important;
        height: 40px !important;
        width: 120px !important;
        color: #fff !important;
    }

    .tw-btn-save:hover {
        border: none;
    }
</style>

<template>
    <div>
        <div style="border-bottom: 0.5px solid #e6e7ea;padding-left: 22px;">
            <Button type="primary" @click="backPush"
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
            <Form label-position="left" :label-width="60">
                <div class="tw-setting-item" id="serialport">
                    <h2>串口</h2>
                    <FormItem label="开关">
                        <i-switch size="large" v-model="switchSerialPort">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口">
                        <Select v-model="serialPort" style="width:260px">
                            <Option v-for="item in serialPortList" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="波特率">
                        <Select v-model="serialBaudRate" style="width:260px">
                            <Option v-for="item in serialBaudRateList" :value="item.value" :key="item.value">{{
                                item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="mysql">
                    <h2>MySQL</h2>
                    <FormItem label="开关">
                        <i-switch size="large" v-model="switchMySQL">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="主机">
                        <Input v-model="mysqlHost" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="端口">
                        <Input v-model="mysqlPort" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="用户名">
                        <Input v-model="mysqlUser" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="mysqlPassword" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="数据库">
                        <Input v-model="mysqlDatabase" placeholder="" style="width: 260px"/>
                    </FormItem>
                    <FormItem label="表名">
                        <Input v-model="mysqlTable" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="ip">
                    <h2>IP</h2>
                    <FormItem label="本机IP">
                        <Input v-model="ip" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="websocket">
                    <h2>WebSocket</h2>
                    <FormItem label="开关">
                        <i-switch size="large" v-model="switchWebSocket">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="websocketPort" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="tcp">
                    <h2>TCP</h2>
                    <FormItem label="开关" v-model="switchTCP">
                        <i-switch size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="tcpPort" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <Divider/>
                <div class="tw-setting-item" id="udp">
                    <h2>UDP</h2>
                    <FormItem label="开关">
                        <i-switch size="large" v-model="switchUDP">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="端口号">
                        <Input v-model="udpPort" placeholder="" style="width: 260px"/>
                    </FormItem>
                </div>
                <div class="tw-setting-item" id="btn-save">
                    <Button class="tw-btn-save" style="background-color: #515a6e;">保存</Button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    const electron = require('electron');
    const settingOption = electron.remote.getGlobal('setting');
    const ipcRenderer = electron.ipcRenderer;
    let routerTo, routerFrom;
    let setting = {};
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
                switchSerialPort: settingOption.serviceSerialPort,
                switchMySQL: settingOption.serviceMysql,
                switchWebSocket: settingOption.serviceWebsocket,
                switchTCP: settingOption.serviceTcp,
                switchUDP: settingOption.serviceUdp,
                mysqlHost: settingOption.mysqlHost,
                mysqlPort: settingOption.mysqlPort,
                mysqlUser: settingOption.mysqlUser,
                mysqlPassword: settingOption.mysqlPassword,
                mysqlDatabase: settingOption.mysqlDatabase,
                mysqlTable: settingOption.mysqlTable,
                serialPort: settingOption.serialPort,
                serialPortList: [
                    {
                        value: 'com1',
                        label: 'com1'
                    },
                    {
                        value: 'com2',
                        label: 'com2'
                    },
                ],
                serialBaudRate: settingOption.serialBaudRate,
                serialBaudRateList: [
                    {
                        value: 9600,
                        label: '9600'
                    },
                    {
                        value: 19200,
                        label: '19200'
                    },
                    {
                        value: 38400,
                        label: '38400'
                    },
                    {
                        value: 57600,
                        label: '57600'
                    },
                    {
                        value: 115200,
                        label: '115200'
                    },
                ],
                websocketPort: settingOption.websocketPort,
                tcpPort: settingOption.tcpPort,
                udpPort: settingOption.udpPort,
                ip: settingOption.ip
            }
        },
        mounted() {
            ipcRenderer.send('getSetting');
            ipcRenderer.on('freshSetting', function (event, args) {
                console.log(args);
                setting = args;
            });
            console.log();
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
            },
            changeSwitch() {
                this.switchSerialPort = true;
            }
        }
    }
</script>

