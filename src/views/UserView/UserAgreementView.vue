<template>
  <div class="user-agreement-view">
    <header>
      <div class="title">
        <i @click="back"></i>
        <h3>
          {{name}}
        </h3>
      </div>
    </header>

    <main>
      <p v-html="data"></p>
    </main>
  </div>
</template>

<script>
export default {
  name: "UserAgreementView",
  data() {
    return {
      data: null,
      name: null
    };
  },
  mounted() {
    this.data = this.$route.params.data;
    this.name = this.$route.params.name;
  },
  methods: {
    back() {
      this.$router.back(); //后退
    }
  }
};
</script>

<style lang="scss" scoped>
.user-agreement-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 999;
  background-color: rgb(240, 240, 240);

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    z-index: 100;
    background-color: rgb(240, 240, 240);

    .title {
      width: 60vw;
      float: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
        font-size: 18px;
        font-weight: 700;
        color: #ffbf00;
        margin: 0 10px;
      }
    }
  }

  main {
    margin-top: 45px;
    background-color: #fff;

    p {
      line-height: 30px;
    }
  }
}
</style>