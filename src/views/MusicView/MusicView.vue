<template>
  <div class="music-view" :class="[select ? 'select':'']">
    <router-view></router-view>
    <header>
      <div class="title" @click="selectChatData"></div>
      <div class="text">
        {{text}}
        <i @click="readChatData"></i>
      </div>
    </header>

    <main>
      <div class="box1" @click="goToReadingTimeView">
        <h2>阅读时光</h2>
        <p>其实一直陪着你的，是那个了不起的自己。</p>
        <i></i>
      </div>

      <div class="box2">
        <h2>晚安问候</h2>
        <div class="list">
          <ul>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 1}"
                @click="rotatingWanAnClass(1)"
              ></div>
              <p>晚安</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 2}"
                @click="rotatingWanAnClass(2)"
              ></div>
              <p>按时睡觉</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 3}"
                @click="rotatingWanAnClass(3)"
              ></div>
              <p>过得怎样</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 4}"
                @click="rotatingWanAnClass(4)"
              ></div>
              <p>晚上好</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 5}"
                @click="rotatingWanAnClass(5)"
              ></div>
              <p>盖好被子</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 6}"
                @click="rotatingWanAnClass(6)"
              ></div>
              <p>等你睡觉</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 7}"
                @click="rotatingWanAnClass(7)"
              ></div>
              <p>不想你太累</p>
            </li>
            <li @click="goodNight">
              <div
                class="img"
                :class="{rotating: rotatingWanAn == 8}"
                @click="rotatingWanAnClass(8)"
              ></div>
              <p>喜欢你</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="box3">
        <h2>音乐电台</h2>
        <div class="list">
          <ul>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>错位时空</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>陪你看星星</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>PLANET</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>奔赴星空</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>微笑的你</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>别焦虑</p>
            </li>
            <li @click="goToMusicRadioView">
              <div class="img"></div>
              <p>谢谢自己</p>
            </li>
            <li>
              <div class="img"></div>
              <p></p>
            </li>
          </ul>
        </div>
      </div>

      <div class="box4">
        <h2>治愈视频</h2>
        <div class="list">
          <ul>
            <li>
              <div class="img"></div>
              <p>星空</p>
            </li>
            <li>
              <div class="img"></div>
              <p>自然</p>
            </li>
            <li>
              <div class="img"></div>
              <p>美景</p>
            </li>
            <li>
              <div class="img"></div>
              <p>生活</p>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <audio v-if="nightSrc" :src="nightSrc" autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: false,
      chat: false,
      rotatingWanAn: null,
      nightSrc: null,
      num: 0,
      chatData: [
        "你好啊，欢迎来到这里",
        "如果累了，就停下来休息片刻吧",
        "放松点",
        "不用和每个人都要好",
        "也不用被每个人都喜欢",
        "学会沉淀自己",
        "体会孤独",
        "未来不见得更好",
        "但我们会更从容"
      ]
    };
  },
  computed: {
    text() {
      if (this.chat) {
        let chat = this.chatData[this.num];
        return chat;
      }

      return this.select ? "点击刷新，我来陪你聊聊天吧" : "小月亮可以点亮哦";
    }
  },
  methods: {
    rotatingWanAnClass(i) {
      this.rotatingWanAn = i;
    },
    readChatData() {
      this.chat = true;
      this.num++;
      if (this.num > 8) {
        this.num = 0;
      }
    },
    selectChatData() {
      this.select = !this.select;
      this.chat = false;
    },
    goodNight() {
      this.nightSrc =
        "http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wangirl3.mp3";
      setTimeout(() => {
        this.nightSrc = null;
      }, 3000);
    },
    goToMusicRadioView() {
      this.$router.push({
        name: "musicradio"
      });
    },
    goToReadingTimeView() {
      this.$router.push({
        name: "readingtime"
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.music-view {
  width: 100vw;
  height: 140vh;
  background-color: #e0f7fa;

  header {
    width: 100vw;
    height: 25vh;
    text-align: center;
    background-image: url("~@/assets/img/music/music_bg1.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: center;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;

    .title {
      width: 100vw;
      height: 20vh;
      background-image: url("~@/assets/img/music/music_moon1.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50vw;
      position: absolute;
      top: -10px;
    }

    .text {
      margin-bottom: 20px;
      color: #fad25a;
    }
  }

  main {
    .box1 {
      padding: 20px 10px;
      margin: 20px 10px;
      border-radius: 10px;
      background-color: #f8fdff;
      position: relative;

      h2 {
        color: #000;
        font-size: 25px;
        padding: 5px;
        margin: 5px;
        margin-left: 20px;
      }

      p {
        font-size: 14px;
        margin-left: 20px;
        color: rgb(130, 130, 130);
      }

      i {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background-image: url("~@/assets/img/music/music_entry.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        position: absolute;
        top: 40%;
        right: 10px;
      }
    }

    .box2 {
      padding: 20px 10px;
      margin: 20px 10px;
      border-radius: 10px;
      background-color: #f8fdff;
      position: relative;

      h2 {
        color: #000;
        font-size: 25px;
        padding: 5px;
        margin: 5px;
        margin-left: 20px;
      }

      .list {
        margin: 5px;
        margin-left: 10px;

        ul {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          li {
            padding: 5px;
            text-align: center;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

            .img {
              width: 60px;
              height: 60px;
              border-radius: 999px;
              margin-bottom: 5px;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }

            .rotating {
              animation: rotating 1.5s linear 2;
            }

            &:nth-child(1) {
              .img {
                background-image: url("~@/assets/img/music/girl1.jpg");
              }
            }

            &:nth-child(2) {
              .img {
                background-image: url("~@/assets/img/music/girl2.jpg");
              }
            }

            &:nth-child(3) {
              .img {
                background-image: url("~@/assets/img/music/girl3.jpg");
              }
            }

            &:nth-child(4) {
              .img {
                background-image: url("~@/assets/img/music/girl4.jpg");
              }
            }

            &:nth-child(5) {
              .img {
                background-image: url("~@/assets/img/music/boy1.jpg");
              }
            }

            &:nth-child(6) {
              .img {
                background-image: url("~@/assets/img/music/boy2.jpg");
              }
            }

            &:nth-child(7) {
              .img {
                background-image: url("~@/assets/img/music/boy3.jpg");
              }
            }

            &:nth-child(8) {
              .img {
                background-image: url("~@/assets/img/music/boy4.jpg");
              }
            }
          }
        }
      }
    }

    .box3 {
      padding: 20px 10px;
      margin: 20px 10px;
      border-radius: 10px;
      background-color: #f8fdff;
      position: relative;

      h2 {
        color: #000;
        font-size: 25px;
        padding: 5px;
        margin: 5px;
        margin-left: 20px;
      }

      .list {
        margin: 5px;
        margin-left: 10px;

        ul {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          li {
            padding: 5px;
            text-align: center;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

            .img {
              width: 60px;
              height: 60px;
              border-radius: 999px;
              margin-bottom: 5px;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }

            &:nth-child(1) {
              .img {
                background-image: url("~@/assets/img/music/fengjing1.jpg");
              }
            }

            &:nth-child(2) {
              .img {
                background-image: url("~@/assets/img/music/fengjing2.jpg");
              }
            }

            &:nth-child(3) {
              .img {
                background-image: url("~@/assets/img/music/fengjing3.jpg");
              }
            }

            &:nth-child(4) {
              .img {
                background-image: url("~@/assets/img/music/fengjing4.jpg");
              }
            }

            &:nth-child(5) {
              .img {
                background-image: url("~@/assets/img/music/fengjing5.jpg");
              }
            }

            &:nth-child(6) {
              .img {
                background-image: url("~@/assets/img/music/fengjing6.jpg");
              }
            }

            &:nth-child(7) {
              .img {
                background-image: url("~@/assets/img/music/fengjing7.jpg");
              }
            }

            &:nth-child(8) {
              .img {
                // background-image: url("~@/assets/img/music/fengjing1.jpg");
              }
            }
          }
        }
      }
    }

    .box4 {
      padding: 20px 10px;
      margin: 20px 10px;
      border-radius: 10px;
      background-color: #f8fdff;
      position: relative;

      h2 {
        color: #000;
        font-size: 25px;
        padding: 5px;
        margin: 5px;
        margin-left: 20px;
      }

      .list {
        margin: 5px;
        margin-left: 10px;

        ul {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          li {
            padding: 5px;
            text-align: center;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

            .img {
              width: 60px;
              height: 60px;
              border-radius: 999px;
              margin-bottom: 5px;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }

            &:nth-child(1) {
              .img {
                background-image: url("~@/assets/img/music/toneicon1.jpg");
              }
            }

            &:nth-child(2) {
              .img {
                background-image: url("~@/assets/img/music/toneicon2.jpg");
              }
            }

            &:nth-child(3) {
              .img {
                background-image: url("~@/assets/img/music/toneicon3.jpg");
              }
            }

            &:nth-child(4) {
              .img {
                background-image: url("~@/assets/img/music/toneicon4.jpg");
              }
            }
          }
        }
      }
    }
  }
}

.select {
  background-color: #376f88;

  header {
    background-image: url("~@/assets/img/music/music_bg2.png");

    .title {
      background-image: url("~@/assets/img/music/music_moon2.png");
    }

    .text {
      position: relative;

      i {
        width: 40px;
        height: 40px;
        content: "";
        display: block;
        background-image: url("~@/assets/img/music/music_voice3.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        position: absolute;
        top: -10px;
        right: 30px;
        z-index: 999;
      }
    }
  }
}

@keyframes rotating {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>