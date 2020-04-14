module.exports = {
  // 修改的配置
  productionSourceMap: false,
  publicPath:"./",
  outputDir:"dist",
  assetsDir:"static",
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:3013',
              // target: 'http://119.29.94.99:3013',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
          }
      }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '叠一叠呗',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}