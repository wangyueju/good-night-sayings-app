<template>
  <div class="user-login-view">
    <header>
      <i @click="back"></i>
    </header>

    <main>
      <h2>请登录</h2>
      <div class="input">
        <wd-input v-model="phone" placeholder="手机号"></wd-input>
        <wd-input v-model="password" show-password placeholder="密码"></wd-input>
      </div>

      <div class="btn">
        <wd-button block type="info" @click="login">登录</wd-button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "UserLoginView",
  data() {
    return {
      phone: "",
      password: "",
      username: null,
      headimage: null
    };
  },
  methods: {
    back() {
      this.$router.back(); //后退
    },

    login() {
      if (this.phone == "") {
        return alert("手机号不能为空哦~~~");
      } else if (this.password == "") {
        return alert("密码不能为空哦~~~");
      }
      // console.log(this.$md5(this.password)); // 84dfbb4d7acc25933086dcd526fd5804

      this.password = this.$md5(this.password);
      this.$axios
        .get(
          `/api/shengcai/api/mobile/common/loginBytype?mobilenum=${this.phone}&md5pwd=${this.password}&meetid=1339&phonemodel=0`
        )
        .then(({ data }) => {
          console.log(data);
          this.username = data.user.username;
          this.headimage = "http://pic.msckeji.com//" + data.user.headimage;

          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("headimage", this.headimage);
        });

      this.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.user-login-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 100;
  background-color: rgb(240, 240, 240);
  background-image: url("~@/assets/img/user/bg_login.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  header {
    width: 100vw;
    height: 5vh;

    i {
      width: 15px;
      height: 15px;
      margin: 20px;
      display: block;
      background-image: url("~@/assets/img/user/ucrop_ic_cross.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }

  main {
    h2 {
      font-size: 18px;
      color: #fff;
      text-align: center;
    }

    .input {
      width: 80vw;
      height: 15vh;
      margin: 100px auto;
      margin-bottom: 0;
    }

    .btn {
      width: 80vw;
      margin: 10px auto;
    }
  }
}
</style>