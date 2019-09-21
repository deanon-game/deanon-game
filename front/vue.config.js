module.exports = {
  devServer: {
    proxy: {
      '/api/p2p/': {
        target: 'http://localhost:9000/api/p2p/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
