<template>
  <div class="user-view">
    <router-view></router-view>

    <header>
      <div class="head" @click="goToUserLoginView">
        <img v-if="headimage" :src="headimage" />
      </div>
      <span @click="goToUserLoginView">{{username}}</span>
    </header>

    <main>
      <ul>
        <li @click="goToUserAgreementView(userData,'我的动态')">
          <div class="left">
            <i></i>
            我的动态
          </div>
          <i></i>
        </li>

        <li @click="goToUserAgreementView(userData,'我的收藏')">
          <div class="left">
            <i></i>
            我的收藏
          </div>
          <i></i>
        </li>

        <li @click="goToUserAgreementView(userData,'我的留言')">
          <div class="left">
            <i></i>
            我的留言
          </div>
          <i></i>
        </li>
      </ul>

      <ul>
        <li @click="goToUserAgreementView(agreement,'用户协议')">
          <div class="left">
            <i></i>
            用户协议
          </div>
          <i></i>
        </li>
        <li @click="goToUserAgreementView(privacy,'隐私政策')">
          <div class="left">
            <i></i>
            隐私政策
          </div>
          <i></i>
        </li>
        <li @click="goToUserAgreementView(copyright,'版权说明')">
          <div class="left">
            <i></i>
            版权说明
          </div>
          <i></i>
        </li>
      </ul>

      <ul>
        <li>
          <div class="left">
            <i></i>
            设置
          </div>
          <i></i>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "UserView",
  data() {
    return {
      userData: null,
      agreement: null,
      privacy: null,
      copyright: null,
      username: null,
      headimage: null
    };
  },

  mounted() {
    this.username = sessionStorage.getItem("username")
      ? sessionStorage.getItem("username")
      : "请登录~";
    this.headimage = sessionStorage.getItem("headimage")
      ? sessionStorage.getItem("headimage")
      : null;

    this.$axios.get(`/a/zdxy.html`).then(({ data }) => {
      this.agreement = data;
    });

    this.$axios.get(`/a/zdwananzc.html`).then(({ data }) => {
      this.privacy = data;
    });

    this.copyright = `  
    <p>一: 晚安语录APP的数据来自网友投稿或网上收集, 如果APP内容侵犯了您的权利, 请您联系我们, 我们会在1天之内核实并删除。</p>
    <p>二: APP部分内容转载于其他站点, 版权为原作者所有, 如果涉及版权等异议问题, 敬请指出, 我们将配合修正。</p>
    <p>三: 联系方式: QQ2305401919 </p>
    `;

    this.userData = `
      <p style="
      font-size: 20px; color: #000; background-color: rgb(240, 240, 240);
      text-align: center; padding: 10px;
      ">暂时没有哦~~~</p>
    `;

  },

  methods: {
    goToUserAgreementView(data, name) {
      this.$router.push({
        name: "useragreement",
        params: {
          data,
          name
        }
      });
    },

    goToUserLoginView() {
      this.$router.push({
        name: "userlogin"
      });
    }
  },

  // 监听部分
  watch: {
    // 实现跳转回页面数据刷新
    $route: function(newVal) {
      if (newVal.path == "/user") {
        setTimeout(() => {
          console.log(1);

          this.$router.go(0);
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-view {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;

  header {
    width: 100vw;
    height: 30vh;
    background-image: url("~@/assets/img/user/userinfobg.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .head {
      width: 75px;
      height: 75px;
      border-radius: 999px;
      background-image: url("~@/assets/img/user/icon_no_head.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      margin-bottom: 10px;

      img {
        width: 75px;
        height: 75px;
        border-radius: 999px;
        display: block;
      }
    }

    span {
      display: inline-block;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.25);
      padding: 10px 30px;
      border-radius: 3px;
    }
  }

  main {
    width: 100vw;

    ul {
      background-color: #fff;
      margin-top: 10px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #e7e7e7;

        i {
          width: 25px;
          height: 25px;
          margin-left: 10px;
          display: block;
          background-image: url("~@/assets/img/user/icon_arrow.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }

        .left {
          display: flex;
          align-items: center;
          color: rgb(100, 100, 100);
          i {
            width: 25px;
            height: 25px;
            margin: 0 10px;
            display: block;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
          }
        }

        &:nth-child(1) {
          .left {
            i {
              background-image: url("~@/assets/img/user/user_icon_feed.png");
            }
          }
        }

        &:nth-child(2) {
          .left {
            i {
              background-image: url("~@/assets/img/user/user_icon_collect.png");
            }
          }
        }

        &:nth-child(3) {
          .left {
            i {
              background-image: url("~@/assets/img/user/user_icon_message.png");
            }
          }
        }
      }

      &:nth-child(2) {
        li {
          &:nth-child(1) {
            .left {
              i {
                background-image: url("~@/assets/img/user/user_icon_feedback.png");
              }
            }
          }

          &:nth-child(2) {
            .left {
              i {
                background-image: url("~@/assets/img/user/user_icon_message.png");
              }
            }
          }

          &:nth-child(3) {
            .left {
              i {
                background-image: url("~@/assets/img/user/user_icon_contact.png");
              }
            }
          }

          &:nth-child(1) {
            .left {
              i {
                background-image: url("~@/assets/img/user/user_icon_feedback.png");
              }
            }
          }
        }
      }

      &:nth-child(3) {
        li {
          .left {
            i {
              background-image: url("~@/assets/img/user/user_icon_setting.png");
            }
          }
        }
      }
    }
  }
}
</style>