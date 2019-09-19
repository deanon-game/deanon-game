module.exports = {
  devServer: {
    hot: true, // https://webpack.js.org/configuration/dev-server/#devserverhot
    proxy: {
      '/p2p/': {
        target: 'http://localhost:8000/api/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
