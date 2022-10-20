<template>
  <div class="notes-view">
    <header>
      <i class="exit" @click="back"></i>
      <h2>美文</h2>
      <i class="collect" :class="[selected ? 'selected' : '']" @click="selected = !selected"></i>
    </header>
    <main>
      <h2>{{title}}</h2>
      <i class="above"></i>
      <div class="text" v-html="text"></div>
      <div class="time">{{time}}</div>
      <i class="below"></i>
    </main>
  </div>
</template>

<script>
export default {
  name: "NotesComponentView",
  data() {
    return {
      selected: false
    };
  },
  props: ["title", "text", "time"],
  methods: {
    back() {
      this.$router.back(); //后退
    }
  }
};
</script>

<style lang="scss" >
.notes-view {
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
      background-image: url("~@/assets/img/notes/icon_collect_white.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }

    .selected {
      background-image: url("~@/assets/img/notes/icon_collect_white_on.png");
    }
  }

  main {
    width: 100vw;
    margin-top: 54px;

    h2 {
      width: 92vw;
      font-size: 20px;
      margin: 5px auto;
      padding: 5px;
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
      font-size: 25px;
      margin: 5px auto;
      padding: 5px;

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
</style>