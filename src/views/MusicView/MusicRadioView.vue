<template>
  <div class="music-radio-view">
    <header>
      <i @click="back"></i>
    </header>

    <main>
      <div class="title">
        <h3>错位时空</h3>
        <div class="span">
          <span>音乐</span>
          <span>放松</span>
          <span>自然</span>
          <span>灵感</span>
        </div>
      </div>

      <div class="center">
        <p>我吹过你吹过的晚风</p>
        <p>那我们算不算相拥</p>
        <p>可如梦初醒般的两手空空心也空</p>

        <i @click="playOrPause"  :class="[audioPlayState ? 'active':'']"></i>
      </div>
    </main>

    <audio
      v-if="musicSrc"
      :src="musicSrc"
      ref="audio"
      @play="audioPlayState = true"
      @pause="audioPlayState = false"
      loop
      autoplay
    ></audio>
  </div>
</template>

<script>
export default {
  name: "MusicRadio",
  data() {
    return {
      musicSrc: null,
      audioPlayState: false
    };
  },
  mounted(){
      this.musicSrc = "http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wantai2.mp3";
  },
  methods: {
    back() {
      this.$router.back(); //后退
    },
    playOrPause() {

      this.$nextTick(() => {
        // 已经是播放状态 那就暂停
        if (this.audioPlayState) {
          this.$refs.audio.pause();
        } else {
          // 已经是暂停状态 那就播放
          this.$refs.audio.play();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.music-radio-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 100;
  background-color: rgb(240, 240, 240);
  background-image: url("~@/assets/img/music/home5_bg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  header {
    width: 100vw;
    height: 55vh;

    i {
      width: 40px;
      height: 40px;
      margin: 20px;
      display: block;
      background-image: url("~@/assets/img/music/back.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }

  main {
    color: #fff;

    .title {
      padding: 0px 20px 20px 20px;

      h3 {
        font-size: 25px;
        font-weight: 600;
        padding: 10px 0;
      }

      .span {
        span {
          display: inline-block;
          padding: 5px;
          margin: 0 5px;
          border-radius: 3px;
          background-color: rgba(0, 0, 0, 0.45);

          &:nth-of-type(1) {
            padding-left: 0;
            background-color: rgba(255, 153, 0, 0.642);
          }
        }
      }
    }

    .center {
      width: 100vw;
      height: 32vh;
      background-color: rgba(255, 255, 255, 0.4);

      p {
        font-size: 20px;
        padding: 30px 30px 0 30px;
      }

      i {
        width: 40px;
        height: 40px;
        margin: 20px;
        margin-left: 320px;
        display: block;
        background-image: url("~@/assets/img/music/mediastop.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }

      .active {
        background-image: url("~@/assets/img/music/mediaplay.png");
      }
    }
  }
}
</style>