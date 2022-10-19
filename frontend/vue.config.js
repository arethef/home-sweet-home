// module.exports = {
//   devServer: {
//     proxy: {
//       '/': {
//         'target': 'http://localhost:3001/api/vi',
//         'pathRewrite': { '^/': '' },
//         'changeOrigin': true,
//         'secure': false
//       }
//     }
//   }
// }
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
