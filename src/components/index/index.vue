<!--<template>-->
<!--<div class="layout">-->
<!--<Layout>-->
<!--<Header>-->
<!--<Menu @on-select="goTo" mode="horizontal" theme="dark" active-name="1">-->
<!--<div class="layout-logo"></div>-->
<!--<div class="layout-nav">-->
<!--<MenuItem name="1">-->
<!--<Icon type="ios-navigate"></Icon>-->
<!--协议列表-->
<!--</MenuItem>-->
<!--<MenuItem name="2">-->
<!--<Icon type="ios-keypad"></Icon>-->
<!--通讯设置-->
<!--</MenuItem>-->
<!--<MenuItem name="3">-->
<!--<Icon type="ios-analytics"></Icon>-->
<!--Item 3-->
<!--</MenuItem>-->
<!--<MenuItem name="4">-->
<!--<Icon type="ios-paper"></Icon>-->
<!--Item 4-->
<!--</MenuItem>-->
<!--</div>-->
<!--</Menu>-->
<!--</Header>-->
<!--<Layout>-->
<!--<Sider hide-trigger :style="{background: '#fff'}">-->
<!--<Menu active-name="1-2" theme="light" width="auto">-->
<!--<Submenu name="1">-->
<!--<template slot="title">-->
<!--<Icon type="ios-navigate"></Icon>-->
<!--Item 1-->
<!--</template>-->
<!--<MenuItem name="1-1">Option 1</MenuItem>-->
<!--<MenuItem name="1-2">Option 2</MenuItem>-->
<!--<MenuItem name="1-3">Option 3</MenuItem>-->
<!--</Submenu>-->
<!--<Submenu name="2">-->
<!--<template slot="title">-->
<!--<Icon type="ios-keypad"></Icon>-->
<!--Item 2-->
<!--</template>-->
<!--<MenuItem name="2-1">Option 1</MenuItem>-->
<!--<MenuItem name="2-2">Option 2</MenuItem>-->
<!--</Submenu>-->
<!--<Submenu name="3">-->
<!--<template slot="title">-->
<!--<Icon type="ios-analytics"></Icon>-->
<!--Item 3-->
<!--</template>-->
<!--<MenuItem name="3-1">Option 1</MenuItem>-->
<!--<MenuItem name="3-2">Option 2</MenuItem>-->
<!--</Submenu>-->
<!--</Menu>-->
<!--</Sider>-->
<!--<router-view></router-view>-->
<!--</Layout>-->
<!--</Layout>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--mounted () {-->
<!--this.checkedLogin()-->
<!--},-->
<!--methods: {-->
<!--checkedLogin () {-->
<!--console.log(1)-->
<!--console.log(localStorage.getItem('uname'))-->
<!--if (localStorage.getItem('uname') === null) {-->
<!--console.log(localStorage.getItem('uname'))-->
<!--this.$router.push('/')-->
<!--}-->
<!--},-->
<!--goTo (i) {-->
<!--if (i === '1') {-->
<!--this.$router.push('/XieyiTb')-->
<!--} else if (i === '2') {-->
<!--this.$router.push('/TXstting')-->
<!--}-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.layout {-->
<!--border: 1px solid #d7dde4;-->
<!--background: #f5f7f9;-->
<!--position: relative;-->
<!--border-radius: 4px;-->
<!--overflow: hidden;-->
<!--}-->

<!--.layout-logo {-->
<!--width: 100px;-->
<!--height: 30px;-->
<!--background: #5b6270;-->
<!--border-radius: 3px;-->
<!--float: left;-->
<!--position: relative;-->
<!--top: 15px;-->
<!--left: 20px;-->
<!--}-->

<!--.layout-nav {-->
<!--width: 420px;-->
<!--margin: 0 auto;-->
<!--margin-right: 20px;-->
<!--}-->
<!--</style>-->


<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .header {
    display: inline-block;
    vertical-align: top;
    float: right;
    margin-right: 10px;
  }

  #a > i {
    margin-right: 0px
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu @on-select="goTo" active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            <span>协议列表</span>
          </MenuItem>
          <MenuItem name="2">
            <Icon type="search"></Icon>
            <span>通讯设置</span>
          </MenuItem>
          <MenuItem name="3">
            <Icon type="settings"></Icon>
            <span>监控平台</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout style="">
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round"
                size="24"></Icon>
          <Menu @on-select="User" class="header" mode="horizontal" :theme="dark" active-name="1">
            <Submenu name="3">
              <template slot="title">
                <Avatar id="a" icon="person"/>
                <span>{{uname}}</span>
              </template>
              <MenuGroup title="设置">
                <MenuItem name="changePwd">修改密码</MenuItem>
              </MenuGroup>
              <MenuGroup title="操作">
                <MenuItem name="logOut">退出登录</MenuItem>
              </MenuGroup>
            </Submenu>
          </Menu>
        </Header>
        <router-view></router-view>
      </Layout>
    </Layout>
    <Modal
      title="密码修改"
      v-model="changepwd"
      class-name="vertical-center-modal"
      @on-ok="changepwdOk"
      @on-cancel="noChange">
      <Form :model="changepswd" label-position="right" :label-width="100">
        <FormItem label="旧密码:">
          <Input type="password" v-model="changepswd.oldPwd"></Input>
        </FormItem>
        <FormItem label="新密码:">
          <Input type="password" v-model="changepswd.newPwd"></Input>
        </FormItem>
        <FormItem label="再次输入新密码:">
          <Input type="password" v-model="changepswd.checkNewPwd"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.checkedLogin()
    },
    data () {
      return {
        isCollapsed: false,
        changepwd: false,
        changepswd: {
          oldPwd: '',
          newPwd: '',
          checkNewPwd: ''
        }
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ]
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      uname () {
        return localStorage.getItem('uname')
      }
    },
    methods: {
      checkedLogin () {
        if (localStorage.getItem('uname') === null) {
          this.$router.push('/')
        }
      },
      goTo (i) {
        if (i === '1') {
          this.$router.push('/XieyiTb')
        } else if (i === '2') {
          this.$router.push('/TXstting')
        } else if (i === '3') {
          this.$router.push('/JianKong')
        }
      },
      User (i) {
        if (i === 'changePwd') {
          this.changepwd = true
        }
        if (i === 'logOut') {
          localStorage.removeItem('uname')
          this.$router.push('/')
        }
      },
      collapsedSider () {
        this.$refs.side1.toggleCollapse()
      },
      changepwdOk () {
        for (var i in this.changepswd) {
          if (this.changepswd[i] === '') {
            this.$Message.info({
              content: '请填写完整数据',
              duration: 10,
              closable: true
            })
            setTimeout(() => {
              this.changepwd = true
            }, 10)
            return
          }
        }
        if (this.changepswd.newPwd !== this.changepswd.checkNewPwd) {
          this.$Message.error('两次密码不一致')
          setTimeout(() => {
            this.changepsd = true
          }, 10)
          return
        }
        this.$http.get(`../cgi-bin/passwd_modify.cgi?${localStorage.getItem('uname')}&${this.changepswd.oldPwd}&${this.changepswd.newPwd}`).then((result) => {
          console.log(result)
          if (result.data.result === 'true') {
            this.$Message.success('修改成功,请重新登录')
            localStorage.removeItem('uname')
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      noChange () {
        this.$Message.info('放弃修改')
      }
    }
  }
</script>
