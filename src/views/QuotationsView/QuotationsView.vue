<template>
  <div class="quotations-view">
    <header>
      <h2>语录</h2>
    </header>

    <wd-popup v-model="show" :style="{'backgroundColor': '#000'}">
      <img :src="src" :style="{ 'width': '100vw'}" />
    </wd-popup>

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
        </div>
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <div class="loading">
          <wd-loading color="#000000"></wd-loading>
        </div>
      </template>

      <main>
        <ul>
          <li v-for="(item,i) in quotationsDataArr" :key="i">
            <div class="img" @click="playShow(item.headimage)">
              <img :src="item.headimage" alt="img" />
            </div>
            <p v-html="item.text"></p>
            <div class="footer">
              <span>{{item.createTime}}</span>
              <div>
                <i
                  class="download"
                  @click.stop="downImgFile(item.headimage,item.createTime+'.png')"
                ></i>
                <i
                  class="link copy-btn"
                  v-clipboard:copy="item.title"
                  v-clipboard:success="firstCopySuccess"
                  v-clipboard:error="firstCopyError"
                ></i>
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
export default {
  name: "QuotationsView",
  data() {
    return {
      src: null,
      show: false,
      isLoading: false,
      loading: false,
      time: 2,
      quotationsDataArr: []
    };
  },
  mounted() {
    this.$axios
      .get(
        "api/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=1&maxresult=20&type=1"
      )
      .then(({ data }) => {
        this.quotationsDataArr = data.reportlist;
      });
  },
  methods: {
    playShow(src) {
      this.show = !this.show;
      this.src = src;
    },

    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },

    loadmore() {
      this.loading = true;

      if (this.time) {
        setTimeout(() => {
          this.$axios
            .get(
              "api/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=2&maxresult=20&type=1"
            )
            .then(({ data }) => {
              this.quotationsDataArr.push(...data.reportlist);
            });
          this.loading = false;
          // 模拟请求，请求3次，3次结束后设置加载结束
          this.time--;
        }, 1000);
      } else {
        this.$refs.loadmore.loadEnd();
      }
    },

    /*下载图片所调用方法*/
    // content是图片的URL地址，
    // filename 是图片的名称（或者是你下载时候给定的名称）
    downImgFile(content, filename) {
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      let blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },

    firstCopySuccess() {
      // console.log("copy arguments e:", e);
      alert("复制成功!");
    },
    firstCopyError() {
      // console.log("copy arguments e:", e);
      alert("复制失败!");
    }
  }
};
</script>

<style lang="scss" scoped>
.quotations-view {
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 240, 240);

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    text-align: center;

    h2 {
      font-size: 25px;
      color: #ffb300;
      padding: 10px;
      background-color: #fff;
    }
  }

  main {
    ul {
      li {
        width: 100vw;
        background-color: #fff;
        margin: 10px 0;
        padding: 10px;
        line-height: 25px;
        text-align: left;

        img {
          width: 96vw;
          height: 210px;
          overflow: hidden;
        }

        p {
          padding: 10px 0;
          font-size: 16px;
          line-height: 20px;
        }

        .footer {
          border-top: 1px solid rgb(230, 230, 230);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: rgb(164, 164, 164);

          div {
            padding: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .download {
              width: 25px;
              height: 25px;
              margin-left: 10px;
              display: block;
              background-image: url("~@/assets/img/quotations/icon_download.png");
              background-repeat: no-repeat;
              background-position: center center;
              background-size: contain;
            }

            .link {
              width: 20px;
              height: 20px;
              margin-left: 10px;
              display: block;
              background-image: url("~@/assets/img/quotations/icon_copy_text.png");
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
</style>