<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>协议列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <Table border :columns="columns1" :data="data1"></Table>
    </Content>
  </Layout>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted() {

    },
    methods: {
      getList () {
        this.$http.get().then((result) => {

        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style>
</style>
