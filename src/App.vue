<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view :getMusic="getMusic" :audioPlayState="audioPlayState"></router-view>
    <!-- </keep-alive> -->
    <div class="tab-bar">
      <router-link class="tab-bar-item icon-home" tag="div" to="/home">
        <i></i>
        晚安
      </router-link>
      <router-link class="tab-bar-item icon-quotations" tag="div" to="/quotations">
        <i></i>
        语录
      </router-link>
      <router-link class="tab-bar-item icon-music" tag="div" to="/music">
        <i></i>
        音乐
      </router-link>
      <router-link class="tab-bar-item icon-dynamic" tag="div" to="/dynamic">
        <i></i>
        动态
      </router-link>
      <router-link class="tab-bar-item icon-user" tag="div" to="/user">
        <i></i>
        我的
      </router-link>
    </div>

    <audio
      v-if="musicSrc"
      :src="musicSrc"
      ref="audio"
      @play="audioPlayState = true"
      @pause="audioPlayState = false"
      loop
    ></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicSrc: null,
      // 记录当前audio的播放暂停状态
      audioPlayState: false
    };
  },
  methods: {
    getMusic() {
      this.musicSrc = "http://101.200.156.176/lixiang.mp3";

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

<style lang="scss">
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  z-index: 9;
  background-color: rgb(250, 250, 250);

  .tab-bar-item {
    flex: 1;
    padding: 5px;
    color: #a4a39e;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center center;
    i {
      width: 25px;
      height: 25px;
      content: "";
      display: block;
      background-size: contain;
    }
    &.icon-home {
      i {
        background-image: url(./assets/img/tabbar/icon_navi_item0.png);
      }
    }

    &.icon-quotations {
      i {
        background-image: url(./assets/img/tabbar/icon_navi_item1.png);
      }
    }

    &.icon-music {
      i {
        background-image: url(./assets/img/tabbar/icon_navi_item2.png);
      }
    }

    &.icon-dynamic {
      i {
        background-image: url(./assets/img/tabbar/icon_navi_my.png);
      }
    }

    &.icon-user {
      i {
        background-image: url(./assets/img/tabbar/moon.png);
      }
    }

    &.router-link-active {
      color: #ffa200;
      background-color: rgb(231, 231, 231);
    }
  }
}

.wd-modal {
  background: rgba(0, 0, 0, 0.75) !important;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 50px;

  .wd-loading {
    margin: 0 5px 5px 0;
    position: relative;
  }
}

.wd-input {
  margin-bottom: 10px;
}
.wd-input__inner {
  background-color: rgba(255, 255, 255, 0);
}

.wd-input::after {
  height: 5px !important;
  background-color: #fff !important;
}

.wd-button.is-info {
  background-color: #fff !important;
}

.wd-input__suffix {
  .wd-input__icon {
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>

