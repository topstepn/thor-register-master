import Vue from 'vue'

import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
Vue.use(mandMobile)

import top from '@/components/top'
Vue.component('top', top)

import send from '@/components/send'
Vue.component('send', send)

import wxdom from '@/components/wxdom'
Vue.component('wxdom', wxdom)
