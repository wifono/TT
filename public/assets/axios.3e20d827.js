import { b as i } from './index.dac22646.js'
import { a } from './axios.bf56c3c5.js'
const e = a.create({ baseURL: 'https://api.example.com' })
var t = i(({ app: o }) => {
  ;(o.config.globalProperties.$axios = a), (o.config.globalProperties.$api = e)
})
export { e as api, t as default }
