<template>
  <div class="dynamic-view">
    <wd-popup v-model="show" position="bottom">
      <AddComments :playShow="playShow" :feedid="feedid" :followuserid="followuserid" />
    </wd-popup>

    <router-view :switchPraise="switchPraise" :playShow="playShow"></router-view>

    <header>
      <div class="title">
        <h2>动态</h2>
        <i @click="goToDynamicMonologueView"></i>
      </div>
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
          <li
            v-for="(item,index) in dynamicDataArr"
            :key="index"
            @click="goToDynamicDetailsView(item.id)"
          >
            <div class="box">
              <div class="head">
                <div class="headimage">
                  <img v-if="item.headimage" :src="`http://pic.msckeji.com//${item.headimage}`" />
                </div>
                <div class="text">
                  <h2>{{item.username}}</h2>
                  <p>{{item.timeline}}</p>
                </div>
              </div>
              <div class="main">
                <div v-if="item.picurl">
                  <img :src="`http://pic.msckeji.com//${item.picurl}`" />
                </div>
                <p>{{item.content}}</p>
              </div>
              <div class="foot">
                <span @click.stop="switchPraise(item.id)">
                  <i class="pmax" :class="[item.isPraise==1 ? 'select':'']"></i>
                  {{item.pmax}}
                </span>

                <span @click="playShow(item.id, item.userid)">
                  <i class="commentcount"></i>
                  评论{{item.commentcount}}
                </span>
              </div>
            </div>
          </li>
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
import AddComments from "@/components/AddComments.vue";
export default {
  name: "DynamicView",
  data() {
    return {
      show: false,
      feedid: null,
      followuserid: null,
      selectShow: false,
      dynamicDataArr: [],

      currentpage: 1,
      isLoading: false,
      loading: false,
      time: 3
    };
  },
  components: { AddComments },
  mounted() {
    this.axiosDynamicData(1);
  },
  methods: {
    axiosNewDynamicData() {
      this.$axios
        .get(
          "/api/shengcai/api/mobile/common/showFeedInfosByMeetid?userid=190132&meetid=1339&lang=0&moduletype=1&currentpage=1&maxresult=20"
        )
        .then(({ data }) => {
          this.dynamicDataArr = data.feedInfoList;
        });
    },

    axiosDynamicData(currentpage) {
      this.$axios
        .get(
          `/api/shengcai/api/mobile/common/showFeedInfosByMeetid?userid=190132&meetid=1339&lang=0&moduletype=1&currentpage=${currentpage}&maxresult=20`
        )
        .then(({ data }) => {
          this.dynamicDataArr.push(...data.feedInfoList);
        });
    },

    switchPraise(feedid) {
      this.$axios.get(
        `/api/shengcai/api/mobile/ucenter/praiseFeed?feedid=${feedid}&userid=190132`
      );

      setTimeout(() => {
        this.axiosDynamicData();
      }, 1500);
    },

    goToDynamicDetailsView(id) {
      this.$router.push({
        name: "dynamicdetails",
        params: {
          id
        }
      });
    },

    goToDynamicMonologueView() {
      this.$router.push({
        name: "dynamicmonologue"
      });
    },

    playShow(feedid, followuserid) {
      this.show = !this.show;
      this.feedid = feedid;
      this.followuserid = followuserid;
    },

    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.axiosNewDynamicData();
      }, 1000);
    },

    loadmore() {
      this.loading = true;

      if (this.time) {
        setTimeout(() => {
          this.currentpage++;

          this.axiosDynamicData(this.currentpage);

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
      if (newVal.path == "/dynamic") {
        this.axiosDynamicData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-view {
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 240, 240);

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    z-index: 99;
    background-color: #fff;

    .title {
      width: 60vw;
      float: right;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 25px;
        color: #ffb300;
        padding: 10px;
      }

      i {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        background-image: url("~@/assets/img/dynamic/icon_write.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }
  }

  main {
    padding-bottom: 55px;
    ul {
      li {
        width: 100vw;
        background-color: rgb(251, 251, 251);
        margin: 10px 0;
        padding: 10px 0 0 0;
        line-height: 25px;
        text-align: left;

        .box {
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
        }
      }
    }
  }
}
</style>