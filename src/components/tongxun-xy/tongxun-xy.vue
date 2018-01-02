<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>
        <router-link to="/index">协议列表</router-link>
      </BreadcrumbItem>
      <BreadcrumbItem>通讯协议</BreadcrumbItem>
    </Breadcrumb>
    <Tabs @on-click="tap">
      <TabPane label="读设置列表" icon="clipboard">
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
          <Table @on-selection-change="deleteChecked" ref="refTb" border :columns="columns" :data="data"></Table>
          <Page ref="page1" @on-change="pageChange" class="page" :page-size="pageSize" :total="Count"></Page>
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
          <Table @on-selection-change="deleteChecked" border :columns="columns" :data="data"></Table>
          <Page ref="page" @on-change="pageChange" class="page" :page-size="pageSize" :total="Count1"></Page>
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
          <Input v-model="changeMsg.protocol_name" disabled></Input>
        </FormItem>
        <FormItem label="模式:">
          <Input v-model="changeMsg.tptype" disabled></Input>
        </FormItem>
        <FormItem label="名称:">
          <Input @on-blur="OnBlur(false)" v-model="changeMsg.data_name"></Input>
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
          <Select @on-change="ChangeFunctionOptionChange" v-model="FunctionType" transfer="true" style="width:200px">
            <Option v-for="item in FunctionTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
          <Input @on-blur="OnBlur(true)" v-model="addMsg.data_name"></Input>
        </FormItem>
        <FormItem label="数据类型:">
          <Select @on-change="addOptionChange" v-model="addoptionDataType" transfer="true" style="width:200px">
            <Option v-for="item in DataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="起始地址:">
          <Input v-model="addMsg.startaddr"></Input>
        </FormItem>
        <FormItem label="功能码:">
          <Select @on-change="AddFunctionOptionChange" v-model="FunctionType" transfer="true" style="width:200px">
            <Option v-for="item in FunctionTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
        numIf: false,
        deleteRedArr: [],
        deleteWrtArr: [],
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
        FunctionTypeList: [
          {
            value: '请先选择数据类型',
            label: '请先选择数据类型'
          }
        ],
        optionDataType: '',
        FunctionType: '',
        addoptionDataType: '',
        changeShow: false,
        addShow: false,
        page: 0,
        searchStr: '',
        pageSize: 0,
        Count: 0,
        Count1: 0,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '协议名称',
            key: 'protocol_name'
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
                      this.Change(params.index)
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
        data: [],
        changeMsg: {
          id: '',
          protocol_name: '',
          tptype: '',
          data_name: '',
          datatype: '',
          readno: '',
          startaddr: '',
          functiontype: '',
          buff: ''
        },
        addMsg: {
          data_name: '',
          datatype: '',
          startaddr: '',
          functiontype: '',
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
          return 'ethernet'
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
          this.pageSize = 10
          type === 'read' ? this.Count = response.data.count : this.Count1 = response.data.count
          var arr = response.data.data.map((val) => {
            var functiontype = val.functiontype
            return functiontype === '1' ? 'Bit' : functiontype === '2' ? 'Inputbit' : functiontype === '3' ? 'Int' : functiontype === '4' ? 'Inputint' : functiontype === '5' ? 'Double' : functiontype === '6' ? 'InputDouble' : functiontype === '7' ? 'Float' : functiontype === '8' ? 'InputFloat' : ''
          })
          this.data = response.data.data
          for (var i = 0; i < arr.length; i++) {
            this.data[i].functiontype = arr[i]
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //  切换tap
      tap (i) {
        if (i === 0) {
          this.getList(this.searchStr, 1, 'read')
          this.numIf = false
          this.$refs.page1.currentPage = 1
        } else if (i === 1) {
          this.getList(this.searchStr, 1, 'write')
          this.$refs.page.currentPage = 1
          this.numIf = true
        }
      },
      //  切换页码
      pageChange (num) {
        this.page = num
        this.getList(this.searchStr, num, this.numIf ? 'write' : 'read')
      },
      //  弹出修改层
      Change (index) {
        this.changeShow = true
        this.changeMsg = this.data[index]
        this.optionDataType = this.data[index].datatype
        var FunType = this.data[index].functiontype
        console.log(FunType)
        if (FunType == 'Bit' || FunType == 'Inputbit') {
          this.FunctionTypeList = [
            {
              value: 'Bit',
              label: 'Bit'
            },
            {
              value: 'Inputbit',
              label: 'Inputbit'
            }
          ]
        } else if (FunType == 'Int' || FunType == 'Inputint') {
          this.FunctionTypeList = [
            {
              value: 'Int',
              label: 'Int'
            },
            {
              value: 'Inputint',
              label: 'Inputint'
            }
          ]
        } else if (FunType == 'Double' || FunType == 'InputDouble') {
          this.FunctionTypeList = [
            {
              value: 'Double',
              label: 'Double'
            },
            {
              value: 'InputDouble',
              label: 'InputDouble'
            }
          ]
        } else if (FunType == 'Float' || FunType == 'InputFloat') {
          this.FunctionTypeList = [
            {
              value: 'Float',
              label: 'Float'
            },
            {
              value: 'Inputint',
              label: 'Inputint'
            }
          ]
        }
        this.FunctionType = this.data[index].functiontype
      },
//      // 读修改
//      redChange (index) {
//        this.changeShow = true
//        this.changeMsg = this.data[index]
//        this.optionDataType = this.data[index].datatype
//        this.numIf = false
//      },
      //  下拉选项框数据变化时
      OptionChange (value) {
        this.changeMsg.datatype = value
        switch (value) {
          case 'bit':
            this.FunctionTypeList = [
              {
                value: 'Bit',
                label: 'Bit'
              },
              {
                value: 'Inputbit',
                label: 'Inputbit'
              }
            ]
            break;
          case 'int':
            this.FunctionTypeList = [
              {
                value: 'Int',
                label: 'Int'
              },
              {
                value: 'Inputint',
                label: 'Inputint'
              }
            ]
            break;
          case 'float':
            this.FunctionTypeList = [
              {
                value: 'Float',
                label: 'Float'
              },
              {
                value: 'Inputint',
                label: 'Inputint'
              }
            ]
            break;
          case 'double':
            this.FunctionTypeList = [
              {
                value: 'Double',
                label: 'Double'
              },
              {
                value: 'InputDouble',
                label: 'InputDouble'
              }
            ]
            break;
          default:
        }
      },
      //  确认修改
      ChangeOk () {
        console.log(this.numIf);
        var str = this.searchStr.replace('-', '_')
        this.numIf ? str += '_W&' : str += '_R&'
        console.log(str)
        for (let i in this.changeMsg) {
          if (i === 'readno') {
            continue
          }
          str += `${this.changeMsg[i]}&`
        }
        this.$http.get(`../cgi-bin/data_modify.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            var type = ''
            this.numIf ? type = 'write' : type = 'read'
            this.getList(this.searchStr, this.page, type)
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
            var str = this.searchStr.replace('-', '_')
            this.numIf ? str += '_W&' : str += '_R&'
            str += `&${this.data[index].id}`
            this.$http.get(`../cgi-bin/data_delete.cgi?${str}`).then((response) => {
              if (response.data.result === 'true') {
                var type = ''
                this.numIf ? type = 'write' : type = 'read'
                this.getList(this.searchStr, this.page, type)
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
          buff: ''
        }
        this.addoptionDataType = ''
        this.FunctionType = ''
      },
      addOptionChange (value) {
        this.addMsg.datatype = value
        switch (value) {
          case 'bit':
            this.FunctionTypeList = [
              {
                value: 'Bit',
                label: 'Bit'
              },
              {
                value: 'Inputbit',
                label: 'Inputbit'
              }
            ]
            break;
          case 'int':
            this.FunctionTypeList = [
              {
                value: 'Int',
                label: 'Int'
              },
              {
                value: 'Inputint',
                label: 'Inputint'
              }
            ]
            break;
          case 'float':
            this.FunctionTypeList = [
              {
                value: 'Float',
                label: 'Float'
              },
              {
                value: 'Inputint',
                label: 'Inputint'
              }
            ]
            break;
          case 'double':
            this.FunctionTypeList = [
              {
                value: 'Double',
                label: 'Double'
              },
              {
                value: 'InputDouble',
                label: 'InputDouble'
              }
            ]
            break;
          default:
        }
      },
      ChangeFunctionOptionChange (value) {
        console.log(value)
        switch (value) {
          case 'Bit':
            this.changeMsg.functiontype = 1
            break;
          case 'Inputbit':
            this.changeMsg.functiontype = 2
            break;
          case 'Int':
            this.changeMsg.functiontype = 3
            break;
          case 'Inputint':
            this.changeMsg.functiontype = 4
            break;
          case 'Double':
            this.changeMsg.functiontype = 5
            break;
          case 'InputDouble':
            this.changeMsg.functiontype = 6
            break;
          case 'Float':
            this.changeMsg.functiontype = 7
            break;
          case 'InputFloat':
            this.changeMsg.functiontype = 8
            break;
          default:
        }
      },
      AddFunctionOptionChange (value) {
        switch (value) {
          case 'Bit':
            this.addMsg.functiontype = 1
            break;
          case 'Inputbit':
            this.addMsg.functiontype = 2
            break;
          case 'Int':
            this.addMsg.functiontype = 3
            break;
          case 'Inputint':
            this.addMsg.functiontype = 4
            break;
          case 'Double':
            this.addMsg.functiontype = 5
            break;
          case 'InputDouble':
            this.addMsg.functiontype = 6
            break;
          case 'Float':
            this.addMsg.functiontype = 7
            break;
          case 'InputFloat':
            this.addMsg.functiontype = 8
            break;
          default:
        }
      },
      //  确定添加
      addOk () {
        var str = `${this.searchStr.replace('-', '_')}`
        this.numIf ? str += '_W&' : str += '_R&'
        str += `${this.searchStr}&${this.checkedTpType}&`
        for (let i in this.addMsg) {
          str += `${this.addMsg[i]}&`
        }
        this.$http.get(`../cgi-bin/data_insert.cgi?${str}`).then((response) => {
          if (response.data.result === 'true') {
            var type = ''
            this.numIf ? type = 'write' : type = 'read'
            this.getList(this.searchStr, this.page, type)
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
          title: '删除',
          content: '<p>确定是否删除所选中的数据</p>',
          onOk: () => {
            var str = this.searchStr.replace('-', '_')
            this.numIf ? str += '_W&' : str += '_R&'
            var arr = this.numIf ? this.deleteWrtArr : this.deleteRedArr
            if (arr.length === 0) {
              this.$Message.info('至少选中一个')
            } else {
              for (var i of arr) {
                str += `${i.id}&`
              }
              this.$http.get(`../cgi-bin/data_batch_delete.cgi?${str}`).then((response) => {
                if (response.data.result === 'true') {
                  var type = ''
                  this.numIf ? type = 'write' : type = 'read'
                  this.getList(this.searchStr, 1, type)
                }
              }).catch((error) => {
                console.log(error)
              })
            }
          },
          onCancel: () => {
            this.$Message.info('放弃删除')
          }
        })
      },
      deleteChecked(i) {
        this.numIf ? this.deleteWrtArr = i : this.deleteRedArr = i

      },
      //  验证用户名
      OnBlur(bool) {

        var str = this.searchStr.replace('-', '_')
        this.numIf ? str += '_W&' : str += '_R&'
        if (bool) {
          str += this.addMsg.data_name
        } else {
          str += this.changeMsg.data_name
        }
        this.$http.get(`../cgi-bin/data_name_query.cgi?${str}`).then((response) => {
          if (response.data.data === 'true') {
            this.$Message.success('该名称可以使用');
          } else if (response.data.data === 'false') {
            this.$Message.info({
              content: '该用户名已存在',
              duration: 10,
              closable: true
            });
          }
        }).catch((error) => {
          console.log(error)
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

  .delet {
    float: right;
  }
</style>
