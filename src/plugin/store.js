import Vue from 'vue'
import Vuex from 'vuex'
import Clipboard from 'clipboard'
import { Toast } from 'mand-mobile'
import i18n from './i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    item: null,
    token:'',
  },
  mutations: {
    copyFun(context, { dom, value }) {
      if (!value) return Toast.failed(i18n.t('copy.no'));
      // eslint-disable-next-line no-undef
      var clipboard = new Clipboard(dom);
      clipboard.on("success", e => {
        Toast.succeed(i18n.t('copy.ok'));
        e.clearSelection();
      });
      clipboard.on("error", () => {
        Toast.failed(i18n.t('copy.no'));
      });
    },
    set_item(state, item) {
      state.item = item;
    },
    set_token(state, token) {
      state.token = token;
    },
  },
  actions: {
  },
  getters: {
    pattern: () => (params) => {
      const pattern = {
        username: i18n.t('user.p_username'),
        mobile: i18n.t('user.p_mobile'),
        email: i18n.t('user.p_email'),
        code: i18n.t('user.p_code'),
        password: i18n.t('user.p_password'),
        re_password: i18n.t('user.p_re_password'),
        // pid: i18n.t('user.p_pid'),
      }
      let flag = true
      for (let key of Object.keys(params)) {
        if (!pattern[key]) continue
        if (!params[key]) {
          Toast.failed(pattern[key]);
          flag = false;
          break;
        } else switch (key) {
          case 'username':
            if (
              !(
                /^\d{6,}$/.test(params[key]) ||
                /^\S+@(\w)+((\.\w+)+)$/.test(params[key])
              )
            ) {
              Toast.failed(i18n.t('user.err_username'));
              flag = false;
              return;
            }
            break;
          case 'mobile':
            if (!/^\d{6,}$/.test(params[key])) {
              Toast.failed(i18n.t('user.err_mobile'));
              flag = false;
              return;
            }
            break;
          case 'email':
            if (!/^\S+@(\w)+((\.\w+)+)$/.test(params[key])) {
              Toast.failed(i18n.t('user.err_email'));
              flag = false;
              return;
            }
            break;
          case 'password'://  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,23}$/
            if (params.check && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,16}$/.test(params[key])) {
              Toast.failed(i18n.t('user.err_password'));
              flag = false;
              return;
            }
            break;
          case 're_password':
            if (params[key] != params.password) {
              Toast.failed(i18n.t('user.err_re_password'));
              flag = false;
              return;
            }
            break;
        }
      }
      return flag
    },
    item: state => state.item,
    token: state => state.token,

  },
  modules: {
  }
})
