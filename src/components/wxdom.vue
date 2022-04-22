<template>
  <div v-if="show" class="wxshow">
    <p class="c-m">{{$t('user.wx')}}</p>
    <p>{{ link }}</p>
    <button
      name="m"
      class="link"
      :data-clipboard-text="link"
      @click="$store.commit('copyFun', { dom: '.link', value: link })"
    >
      {{$t('copy.btn')}}
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    //   this.show = true;
    this.link = window.location.href;
    let broser = window.navigator.userAgent.toLowerCase();
    if (broser.match(/MicroMessenger/i) == "micromessenger") {
      this.show = true;
    }
  },
  data() {
    return {
      show: false,
      link: "",
    };
  },
};
</script>

<style lang="less" scoped>
.wxshow {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 200px 40px;
  p {
    padding-top: 30px;
    img {
      height: 34px;
    }
  }
  button {
    width: auto;
    height: 70px;
    padding: 0 80px;
  }
}
</style>
