<template>
  <div class="reading-time-view">
    <router-view></router-view>
    <header>
      <i class="exit" @click="back"></i>
      <h2>美文</h2>
      <i class="collect"></i>
    </header>
    <main>
      <ul>
        <li
          v-for="item in readingTimeData"
          :key="item.id"
          @click="goToReadingTimeItemView(item.title,item.text,item.createTime)"
        >
          <h2>{{item.title}}</h2>
          <i class="above"></i>
          <div class="text" v-show="item.url">{{item.url}}</div>
          <div class="time">{{item.createTime}}</div>
          <i class="below"></i>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: "ReadingTimeView",
  data() {
    return {
      readingTimeData: []
    };
  },
  mounted() {
    this.$axios
      .get(
        `/api/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=1&maxresult=20&type=0`
      )
      .then(({ data }) => {
        this.readingTimeData = data.reportlist;
      });
  },
  methods: {
    back() {
      this.$router.back(); //后退
    },
    goToReadingTimeItemView(title, text, time) {
      this.$router.push({
        name: "readingtimeItem",
        params: {
          title,
          text,
          time
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.reading-time-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 50;
  background-color: rgb(255, 255, 255);

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    .collect {
      width: 25px;
      height: 25px;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }

  main {
    width: 100vw;
    margin-top: 54px;
    background-color: rgb(240, 240, 240);

    ul {
      overflow: hidden;
      li {
        background-color: #fff;
        margin: 20px 0;
        h2 {
          width: 92vw;
          font-size: 20px;
          margin: 5px auto;
          padding: 10px 5px;
        }

        .above,
        .below {
          width: 100vw;
          height: 13px;
          content: "";
          display: block;
          background-image: url("~@/assets/img/notes/icon_stroke.png");
          background-position: center center;
          background-size: contain;
        }

        .text {
          width: 92vw;
          line-height: 28px;
          font-size: 16px;
          margin: 5px auto;
          padding: 5px;
          padding-bottom: 50px;

          img {
            width: 90vw !important;
          }

          p {
            padding: 10px 0;
            font-size: 16px;
            line-height: 20px;
          }

          .ztext-empty-paragraph {
            padding: 0;
          }
        }

        .time {
          width: 92vw;
          margin: 5px auto;
          padding: 5px;
        }
      }
    }
  }
}
</style>