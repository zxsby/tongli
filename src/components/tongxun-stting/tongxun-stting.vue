<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>通讯设置</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <Row>
        <Col span="12" v-if="setMsg.length>0">
        <div>
          <span>与下位设备通讯</span>
          <Switch @on-change="changeType1" :value="checkType(setMsg[0].com_low_device)" size="large" class="switch">
            <span slot="open">使用</span>
            <span slot="close">不用</span>
          </Switch>
        </div>
        <div>
          <span>使用3G网卡与云服务器通讯</span>
          <Switch @on-change="changeType2" :value="checkType(setMsg[0].com_cloud_3g)" size="large" class="switch">
            <span slot="open">使用</span>
            <span slot="close">不用</span>
          </Switch>
        </div>
        <div>
          <span>使用普通网卡与云服务器通讯</span>
          <Switch @on-change="changeType3" :value="checkType(setMsg[0].eth_com_cloud)" size="large" class="switch">
            <span slot="open">使用</span>
            <span slot="close">不用</span>
          </Switch>
        </div>
        <div>
          <span>设置云服务器IP</span>
          <Input @on-blur="checkIp(1)" style="width:35%" :disabled="IpBool" v-model="setMsg[0].cloud_serverip"
                 placeholder="请输入IP"></Input>
          <Button @click="toggleIpBool('ip')" type="warning">设置</Button>
        </div>
        <div>
          <span>设置云服务器IP</span>
          <Input style="width:15%" :disabled="TimeBool" v-model="setMsg[0].time_com_cloud"
                 placeholder="请输入IP"></Input>
          <Button type="warning" @click="toggleIpBool('Time')">设置</Button>
        </div>
        <div>
          <Button @click="submitChange" type="warning" :disabled="submit">提交修改</Button>
        </div>
        </Col>
        <Col span="12">
        <div>
          <span>设置数据采集器IP</span>
          <Input @on-blur="checkIp(2)" style="width:35%" :disabled="CJQip" v-model="CaiJiQiIp"
                 placeholder="请输入IP"></Input>
          <Button type="warning" @click="toggleIpBool ('cjq')">设置</Button>
          <Button type="warning" @click="subCjqIp" :disabled="ipSub">提交</Button>
        </div>
        <div>
          <Button type="warning">表数据清空</Button>
        </div>
        <div>
          <Button type="warning">重启数据采集器</Button>
        </div>
        <div>
          <Button type="warning">修改密码</Button>
        </div>
        </Col>
      </Row>
    </Content>
  </Layout>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        IpBool: true,
        TimeBool: true,
        CJQip: true,
        submit: false,
        ipSub: false,
        setMsg: [],
        CaiJiQiIp: ''
      }
    },
    mounted () {
      this.getSetting()
      this.getCaiJiQiIp()
    },
    computed: {},
    methods: {
      checkType (msg) {
        if (msg === '1') {
          return true
        } else if (msg === '0') {
          return false
        }
      },
      getCaiJiQiIp () {
        this.$http.get('../cgi-bin/getip.cgi').then((result) => {
          this.CaiJiQiIp=result.data.eth0
        }).catch((err) => {
          console.log(err)
        })
      },
      getSetting () {
        this.$http.get('../cgi-bin/com_setting_select.cgi').then((result) => {
          this.setMsg = result.data
        }).catch((err) => {
          console.log(err)
        })
      },
      toggleIpBool (type) {
        type === 'ip' ? this.IpBool = !this.IpBool : type === 'Time' ? this.TimeBool = !this.TimeBool : this.CJQip = !this.CJQip
      },
      checkIp (num) {
        var reg = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/
        var bool = reg.test(this.setMsg[0].cloud_serverip)
        if (bool) {
          this.$Message.info('ip格式正确')
          num === 1 ? this.submit = false : this.ipSub = false
        } else {
          this.$Message.error('ip格式填写不正确')
          num === 1 ? this.submit = true : this.ipSub = true
        }
      },
      changeType1 (msg) {
        if (msg) {
          this.setMsg[0].com_low_device = 1
        } else {
          this.setMsg[0].com_low_device = 0
        }
      },
      changeType2 (msg) {
        if (msg) {
          this.setMsg[0].com_cloud_3g = 1
        } else {
          this.setMsg[0].com_cloud_3g = 0
        }
      },
      changeType3 (msg) {
        if (msg) {
          this.setMsg[0].eth_com_cloud = 1
        } else {
          this.setMsg[0].eth_com_cloud = 0
        }
      },
      submitChange () {
        var str = ''
        for (var i in this.setMsg[0]) {
          str += `${this.setMsg[0][i]}&`
        }
        this.$Modal.confirm({
          title: '修改',
          content: '<p>确定提交修改内容？</p>',
          okText: '确定',
          cancelText: '放弃',
          onOk: () => {
            this.$http.get(`../cgi-bin/com_setting_modify.cgi?${str}`).then((result) => {
              if (result.data.result === 'true') {
                this.$Message.success('修改成功')
                this.getSetting()
              } else {
                this.$Message.error('修改失败')
              }
            }).catch((err) => {
              console.log(err)
            })
          },
          onCancel: () => {
            this.$Message.info('放弃修改')
          }
        });
      },
      subCjqIp () {
        this.$http.get(`../cgi-bin/setip.cgi?${this.CaiJiQiIp}`).then((result) => {
          if (result.data.result === 'true') {
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('修改失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
