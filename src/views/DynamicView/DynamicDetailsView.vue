<template>
  <div class="dynamic-deails-view">
    <header>
      <div class="title">
        <i @click="back"></i>
        <h2>详情</h2>
      </div>
    </header>

    <main>
      <div class="box">
        <div class="head">
          <div class="headimage">
            <img v-if="headimage" :src="`http://pic.msckeji.com//${headimage}`" />
          </div>
          <div class="text">
            <h2>{{username}}</h2>
            <p>{{timeline}}</p>
          </div>
        </div>
        <div class="main">
          <div v-if="picture">
            <img :src="`http://pic.msckeji.com//${picture}`" />
          </div>
          <p>{{content}}</p>
        </div>
        <div class="foot">
          <span @click="detailsSwitchPraise(id)">
            <i class="pmax" :class="[isPraise==1 ? 'select':'']"></i>
            {{praise}}
          </span>
          <span @click="deailsPlayShow(id, userid)">
            <i class="commentcount"></i>
            评论{{commentcount}}
          </span>
        </div>

        <i class="below"></i>
      </div>

      <div class="comment-list">
        <ul>
          <li v-for="item in commentListData" :key="item.id">
            <div class="head">
              <div class="headimage">
                <img v-if="item.headimage" :src="`http://pic.msckeji.com//${item.headimage}`" />
              </div>
              <div class="text">
                <h2>{{item.username}}</h2>
              </div>
            </div>
            <div class="main">
              <p>{{item.content}}</p>
            </div>
            <div class="foot">
              <span>{{item.timeline}}</span>
              <span @click="deailsPlayShow(id, userid)">
                <i class="commentcount"></i>
                回复
              </span>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
// import AddComments from "@/components/AddComments.vue";
export default {
  name: "DynamicDetailsView",
  data() {
    return {
      id: null,
      userid: null,
      headimage: null,
      username: null,
      timeline: null,
      picture: null,
      content: null,
      isPraise: null,
      praise: null,
      commentcount: null,
      commentListData: []
    };
  },
  // components: { AddComments },
  props: ["switchPraise", "playShow"],
  mounted() {
    this.id = this.$route.params.id
      ? this.$route.params.id
      : sessionStorage.getItem("id");

    sessionStorage.setItem("id", this.id);

    this.axioaDynamicDetailsData();
  },
  methods: {
    axioaDynamicDetailsData() {
      this.$axios
        .get(
          `/api/shengcai/api/mobile/showFeedInfoByid?id=${this.id}&userid=190132`
        )
        .then(({ data }) => {
          this.isPraise = data.isPraise;
          this.praise = data.praiseSize;
          this.picture = data.feedinfo.picture;
          this.content = data.feedinfo.content;
          this.userid = data.feedinfo.userid;
          this.username = data.feedinfo.username;
          this.timeline = data.feedinfo.timeline;
          this.headimage = data.feedinfo.headimage;
          this.commentcount = data.feedinfo.commentcount;
          this.commentListData = data.postfeeds;
        });
    },

    back() {
      this.$router.back(); //后退
    },

    detailsSwitchPraise(id) {
      this.switchPraise(id);
      this.axioaDynamicDetailsData();
    },

    deailsPlayShow(id, userid) {
      this.playShow(id, userid);
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-deails-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 100;
  background-color: rgb(240, 240, 240);

  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100vw;
    height: 44px;
    background-color: #fff;

    .title {
      width: 60vw;
      float: left;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 25px;
        color: #ffb300;
        padding: 10px;
      }

      i {
        width: 20px;
        height: 20px;
        margin: 10px;
        background-image: url("~@/assets/img/dynamic/icon_back.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }
  }

  main {
    margin-top: 44px;
    background-color: #fff;
    .box,
    .comment-list {
      width: 100vw;
      .head {
        margin: 10px 10px;
        display: flex;

        .headimage {
          width: 50px;
          height: 50px;
          border-radius: 999px;
          overflow: hidden;

          img {
            width: 50px;
            height: 50px;
          }
        }

        .text {
          h2 {
            font-size: 20px;
            margin: 10px 0;
          }

          p {
            font-size: 14px;
            color: rgb(132, 132, 132);
          }
        }
      }

      .main {
        margin: 10px 10px;

        div {
          width: 96vw;
          height: 200px;
          overflow: hidden;
          position: relative;

          img {
            width: 96vw;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        p {
          line-height: 30px;
          margin: 10px 0;
        }
      }

      .foot {
        width: 100vw;
        border-top: 1px solid rgb(218, 218, 218);
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          margin: 10px 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .pmax {
            width: 15px;
            height: 15px;
            margin-right: 10px;
            display: block;
            background-image: url("~@/assets/img/dynamic/icon_zan_small.png");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            position: relative;

            &::before {
              width: 30px;
              height: 30px;
              content: "";
              display: block;
              position: absolute;
              top: -10px;
              left: 120px;
              border-left: 1px solid rgb(218, 218, 218);
            }
          }

          .select {
            background-image: url("~@/assets/img/dynamic/icon_zan_small_select.png");
          }

          .commentcount {
            width: 15px;
            height: 15px;
            margin-right: 10px;
            display: block;
            background-image: url("~@/assets/img/dynamic/icon_comment.png");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
          }
        }
      }

      .below {
        width: 100vw;
        height: 13px;
        content: "";
        display: block;
        margin-top: 10px;
        background-image: url("~@/assets/img/notes/icon_stroke.png");
        background-position: center center;
        background-size: contain;
      }
    }

    .comment-list {
      margin-top: 40px;
      border-top: 1px solid #ccc;
      .head {
        align-items: center;
        h2 {
          font-size: 14px !important;
        }
      }
      .main {
        margin-left: 50px;

        p {
          width: 330px;
          font-size: 18px;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
      .foot {
        border: 0;
        span {
          margin: 10px;
          margin-left: 50px;
          font-size: 14px;
          color: rgb(131, 131, 131);
        }
      }
    }
  }
}
</style>