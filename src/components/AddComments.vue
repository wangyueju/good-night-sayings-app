<template>
  <div class="comments">
    <header>
      <h3 @click="back">取消</h3>
      <h3>回帖</h3>
      <h3 @click="send">发送</h3>
    </header>

    <main>
      <textarea placeholder="请输入评论内容" v-model="sendData"></textarea>
    </main>
  </div>
</template>

<script>
export default {
  name: "AddComments",
  data() {
    return {
      sendData: ""
    };
  },
  props: ["playShow", "feedid","followuserid"],
  mounted() {
    
  },
  computed: {},

  methods: {
    back() {
      this.playShow();
    },

    send() {
      if (this.sendData == "") return alert("不能为空哦~");
      this.$axios.post(
        `/api/shengcai/api/mobile/ucenter/feedinfoComment?userid=190132&meetid=1339&feedid=${this.feedid}&content=${this.sendData}&followuserid=${this.followuserid}&lang=0`
      );

      this.sendData = "";

      this.playShow();

      this.$router.go(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.comments {
  width: 100vw;

  header {
    width: 100vw;
    height: 35px;
    line-height: 35px;
    background-color: rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;
    align-content: center;

    h3 {
      font-size: 16px;
      color: rgb(148, 148, 148);
      margin: 0 10px;

      &:nth-child(2) {
        font-size: 18px;
        color: #000;
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