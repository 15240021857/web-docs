// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
// export default {
//   extends: DefaultTheme,
//   setup() {
//     const route = useRoute()
//     const init = () => mediumZoom('.vp-doc img', { background: 'rgba(0,0,0,.6)' })
//     onMounted(init)
//     watch(() => route.path, () => nextTick(init))
//   }
// }