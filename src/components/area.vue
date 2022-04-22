<template>
  <div class="area dark">
    <top :back="2" :title="$t('user.country')" />
    <main class="top">
      <div class="searchboxs">
        <md-input-item
          class="noborder"
          v-model="searchStr"
          :placeholder="$t('user.p_country')"
        >
          <md-icon slot="left" name="search"></md-icon>
        </md-input-item>
      </div>
      <div class="listbox plr4">
        <md-cell-item
          @click="checkFun(item)"
          v-for="(item, i) in showlist"
          :title="item.Name"
          :addon="item.AreaCode"
          :key="i"
        ></md-cell-item>
          <!-- :title="item.ChineseName+' '+item.EnglishName" -->
      </div>
    </main>
  </div>
</template>

<script>
import country_map from '@/json/country_map.js'
export default {
  data() {
    return {
      searchStr: "",
    };
  },
  computed: {
    country(){
      var list=[]
      for(let i=0;i<country_map.areaCode.length;i++){
        list.push({
          Name: country_map.countrys[this.$storage.get('locale') || 'en'][i],
          AreaCode:country_map.areaCode[i],
        })
      }
      return list
    },
    showlist() {
      let searchStr = this.searchStr.replace(/ /g, "").toLowerCase();
      let arr = [];
      try {
        this.country.map((item) => {
          if (((item.Name+item.AreaCode).toLowerCase()).indexOf(searchStr) != -1) arr.push(item);
        });
      } catch (e) {}
      return arr;
    },
  },
  methods: {
    checkFun(item) {
      this.$store.commit("set_item", item);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
.area {
  main {
    background: url('../img/banner/user.png'),linear-gradient(180deg, #292929 0%, #02030D 100%);
    background-size: 100% auto, 100% 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    .searchboxs {
      padding: 30px 40px 20px;
      background: rgba(255,255,255,0.1);
      >div{
        height: 88px;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
        padding: 0 20px;
        .md-input-item-input {
            color: #fff;
          height: 88px;
        }
      }
    }
    .listbox{
        color: #fff;
      height: calc(100vh - 226px);
      overflow-y: auto;
      .md-cell-item-title{
          color: #fff;
      }
      .md-cell-item-body:before{
          border-color: rgba(255,255,255,0.2);
      }
    }
  }
}
</style>