<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>监控界面</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div class="content">
        <p>设备序列号: <span>{{name}}</span></p>
        <div class="title">
          <p>时间：<span>{{time}}</span></p>
        </div>
      </div>
      <Row :gutter="16">
        <i-col class="datalist" span="6" v-for="(item, index) in dataList">
          <Table border :columns="columns" :data="dataList[index]"></Table>
        </i-col>
        <!--<i-col span="6">-->
        <!--<Table border :columns="columns" :data="data"></Table>-->
        <!--</i-col>-->
        <!--<i-col span="6">-->
        <!--<Table border :columns="columns" :data="data"></Table>-->
        <!--</i-col>-->
        <!--<i-col span="6">-->
        <!--<Table border :columns="columns" :data="data"></Table>-->
        <!--</i-col>-->
      </Row>
      <!--<Table border :columns="columns" :data="data"></Table>-->
    </Content>
  </Layout>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        time: '',
        name: '',
        dataList: [],
        columns: [
          {
            title: '标识',
            key: 'name'
          },
          {
            title: '数据',
            key: 'value'
          }
        ]
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        this.$http.get('../cgi-bin/monitor_data_select.cgi').then((result) => {
          this.name = result.data.device_id
          this.time = result.data.time
          var arr = []
          for (var i = 0; i < result.data.data.length; i++) {
            if (i !== 0 && (i + 1) % 10 === 0) {
              arr.push(result.data.data[i])
              this.dataList.push(arr)
              arr = []
              continue
            }
            arr.push(result.data.data[i])
            if (i === result.data.data.length - 1) {
              this.dataList.push(arr)
              arr = []
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  .content {
    margin: 10px auto 20px 0px;
  }

  .content > p {
    display: inline-block;
  }

  .content > .title {
    float: right;
    margin-right: 25px;
  }

  .datalist {
    margin-top: 25px;
  }
</style>
