<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
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
</style>

