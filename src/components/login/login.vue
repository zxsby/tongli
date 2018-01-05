<template>
  <div class="container demo-1">
    <div class="content">
      <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
        <div class="logo_box">
          <h3>欢迎你</h3>
          <form action="#" name="f" method="post">
            <div class="input_outer">
              <span class="u_user"></span>
              <input v-model="uname" name="logname" class="text" style="color: #FFFFFF !important" type="text"
                     placeholder="请输入账户">
            </div>
            <div class="input_outer">
              <span class="us_uer"></span>
              <input v-model="upwd" name="logpass" class="text"
                     style="color: #FFFFFF !important; position:absolute; z-index:100;"
                     value="" type="password" placeholder="请输入密码">
            </div>
            <div class="mb2"><a @click="login" class="act-but submit" href="javascript:;" style="color: #FFFFFF">登录</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        uname: '',
        upwd: ''
      }
    },
    methods: {
      login () {
        this.$http.post('../cgi-bin/login.cgi?' + this.uname + '&' + this.upwd, {
          uname: this.uname,
          upwd: this.upwd
        })
          .then((response) => {
            if (response.data.result === 'true') {
              localStorage.setItem('uname', this.uname)
              this.$router.push('/index')
            } else {
              this.warning(true)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      warning (nodesc) {
        this.$Notice.warning({
          title: 'Notification title',
          desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        })
      }
    }
  }
</script>

<style>
  /* Header */
  .large-header {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
  }
  .demo-1 .large-header {
    background-image: url('../../common/img/demo-1-bg.jpg');
  }
  .logo_box {
    width: 400px;
    height: 500px;
    padding: 35px;
    color: #EEE;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -250px;
  }

  .logo_box h3 {
    text-align: center;
    height: 20px;
    font: 20px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei", sans-serif;
    color: #FFFFFF;
    height: 20px;
    line-height: 20px;
    padding: 0 0 35px 0;
  }

  .forms {
    width: 280px;
    height: 485px;
  }

  .logon_inof {
    width: 100%;
    min-height: 450px;
    padding-top: 35px;
    position: relative;
  }

  .input_outer {
    height: 46px;
    padding: 0 5px;
    margin-bottom: 30px;
    border-radius: 50px;
    position: relative;
    border: rgba(255, 255, 255, 0.2) 2px solid !important;
  }

  .u_user {
    width: 25px;
    height: 25px;
    background: url(../../common/img/login_ico.png);
    background-position: -125px 0;
    position: absolute;
    margin: 10px 13px;
  }

  .us_uer {
    width: 25px;
    height: 25px;
    background-image: url(../../common/img/login_ico.png);
    background-position: -125px -34px;
    position: absolute;
    margin: 10px 13px;
  }

  .l-login {
    position: absolute;
    z-index: 1;
    left: 50px;
    top: 0;
    height: 46px;
    font: 14px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei";
    line-height: 46px;
  }

  .text {
    width: 220px;
    height: 46px;
    outline: none;
    display: inline-block;
    font: 14px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei";
    margin-left: 50px;
    border: none;
    background: none;
    line-height: 46px;
  }

  /*///*/
  .mb2 {
    margin-bottom: 20px
  }

  .mb2 a {
    text-decoration: none;
    outline: none;
  }

  .submit {
    padding: 15px;
    margin-top: 20px;
    display: block;
  }

  .act-but {
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    border-radius: 50px;
    background: #0096e6;
  }
</style>
