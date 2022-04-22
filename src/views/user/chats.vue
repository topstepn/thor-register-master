<template>
  <div class="p4">
    <h3>
      <!-- <img class="icon" src="@/img/public/icon.png" alt=""> -->
      Loading...
    </h3>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import storage from "../../plugin/storage";


export default {
  // storage.get('locale') || 'en'
  created() {

  },
  beforeDestroy() {

  },
  watch: {},
  data() {
    return {
      type:1,
      start:'',
      end:'',
      token:''
    }
  },
  computed: {

  },
  methods: {
    findTotal() {
      let url = '/api/account/cumulative_income'
      let data = {
        type: this.type,
      };
      if(this.start!=''&&this.end!=''){
        data['start_time']=this.start;
        data['end_time']=this.end;
      }
      this.$axios
          .get(url, data)
          .then((res) => {
           console.log("res====",res);
          })
          .catch((err) => {
            try {

            } catch (e) {
            }
          });
    }
  },
  mounted () {
    const token = this.$route.query.token;
    const lan = this.$route.query.Language;
    if (token) {
      this.token=token;
      this.$store.commit("set_token", token);
      storage.set('token',token);
    }
    this.findTotal();
  },
};
</script>
