<template>
  <div class="home-view">
    <header>
      <div class="title">
        <div class="box">
          <p>
            相遇未
            <span>晚</span>
            ，随遇而
            <span>安</span>
          </p>
          <span>日期：{{today}}</span>
        </div>
      </div>
    </header>
    <main>
      <div class="top1">
        <h2>TOP 1</h2>
        <div class="select">
          <h2>精选语录</h2>
          <div class="text">{{select}}</div>
        </div>
      </div>
      <div class="top2">
        <h2>TOP 2</h2>
        <div class="list">
          <div class="list1">
            <i></i>
            晚安
          </div>
          <div class="list2">
            <i></i>
            音乐
          </div>
          <div class="list3">
            <i></i>
            美文
          </div>
          <div class="list4">
            <i></i>
            信箱
          </div>
        </div>
      </div>
    </main>
    <footer>
      <i></i>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      today: null,
      quotationsLiat: [],
      num: null,
      select: null
    };
  },
  mounted() {
    this.num = Math.floor(Math.random() * 17) + 3;

    let date = new Date();
    this.today =
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

    this.$axios
      .get(
        "api/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=1&maxresult=20&type=1"
      )
      .then(({ data }) => {
        this.quotationsLiat = data.reportlist;
        console.log(this.quotationsLiat);
        this.select = this.quotationsLiat[this.num].text;
      });
  },
  methods: {},
  computed: {
    // select() {
    //   // let selectData = this.quotationsLiat[num].title
    //   //   console.log(this.quotationsLiat[this.num]);
    //   return this.quotationsLiat[this.num];
    // }
  }
};
</script>

<style lang="scss" scoped>
.home-view {
  width: 100vw;
  height: 100vh;
  background-color: #def8f9;

  header {
    width: 100vw;
    height: 50vh;
    background-image: url("~@/assets/img/home/wanbg.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;

    .title {
      width: 80vw;
      height: 50vh;
      margin: 0 auto;
      display: block;
      background-image: url("~@/assets/img/home/wancircle.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;

      .box {
        width: 80vw;
        height: 50vh;
        line-height: 50px;
        color: #f2fbfb;
        font-size: 18px;
        margin: 0 auto;
        padding: 60% 0;
        text-align: center;

        p {
          margin: 0px auto;

          span {
            color: #ffbf00;
            font-size: 20px;
            font-weight: bolder;
          }
        }
      }
    }
  }

  main {
    margin-top: 15px;
    .top1 {
      width: 90vw;
      margin: 0 auto;
      h2 {
        font-size: 20px;
        color: #fad25a;
      }

      .select {
        margin-top: 15px;
        border-radius: 10px;
        background-color: #edfbff;
        padding: 3px;

        h2 {
          color: #000;
          padding: 10px 5px 5px;
          font-weight: 550;
        }
        .text {
          height: 10vh;
          padding: 20px;
          border-radius: 5px;
          background-color: #b4eaf4;
          position: relative;

          &::after {
            width: 50px;
            height: 50px;
            content: "";
            display: block;
            position: absolute;
            bottom: 0px;
            right: 15px;
            background-image: url("~@/assets/img/home/moon2.png");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
          }
        }
      }
    }

    .top2 {
      width: 90vw;
      margin: 0 auto;
      margin-top: 20px;

      h2 {
        font-size: 20px;
        color: #fad25a;
      }

      .list {
        color: #818685;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .list1,
        .list2,
        .list3,
        .list4 {
          text-align: center;
          i {
            width: 50px;
            height: 50px;
            margin-bottom: 5px;
            display: block;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
          }
        }
        .list1 {
          i {
            background-image: url("~@/assets/img/home/wanitem1.png");
          }
        }
        .list2 {
          i {
            background-image: url("~@/assets/img/home/wanitem2.png");
          }
        }
        .list3 {
          i {
            background-image: url("~@/assets/img/home/wanitem3.png");
          }
        }
        .list4 {
          i {
            background-image: url("~@/assets/img/home/wanitem4.png");
          }
        }
      }
    }
  }

  footer {
    width: 100vw;
    height: 10vh;

    i {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      margin-bottom: 5px;
      display: block;
      background-image: url("~@/assets/img/home/wanline.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }
}
</style>