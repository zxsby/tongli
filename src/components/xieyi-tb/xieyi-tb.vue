<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>协议列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <Table border :columns="columns1" :data="data1"></Table>
      <Spin size="large" fix v-if="data1.length<1"></Spin>
    </Content>
    <Modal
      v-model="modal"
      title="修改网口参数"
      @on-ok="TcpOk"
      @on-cancel="TcpCancel">
      <Form :model="selectTcp" label-position="right" :label-width="100">
        <FormItem label="标识:">
          <Input v-model="selectTcp.id" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input v-model="selectTcp.name" disabled></Input>
        </FormItem>
        <FormItem label="站点地址:">
          <Input type="number" @on-blur="checkIp('Tcp')" v-model="selectTcp.slaveaddr"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input type="number" v-model="selectTcp.timeout"></Input>
        </FormItem>
        <FormItem label="端口:">
          <Input type="number" v-model="selectTcp.port"></Input>
        </FormItem>
        <FormItem label="IP地址:">
          <Input v-model="selectTcp.ip"></Input>
        </FormItem>
        <FormItem label="读取时间:">
          <Input type="number" v-model="selectTcp.readtime"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Select @on-change="dayingTcpOptionChange" v-model="selectTcp.printdebug" transfer="true"
                  style="width:200px">
            <Option v-for="item in dayingTcp" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modal1"
      title="修改串口参数"
      @on-ok="RtuOk"
      @on-cancel="RtuCancel">
      <Form :model="selectRtu" label-position="right" :label-width="100">
        <FormItem label="标识:">
          <Input v-model="selectRtu.id" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input v-model="selectRtu.name" disabled></Input>
        </FormItem>
        <FormItem label="站点地址:">
          <Input type="number" min="0" max="255" v-model="selectRtu.slaveaddr" placeholder="0-255"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input type="number" min="0" max="10" v-model="selectRtu.timeout" placeholder="0-10"></Input>
        </FormItem>
        <FormItem label="波特率:">
          <Select @on-change="botelvOptionChange" v-model="selectRtu.baud" transfer="true" style="width:200px">
            <Option v-for="item in botelv" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据位:">
          <Select @on-change="shujuweiOptionChange" v-model="selectRtu.databit" transfer="true" style="width:200px">
            <Option v-for="item in shujuwei" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="停止位:">
          <Select @on-change="tingzhiweiOptionChange" v-model="selectRtu.stopbit" transfer="true"
                  style="width:200px">
            <Option v-for="item in tingzhiwei" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="奇偶校验:">
          <Select @on-change="jioujiaoyanOptionChange" v-model="selectRtu.acParity" transfer="true"
                  style="width:200px">
            <Option v-for="item in jioujiaoyan" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="串口号:">
          <Select @on-change="chuankouhaoOptionChange" v-model="selectRtu.acdevname" transfer="true"
                  style="width:200px">
            <Option v-for="item in chuankouhao" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="读取时间:">
          <Input type="number" min="1" max="10000" v-model="selectRtu.readtime" placeholder="0-10000"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Select @on-change="dayingRtuOptionChange" v-model="selectRtu.printdebug" transfer="true"
                  style="width:200px">
            <Option v-for="item in dayingRtu" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="ensModal"
      title="修改网口参数"
      @on-ok="EnsOk"
      @on-cancel="RtuCancel">
      <Form :model="selectEns" label-position="right" :label-width="100">
        <FormItem label="标识:">
          <Input v-model="selectEns.id" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input v-model="selectEns.name" disabled></Input>
        </FormItem>
        <FormItem label="CPU类:">
          <Input v-model="selectEns.cpu" disabled></Input>
        </FormItem>
        <FormItem label="服务器IP:">
          <Input @on-blur="checkIp('Ens')" v-model="selectEns.serverip"></Input>
        </FormItem>
        <FormItem label="端口:">
          <Input type="number" v-model="selectEns.port"></Input>
        </FormItem>
        <FormItem label="远程从站地址:">
          <Input type="number" v-model="selectEns.slaveaddr"></Input>
        </FormItem>
        <FormItem label="读取时间:">
          <Input type="number" v-model="selectEns.readtime"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input type="number" v-model="selectEns.timeout"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Select @on-change="dayingEnsOptionChange" v-model="selectEns.printdebug" transfer="true"
                  style="width:200px">
            <Option v-for="item in dayingEns" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        columns1: [
          {
            title: '标识',
            key: 'id'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '主(M)从(S)模式',
            key: 'model'
          },
          {
            title: '协议',
            key: 'type'
          },
          {
            title: '串口(ser)/网口(eth)',
            key: 'tptype'
          },
          {
            title: '是(1)否(0)使用',
            key: 'enable'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.open(params.index)
                    }
                  }
                }, '开启'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.change(params.index)
                    }
                  }
                }, '设置'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        data1: [
//          {
//            name: 'John Brown',
//            age: 18,
//            address: 'New York No. 1 Lake Park',
//            date: '2016-10-03'
//          },
        ],
        modal: false,
        modal1: false,
        ensModal: false,
        selectTcp: {
          id: '',
          name: '',
          slaveaddr: '',
          timeout: '',
          port: '',
          ip: '',
          readtime: '',
          printdebug: ''
        },
        selectRtu: {
          id: '',
          name: '',
          slaveaddr: '',
          timeout: '',
          baud: '',
          databit: '',
          stopbit: '',
          acParity: '',
          acdevname: '',
          readtime: '',
          printdebug: ''
        },
        selectEns: {
          id: '',
          name: '',
          cpu: '',
          serverip: '',
          port: '',
          slaveaddr: '',
          readtime: '',
          timeout: '',
          printdebug: ''
        },
        botelv: [
          {
            value: '300',
            label: '300'
          }, {
            value: '600',
            label: '600'
          }, {
            value: '1200',
            label: '1200'
          }, {
            value: '2400',
            label: '2400'
          }, {
            value: '4800',
            label: '4800'
          }, {
            value: '9600',
            label: '9600'
          }, {
            value: '14400',
            label: '14400'
          }, {
            value: '19200',
            label: '19200'
          }, {
            value: '38400',
            label: '38400'
          }, {
            value: '56000',
            label: '56000'
          }, {
            value: '57600',
            label: '57600'
          }, {
            value: '115200',
            label: '115200'
          }
        ],
        shujuwei: [
          {
            value: '8',
            label: '8'
          },
          {
            value: '7',
            label: '7'
          }
        ],
        chuankouhao: [
          {
            value: 'ttyS0',
            label: 'ttyS0'
          },
          {
            value: 'ttyS1',
            label: 'ttyS1'
          },
          {
            value: 'ttyS2',
            label: 'ttyS2'
          },
          {
            value: 'ttyS3',
            label: 'ttyS3'
          },
          {
            value: 'ttyS4',
            label: 'ttyS4'
          },
          {
            value: 'ttyS5',
            label: 'ttyS5'
          },
          {
            value: 'ttyS6',
            label: 'ttyS6'
          },
          {
            value: 'ttyS7',
            label: 'ttyS7'
          },
          {
            value: 'ttyS8',
            label: 'ttyS8'
          },
          {
            value: 'ttyS9',
            label: 'ttyS9'
          },
          {
            value: 'ttyS10',
            label: 'ttyS10'
          }
        ],
        jioujiaoyan: [
          {
            value: 'N',
            label: 'N'
          },
          {
            value: 'O',
            label: 'O'
          },
          {
            value: 'E',
            label: 'E'
          }
        ],
        tingzhiwei: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          }
        ],
        dayingRtu: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }
        ],
        dayingTcp: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }
        ],
        dayingEns: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }
        ]
      }
    },
    mounted () {
      this.GetXieYi()
    },
    methods: {
      //  获取协议列表
      GetXieYi () {
        this.$http.get('../cgi-bin/protocol_select.cgi').then((response) => {
          this.data1 = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      //  开启使能
      open (i) {
        this.$http.get(`../cgi-bin/protocol_enable.cgi?${i + 1}`).then((response) => {
//          console.log(response);
          this.GetXieYi()
        }).catch((error) => {
          console.log(error)
        })
      },
      change (i) {
        if (this.data1[i].type === 'MOD-TCP') {
          this.$http.get(`../cgi-bin/modtcp_select.cgi?${this.data1[i].name}`).then((response) => {
            this.selectTcp = response.data
          }).catch((error) => {
            console.log(error)
          })
          this.modal = true
        } else if (this.data1[i].type === 'MOD-RTU') {
          this.$http.get(`../cgi-bin/modrtu_select.cgi?${this.data1[i].name}`).then((response) => {
            this.selectRtu = response.data
          }).catch((error) => {
            console.log(error)
          })
          this.modal1 = true
        } else if (this.data1[i].type === 'SIEMENS') {
          this.$http.get(`../cgi-bin/siemens_select.cgi?${this.data1[i].name}`).then((response) => {
            this.ensModal = true
            this.selectEns = response.data
            console.log(response)
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      //  显示详情
      show (index) {
        this.$router.push(`/XieyiTb/${this.data1[index].name}`)
      },
      //  tcp确定修改
      TcpOk () {
        if (!this.checkIp('Tcp')) {
          setTimeout(() => {
            this.ensModal = true
          }, 10)
          return
        }
        var str = ''
        for (var i in this.selectTcp) {
          str += this.selectTcp[i] + '&'
        }
        this.$http.get(`../cgi-bin/modtcp_modify.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            this.$Message.info('修改成功')
            this.GetXieYi()
          } else {
            this.$Message.info('修改失败')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      TcpCancel () {
        this.$Message.info('放弃修改')
      },
      RtuOk () {
        var str = ''
        for (var i in this.selectRtu) {
          str += this.selectRtu[i] + '&'
        }
        this.$http.get(`../cgi-bin/modrtu_modify.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            this.$Message.info('修改成功')
            this.GetXieYi()
          } else {
            this.$Message.info('修改失败')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      RtuCancel () {
        this.$Message.info('Rtu cancel')
      },
      EnsOk () {
        if (!this.checkIp('Ens')) {
          setTimeout(() => {
            this.ensModal = true
          }, 10)
          return
        }
        var str = ''
        for (var i in this.selectEns) {
          str += this.selectEns[i] + '&'
        }
        this.$http.get(`../cgi-bin/siemens_modify.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            this.$Message.info('修改成功')
            this.GetXieYi()
          } else {
            this.$Message.info('修改失败')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      botelvOptionChange (value) {
        this.selectRtu.baud = value
      },
      shujuweiOptionChange (value) {
        this.selectRtu.databit = value
      },
      chuankouhaoOptionChange (value) {
        this.selectRtu.acdevname = value
      },
      jioujiaoyanOptionChange (value) {
        this.selectRtu.acParity = value
      },
      tingzhiweiOptionChange (value) {
        this.selectRtu.stopbit = value
      },
      dayingRtuOptionChange (value) {
        this.selectRtu.printdebug = value
      },
      dayingEnsOptionChange (value) {
        this.selectEns.printdebug = value
      },
      dayingTcpOptionChange (value) {
        this.selectTcp.printdebug = value
      },
      checkIp (num) {
        var reg = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/
        var bool = num === 'Tcp' ? reg.test(this.selectTcp.slaveaddr) : reg.test(this.selectEns.serverip)
        if (bool) {
          this.$Message.info('ip格式正确')
          return true
        } else {
          this.$Message.error('ip格式填写不正确')
          return false
        }
      }
    }
  }
</script>

<style>
</style>
