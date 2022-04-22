<template>
  <main>
    <div class="boxs tc">
      <p>
        <img class="logo" src="@/img/public/logo.png" alt /><br>
        <img src="@/img/public/name.png" alt="">
        <!-- <span class="c-m">THOR BOT</span> -->
      </p>
      <button v-if="!version.ios.apk_url" class="round" name="m" @click="submitFun(version.ios)">iOS{{$t('download.btn')}}</button>
      <a v-else :href="version.ios.apk_url"><button class="round" name="m">iOS{{$t('download.btn')}}</button></a>
      <br>
      <button v-if="!version.android.apk_url" class="round" name="m" @click="submitFun(version.android)">Android{{$t('download.btn')}}</button>
      <a v-else :href="version.android.apk_url"><button class="round" name="m">Android{{$t('download.btn')}}</button></a>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    this.getVersion();
  },
  data() {
    return {
      version: {
        android:{},
        ios:{},
      },
    };
  },
  methods: {
    getVersion() {
      this.$axios.get('/api/home/appNewVersion').then(res => {
        this.version.android = res.data.find(option=>option.app_id==1);
        this.version.ios = res.data.find(option=>option.app_id==2);
      })
    },
    submitFun(item) {
      if (!item.apk_url) return this.$toast.failed(this.$t('download.tip'));
      try {
        plus.runtime.openURL(encodeURI(item.apk_url));
      } catch (e) {
        window.open(item.apk_url);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/base.less";
main {
  background: url('../../img/banner/user.png'),linear-gradient(180deg, #292929 0%, #02030D 100%);
  background-size: 100% auto, 100% 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  .boxs {
    padding: 200px 40px 350px;
    position: relative;
    z-index: 1;
    >p{
      margin-bottom: 120px;
    }
    img.logo {
      height: 196px;
      margin-bottom: 22px;
    }
    img{
      height: 22px;
    }
    button {
      width: 400px;
      margin: 30px 0;
    }
  }
}
</style>
