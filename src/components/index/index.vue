<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu @on-select="goTo" mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              协议列表
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              通讯设置
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    methods: {
      goTo (i) {
        if (i === '1') {
          this.$router.push('/XieyiTb')
        } else if (i === '2') {
          this.$router.push('/TXstting')
        }
      }
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>


<!--<template>-->
<!--<div class="index">-->
<!--<div class="index-left">-->
<!--<div class="index-logo"></div>-->
<!--<div class="wellcome">-->
<!--<div class="user-img">-->
<!--<img src="../../common/img/user.png" alt="">-->
<!--</div>-->
<!--<div class="wellcome-text">-->
<!--<p>欢迎回来</p>-->
<!--<Button type="primary">Primary</Button>-->
<!--<p>超级管理员</p>-->
<!--</div>-->
<!--</div>-->
<!--<div class="left-main">-->
<!--<div class="left-index">-->
<!--<p>后台首页</p>-->
<!--</div>-->
<!--<p>数据管理</p>-->
<!--<div class="main-ul">-->
<!--<ul>-->
<!--<li class="iconfont icon-liebiao">-->
<!--通讯协议-->
<!--<div class="tx-ul">-->
<!--<ul>-->
<!--<li class="iconfont icon-lianjiexian2">-->
<!--<a href="">读设置列表</a>-->
<!--</li>-->
<!--<li class="iconfont icon-lianjiexian2">-->
<!--<a href="">写设置列表</a>-->
<!--</li>-->
<!--<li class="iconfont icon-lianjiexian2">XXXXXXX</li>-->
<!--</ul>-->
<!--</div>-->
<!--</li>-->
<!--<li class="iconfont icon-liebiao">XXXXXXXX</li>-->
<!--<li class="iconfont icon-liebiao">XXXXXXXX</li>-->
<!--</ul>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="index-right">-->
<!--<div class="right-header">-->
<!--<div class="header-right">-->
<!--<div>-->
<!--<img src="../../common/img/user.png" alt="">-->
<!--</div>-->
<!--<span>超级管理员</span>-->
<!--</div>-->
<!--</div>-->
<!--<router-view></router-view>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
<!--</script>-->

<!--<style>-->
<!--.index {-->
<!--position: absolute;-->
<!--top: 0;-->
<!--left: 0;-->
<!--right: 0;-->
<!--bottom: 0;-->
<!--}-->

<!--.index-left {-->
<!--position: absolute;-->
<!--top: 0;-->
<!--display: inline-block;-->
<!--width: 18%;-->
<!--height: 100%;-->
<!--background-color: #2a3f54;-->
<!--}-->

<!--.index-right {-->
<!--position: absolute;-->
<!--top: 0;-->
<!--left: 18%;-->
<!--display: inline-block;-->
<!--width: 80%;-->
<!--height: 100%;-->
<!--border: 1px solid red;-->
<!--}-->

<!--.index-logo {-->
<!--height: 60px;-->
<!--width: 100%;-->
<!--border: 1px solid red;-->
<!--}-->

<!--.wellcome {-->
<!--display: flex;-->
<!--align-items: center;-->
<!--height: 80px;-->
<!--width: 100%;-->
<!--border: 1px solid yellow;-->
<!--}-->

<!--.user-img {-->
<!--display: inline-block;-->
<!--width: 58px;-->
<!--height: 58px;-->
<!--border-radius: 50%;-->
<!--overflow: hidden;-->
<!--}-->

<!--.user-img > img {-->
<!--width: 100%;-->
<!--height: 100%;-->
<!--}-->

<!--.wellcome-text {-->
<!--margin-left: 20px;-->
<!--color: white;-->
<!--}-->

<!--.left-main {-->
<!--}-->

<!--.left-main > p {-->
<!--font-size: 13px;-->
<!--color: white;-->
<!--margin-bottom: 10px;-->
<!--padding-left: 20px;-->
<!--}-->

<!--.left-index {-->
<!--height: 70px;-->
<!--margin-top: 40px;-->
<!--color: #E7E7E7;-->
<!--cursor: pointer;-->
<!--padding-left: 20px;-->
<!--}-->

<!--.main-ul > ul > li {-->
<!--width: 100%;-->
<!--height: 45px;-->
<!--padding-left: 20px;-->
<!--color: #E7E7E7;-->
<!--}-->

<!--.right-header {-->
<!--height: 60px;-->
<!--width: 100%;-->
<!--background-color: #EDEDED;-->

<!--}-->

<!--.header-right {-->
<!--float: right;-->
<!--width: 20%;-->
<!--line-height: 60px;-->
<!--color: #515356 !important;-->
<!--}-->

<!--.header-right > div {-->
<!--width: 30px;-->
<!--height: 30px;-->
<!--border-radius: 100px;-->
<!--display: inline-block;-->
<!--vertical-align: sub;-->
<!--}-->

<!--.header-right > div > img {-->
<!--width: 100%;-->
<!--height: 100%;-->
<!--}-->
<!--</style>-->
