module.exports = {
  devServer: {
    hot: true, // https://webpack.js.org/configuration/dev-server/#devserverhot
    proxy: {
      '/api/p2p/': {
        target: 'http://localhost:9000/api/p2p/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
