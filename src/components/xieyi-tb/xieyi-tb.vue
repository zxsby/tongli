<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>协议列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <Table border :columns="columns1" :data="data1"></Table>
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
          <Input v-model="selectTcp.slaveaddr"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input v-model="selectTcp.timeout"></Input>
        </FormItem>
        <FormItem label="端口:">
          <Input v-model="selectTcp.port"></Input>
        </FormItem>
        <FormItem label="IP地址:">
          <Input v-model="selectTcp.ip"></Input>
        </FormItem>
        <FormItem label="读取时间:">
          <Input v-model="selectTcp.readtime"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Input v-model="selectTcp.printdebug"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modal1"
      title="修改网口参数"
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
          <Input v-model="selectRtu.slaveaddr"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input v-model="selectRtu.timeout"></Input>
        </FormItem>
        <FormItem label="波特率:">
          <Input v-model="selectRtu.baud"></Input>
        </FormItem>
        <FormItem label="数据位:">
          <Input v-model="selectRtu.databit"></Input>
        </FormItem>
        <FormItem label="停止位:">
          <Input v-model="selectRtu.stopbit"></Input>
        </FormItem>
        <FormItem label="奇偶校验:">
          <Input v-model="selectRtu.acParity"></Input>
        </FormItem>
        <FormItem label="串口号:">
          <Input v-model="selectRtu.acdevname"></Input>
        </FormItem>
        <FormItem label="读取时间:">
          <Input v-model="selectRtu.readtime"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Input v-model="selectRtu.printdebug"></Input>
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
          <Input v-model="selectEns.serverip"></Input>
        </FormItem>
        <FormItem label="端口:">
          <Input v-model="selectEns.port"></Input>
        </FormItem>
        <FormItem label="远程从站地址:">
          <Input v-model="selectEns.slaveaddr"></Input>
        </FormItem>
        <FormItem label="读取时间:">
          <Input v-model="selectEns.readtime"></Input>
        </FormItem>
        <FormItem label="超时时间:">
          <Input v-model="selectEns.timeout"></Input>
        </FormItem>
        <FormItem label="打印调试信息:">
          <Input v-model="selectEns.printdebug"></Input>
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
            title: '主从模式',
            key: 'model'
          },
          {
            title: '协议',
            key: 'type'
          },
          {
            title: '串/网口',
            key: 'tptype'
          },
          {
            title: '是否使用',
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
        }
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
        this.$Message.info('Tcp cancel')
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
      }
    }
  }
</script>

<style>
</style>
