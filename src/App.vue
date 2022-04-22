<template>
  <div id="app">
    <router-view :class="['app', $route.name]" />
    <wxdom />
  </div>
</template>
<script>
export default {
  watch:{
    $route:{
      handler(n,o){
        if(n.query.Language){
          let lang = {
            'CN':'cn',
            'TW':'tw',
            'US':'en',
            'KR':'kr',
            'JP':'jp',
          }
          this.$i18n.locale = lang[n.query.Language]
          this.$storage.set('locale',lang[n.query.Language])
        }
      }
    }
  }
}
</script>