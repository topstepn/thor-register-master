<template>
  <header>
    <img
      v-if="back == 1"
      class="back top-left"
      @click="$router.go(-1)"
      src="@/img/public/back.png"
    />
    <img
      v-else-if="back == 2"
      class="back top-left"
      @click="$router.go(-1)"
      src="@/img/public/back-w.png"
    />
    <p v-if="title" class="tc">{{ title }}</p>
    <router-link
      v-if="right.title"
      class="top-right c-h"
      tag="span"
      :to="right.path"
      >{{ right.title }}</router-link
    >
  </header>
</template>

<script>
export default {
  props: {
    back: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    right: {
      type: Object,
      default() {
        return {
          title: "",
          path: "",
          type: "",
        };
      },
    },
  },
  methods: {
    rightFun(type) {
      this.$emit("callBack", { type, value: null });
    },
  },
};
</script>
