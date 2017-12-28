<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>协议列表</BreadcrumbItem>
      <BreadcrumbItem>通讯协议</BreadcrumbItem>
    </Breadcrumb>
    <Tabs @on-click="tap">
      <TabPane label="读设置列表" icon="clipboard">
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <Table border :columns="columns" :data="data"></Table>
          <Page class="page" :page-size="pageSize" :total="Count"></Page>
        </Content>
      </TabPane>
      <TabPane label="写设置列表" icon="edit">
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <Tooltip placement="top" class="add" content="添加一个新设备">
            <Button @click="showAdd" type="primary">
              <Icon type="plus-circled"></Icon>
              添加
            </Button>
          </Tooltip>
          <Tooltip placement="top" class="delet" content="删除所有数据">
            <Button @click="deleteAll" type="error">
              <Icon type="trash-a"></Icon>
              删除
            </Button>
          </Tooltip>
          <Table border :columns="columns1" :data="data1"></Table>
          <Page @on-change="pageChange" class="page" :page-size="pageSize1" :total="Count1"></Page>
        </Content>
      </TabPane>
    </Tabs>
    <Modal
      v-model="changeShow"
      title="修改XXXXX"
      @on-ok="ChangeOk"
      @on-cancel="NoChange">
      <Form :model="changeMsg" label-position="right" :label-width="100">
        <FormItem label="标识:">
          <Input v-model="changeMsg.id" disabled></Input>
        </FormItem>
        <FormItem label="协议名称:">
          <Input v-model="changeMsg.name" disabled></Input>
        </FormItem>
        <FormItem label="模式:">
          <Input v-model="changeMsg.tptype" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input v-model="changeMsg.data_name"></Input>
        </FormItem>
        <FormItem label="读写字节:">
          <Input v-model="changeMsg.readno" disabled></Input>
        </FormItem>
        <FormItem label="数据类型:">
          <Select @on-change="OptionChange" v-model="optionDataType" transfer="true" style="width:200px">
            <Option v-for="item in DataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="起始地址:">
          <Input v-model="changeMsg.startaddr"></Input>
        </FormItem>
        <FormItem label="功能码:">
          <Input v-model="changeMsg.functiontype"></Input>
        </FormItem>
        <FormItem label="读写模式:">
          <Input v-model="changeMsg.rxtx"></Input>
        </FormItem>
        <FormItem label="数据:">
          <Input v-model="changeMsg.buff"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="addShow"
      title="添加一个新设备"
      @on-ok="addOk"
      @on-cancel="Noadd">
      <Form :model="changeMsg" label-position="right" :label-width="100">
        <FormItem label="协议名称:">
          <Input v-model="searchStr" disabled></Input>
        </FormItem>
        <FormItem label="模式:">
          <Input v-model="checkedTpType" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input v-model="addMsg.data_name"></Input>
        </FormItem>
        <FormItem label="数据类型:">
          <Select @on-change="addOptionChange" v-model="addoptionDataType" transfer="true" style="width:200px">
            <Option v-for="item in addDataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="起始地址:">
          <Input v-model="addMsg.startaddr"></Input>
        </FormItem>
        <FormItem label="功能码:">
          <Input v-model="addMsg.functiontype"></Input>
        </FormItem>
        <FormItem label="读写模式:">
          <Input v-model="addMsg.rxtx"></Input>
        </FormItem>
        <FormItem label="数据:">
          <Input v-model="addMsg.buff"></Input>
        </FormItem>
      </Form>
    </Modal>

  </Layout>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        DataTypeList: [
          {
            value: 'bit',
            label: 'bit'
          },
          {
            value: 'int',
            label: 'int'
          },
          {
            value: 'float',
            label: 'float'
          },
          {
            value: 'double',
            label: 'double'
          }
        ],
        addDataTypeList: [
          {
            value: 'bit',
            label: 'bit'
          },
          {
            value: 'int',
            label: 'int'
          },
          {
            value: 'float',
            label: 'float'
          },
          {
            value: 'double',
            label: 'double'
          }
        ],
        optionDataType: '',
        addoptionDataType: '',
        changeShow: false,
        addShow: false,
        page: 0,
        searchStr: '',
        pageSize: 0,
        Count: 0,
        pageSize1: 0,
        Count1: 0,
        columns: [
          {
            title: '标识',
            key: 'id'
          },
          {
            title: '协议名称',
            key: 'name'
          },
          {
            title: '模式',
            key: 'tptype'
          },
          {
            title: '名称',
            key: 'data_name'
          },
          {
            title: '数据类型',
            key: 'datatype'
          },
          {
            title: '读写字节',
            key: 'readno'
          },
          {
            title: '起始地址',
            key: 'startaddr'
          },
          {
            title: '功能码',
            key: 'functiontype'
          },
          {
            title: '读写模式',
            key: 'rxtx'
          },
          {
            title: '数据',
            key: 'buff'
          },
          {
            title: '操作',
            key: 'enable'
          }
        ],
        data: [],
        columns1: [
          {
            title: '标识',
            key: 'id'
          },
          {
            title: '协议名称',
            key: 'name'
          },
          {
            title: '模式',
            key: 'tptype'
          },
          {
            title: '名称',
            key: 'data_name'
          },
          {
            title: '数据类型',
            key: 'datatype'
          },
          {
            title: '读写字节',
            key: 'readno'
          },
          {
            title: '起始地址',
            key: 'startaddr'
          },
          {
            title: '功能码',
            key: 'functiontype'
          },
          {
            title: '读写模式',
            key: 'rxtx'
          },
          {
            title: '数据',
            key: 'buff'
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
                      this.change(params.index)
                    }
                  }
                }, '修改'),
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
                      this.deleteOne(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: [],
        changeMsg: {
          id: '',
          name: '',
          tptype: '',
          data_name: '',
          datatype: '',
          readno: '',
          startaddr: '',
          functiontype: '',
          rxtx: '',
          buff: ''
        },
        addMsg: {
          data_name: '',
          datatype: '',
          startaddr: '',
          functiontype: '',
          rxtx: '',
          buff: ''
        }
      }
    },
    computed: {
      checkedTpType () {
        var str = this.searchStr
        var TCP = str.indexOf('TCP')
        var RTU = str.indexOf('RTU')
  //      var ENS = str.indexOf('ENS')
        if (TCP !== -1) {
          return 'ethernet'
        } else if (RTU !== -1) {
          return 'serial'
        } else {
          return 'serial'
        }
      }
    },
    mounted () {
      this.searchStr = this.$route.params.id
      this.getList(this.searchStr, this.page, 'read')
    },
    methods: {
      //  获取数据
      getList (str, num, type) {
        str = str.replace('-', '_')
        type === 'read' ? str += '_R' : str += '_W'
        this.$http.get(`../cgi-bin/data_select.cgi?${str}&${num}`).then((response) => {
          if (type === 'read') {
            this.pageSize = 20
            this.Count = response.data.count
            this.data = response.data.data
          } else {
            this.pageSize1 = 20
            this.Count1 = response.data.count
            this.data1 = response.data.data
            console.log(response.data.data)
            console.log(this.pageSize1, this.Count1, this.data1)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //  切换tap
      tap (i) {
        if (i === 0) {
          this.getList(this.searchStr, 0, 'read')
        } else if (i === 1) {
          this.getList(this.searchStr, 0, 'write')
        }
      },
      //  切换页码
      pageChange (num) {
        this.page = num
        this.getList(this.searchStr, num, 'write')
      },
      //  弹出修改层
      change (index) {
        this.changeShow = true
        this.changeMsg = this.data1[index]
        this.optionDataType = this.data1[index].datatype
      },
      //  下拉选项框数据变化时
      OptionChange (value) {
        this.changeMsg.datatype = value
      },
      //  确认修改
      ChangeOk () {
        var str = this.searchStr.replace('-', '_') + '_W&'
        for (let i in this.changeMsg) {
          if (i === 'readno') {
            continue
          }
          str += `${this.changeMsg[i]}&`
        }
        this.$http.get(`../cgi-bin/data_modify.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            this.getList(this.searchStr, this.page, 'write')
            this.$Message.info('修改成功')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      //  放弃修改
      NoChange () {
        this.$Message.info('取消修改')
      },
      //  删除一个
      deleteOne (index) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确定是否删除</p>',
          onOk: () => {
            var str = this.searchStr.replace('-', '_') + '_W'
            str += `&${this.data1[index].id}`
            this.$http.get(`../cgi-bin/data_delete.cgi?${str}`).then((response) => {
              if (response.data.result === 'true') {
                this.getList(this.searchStr, this.page, 'write')
                this.$Message.info('删除成功')
              }
            }).catch((error) => {
              console.log(error)
            })
          },
          onCancel: () => {
            this.$Message.info('放弃删除')
          }
        })
      },
      //  显示添加
      showAdd () {
        this.addShow = true
        this.addMsg = {
          data_name: '',
          datatype: '',
          startaddr: '',
          functiontype: '',
          rxtx: '',
          buff: ''
        }
        this.addoptionDataType = ''
      },
      addOptionChange (value) {
        this.addMsg.datatype = value
      },
      //  确定添加
      addOk () {
        var str = `${this.searchStr.replace('-', '_')}_W&${this.searchStr}&${this.checkedTpType}&`
        for (let i in this.addMsg) {
          str += `${this.addMsg[i]}&`
        }
        this.$http.get(`../cgi-bin/data_insert.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            this.getList(this.searchStr, this.page, 'write')
            this.$Message.info('添加成功')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      //  取消添加
      Noadd () {
        this.$Message.info('放弃添加')
      },
      // 删除所有数据
      deleteAll () {
        this.$Modal.confirm({
          title: '删除所有',
          content: '<p>确定是否删除所有数据</p>',
          onOk: () => {
            this.$http.get(`../cgi-bin/empty_data.cgi`).then((response) => {
              console.log(response)
              if (response.data.result === 'true') {
                this.getList(this.searchStr, this.page, 'write')
                this.$Message.info('删除成功')
              }
            }).catch((error) => {
              console.log(error)
            })
          },
          onCancel: () => {
            this.$Message.info('放弃删除')
          }
        })
      }
    }
  }
</script>
<style>
  .page {
    float: right;
    margin-top: 20px;
  }
  .add {
    margin-bottom: 20px;
  }
  .delet{
    float:right;
  }
</style>
