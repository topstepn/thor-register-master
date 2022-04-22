<template>
  <div :class="['send c-m', state ? 'light' : 'hui']" @click="sendFun">
    {{ state ? (resend?$t('user.resend'):$t('user.send')) : time + "S" }}
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "username",
    },
    value: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "86",
    },
  },
  data() {
    return {
      time: 60,
      timer: null,
      state: true,
      resend: false,
    };
  },
  methods: {
    clearFun() {
      clearInterval(this.timer);
      this.timer = null;
      this.time = 60;
      this.state = true;
    },
    sendFun() {
      if (!this.state) return false;
      if (!this.value) return this.$toast.info(this.mode=='email'?this.$t('user.p_email'):this.mode=='mobile'?this.$t('user.p_mobile'):this.$t('user.p_username'));
      let url = "";
      let params = {};
      if (
        (this.mode == "username" && this.value.indexOf("@") != -1) ||
        this.mode == "email"
      ) {
        url = "/api/common/email";
        params = {
          email: this.value,
        };
      } else {
        url = "/api/common/sms";
        params = {
          area: this.area,
          mobile: this.value,
        };
      }
      this.clearFun();
      this.state = false;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.clearFun();
          this.resend = true
        }
      }, 1000);
      this.$axios
        .get(url, {params})
        .then((res) => {
          this.$toast.succeed("Success");
        })
        .catch((err) => {
          this.clearFun();
          this.resend = true
        });
    },
  },
};
</script>

<style lang="less" scoped>
div.send {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border-left: 2px solid;
  padding-left: 30px;
  &.hui {
    opacity: 0.6;
  }
}
</style>
