<template>
  <div class="dynamic-monologue-view">
    <header>
      <i @click="back"></i>
      <h3>写独白</h3>
      <h3 @click="send">发布</h3>
    </header>

    <main>
      <textarea placeholder="有什么新鲜事想告诉大家呢？" v-model="sendData"></textarea>
    </main>
  </div>
</template>

<script>
export default {
  name: "DynamicMonologueView",
  data() {
    return {
      sendData: ""
    };
  },
  methods: {
    back() {
      this.$router.back(); //后退
    },

    send() {
      if (this.sendData == "") return alert("不能为空哦~");
      this.$axios.post(
        `/api/shengcai/api/mobile/common/feedPicInfo?userid=190132&meetid=1339&content=${this.sendData}&moduletype=1`
      );

      this.sendData = "";

      this.back()

    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-monologue-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 111;
  background-color: rgb(240, 240, 240);

  header {
    width: 100vw;
    height: 35px;
    line-height: 35px;
    background-color: rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;
    align-content: center;

    i {
      width: 20px;
      height: 20px;
      margin: 10px;
      background-image: url("~@/assets/img/dynamic/icon_back.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #ffbf00;
      margin: 0 10px;

      &:nth-child(2) {
        font-size: 18px;
      }
    }
  }
  main {
    textarea {
      width: 99vw;
      height: 30vh;
      border: 0;
      outline: none;
      font-size: 20px;
      background-color: #fff;
    }
  }
}
</style>