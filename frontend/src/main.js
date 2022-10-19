import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import router from './router/index.js'
import store from './store/index.js'


// new Vue({
//   render: h => h(App),
//   router,
//   store,
// })
//   .$mount('#app')
// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(store)

new WaveUI(app, {

})

app.mount('#app')