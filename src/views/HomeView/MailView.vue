<template>
  <div class="mail-view">
    <keep-alive>
      <router-view :axiosNewMailData="axiosNewMailData"></router-view>
    </keep-alive>
    <header>
      <i class="exit" @click="back"></i>
      <h2>信箱</h2>
      <h2 class="creation" @click="goToCreationView">创作</h2>
    </header>

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      head-height="50"
      pulling-text=" "
      loosing-text=" "
      loading-text=" "
    >
      <template #pulling>
        <div class="loading">
          <wd-loading color="#000000"></wd-loading>
        </div>
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <div class="loading">
          <wd-loading color="#000000"></wd-loading>
          <span>正在加载....</span>
        </div>
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <div class="loading">
          <span>加载成功！</span>
        </div>
      </template>

      <main>
        <ul>
          <li v-for="(item,i) in mailDataArr" :key="i" v-html="item.text"></li>
        </ul>

        <wd-infinite-load
          ref="loadmore"
          @loadmore="loadmore"
          :loading="loading"
          :immediate-check="loading"
        ></wd-infinite-load>
      </main>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "MailView",
  data() {
    return {
      //当前页
      currentpage: 1,
      isLoading: false,
      loading: false,
      time: 3,
      // mainShow: true,
      mailDataArr: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.axiosMailData(1);
    });
  },
  methods: {
    axiosNewMailData() {
      this.$axios
        .get(
          `/api/shengcai/api/mobile/common/findHomeReportList?meetid=1332&currentpage=1&maxresult=20&type=0`
        )
        .then(({ data }) => {
          this.mailDataArr = data.reportlist;
        });
    },

    axiosMailData(currentpage) {
      this.$axios
        .get(
          `/api/shengcai/api/mobile/common/findHomeReportList?meetid=1332&currentpage=${currentpage}&maxresult=20&type=0`
        )
        .then(({ data }) => {
          this.mailDataArr.push(...data.reportlist);
        });
    },

    back() {
      this.$router.back(); //后退
    },

    goToCreationView() {
      this.$router.push({
        name: "creation"
      });
    },

    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.axiosNewMailData();
      }, 1000);
    },

    loadmore() {
      this.loading = true;

      if (this.time) {
        setTimeout(() => {
          this.currentpage++;

          this.axiosMailData(this.currentpage);

          this.loading = false;
          // 模拟请求，请求3次，3次结束后设置加载结束
          this.time--;
        }, 1000);
      } else {
        this.$refs.loadmore.loadEnd();
      }
    }
  },
  // 监听部分
  watch: {
    // 实现跳转回页面数据刷新
    $route: function(newVal) {
      if (newVal.path == "/mail") {
        this.axiosNewMailData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 50;
  background-color: rgb(255, 255, 255);

  // .van-pull-refresh {
  //   background-color: rgb(240, 240, 240);
  // }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    .exit {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      background-image: url("~@/assets/img/notes/icon_back.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }

    h2 {
      font-size: 25px;
      color: #ffcc00;
    }

    .creation {
      font-size: 18px;
      margin-right: 20px;
    }
  }

// .loading {
//   position: absolute;
//   top: 44px;
// }

  main {
    // padding-top: 44px;
    width: 100vw;
    float: left;
    background-color: rgb(240, 240, 240);

    ul {
      li {
        width: 100vw;
        background-color: #fff;
        margin: 20px 0;
        padding: 10px;
        line-height: 25px;

        // &:first-child {
        // margin: 0;
        // }
      }
    }
  }
}
</style>