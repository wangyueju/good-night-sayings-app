<template>
  <div class="creation-view">
    <header>
      <i class="exit" @click="back"></i>
      <h2>创作</h2>
      <h2 class="submit" @click="axiosSubData">提交</h2>
    </header>

    <main>
      <textarea placeholder="写下你喜欢的温柔句子吧..." v-model.trim="subData"></textarea>
    </main>
  </div>
</template>

<script>
export default {
  name: "CreationView",
  data() {
    return {
      subData: ""
    };
  },
  props: ["axiosNewMailData"],
  methods: {
    back() {
      this.$router.back(); //后退
    },
    axiosSubData() {
      if (this.subData == "") return alert("不能为空哦~");
      this.$axios.post(
        `/api/shengcai/api/mobile/common/addMediaReport?meetid=1332&type=0&title=标题&content=<h4>${this.subData}</h4>`
      );

      this.subData = "";

      this.axiosNewMailData();

      this.$router.push({
        path: "/mail"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.creation-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 99;
  background-color: rgb(240, 240, 240);

  header {
    width: 100vw;
    height: 44px;
    margin-top: 5px;
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

    .submit {
      font-size: 18px;
      margin-right: 20px;
    }
  }

  main {
    textarea {
      width: 99vw;
      height: 90vh;
      border: 0;
      outline: none;
      font-size: 25px;
      padding: 20px 0;
      font-weight: bolder;
    }
  }
}
</style>