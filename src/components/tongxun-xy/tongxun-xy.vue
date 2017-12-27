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
          <Button   type="primary">
            <Icon type="plus-circled"></Icon>
            添加
          </Button>
          </Tooltip>
          <Table border :columns="columns1" :data="data1"></Table>
          <Page class="page" :page-size="pageSize1" :total="Count1"></Page>
        </Content>
      </TabPane>
    </Tabs>

  </Layout>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
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
                      this.open(params.index)
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
                      this.change(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: []
      }
    },
    mounted () {
      this.searchStr = this.$route.params.id
      this.getList(this.searchStr, 0, 'read')
    },
    methods: {
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
            console.log(this.pageSize1, this.Count1);
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      tap (i) {
        if (i === 0) {
          this.getList(this.searchStr, 0, 'read')
        } else if (i === 1) {
          this.getList(this.searchStr, 0, 'write')
        }
      }
    }
  }
</script>
<style>
  .page {
    float: right;
    margin-top: 20px;
  }
  .add{
    margin-bottom: 20px;
  }
</style>
