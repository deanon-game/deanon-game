const host = process.env.node_env === 'production' ? 'localhost' : '/'
const port = process.env.PORT || 9000

export default {
  host,
  debug: 0,
  port,
  path: '/api/p2p/'
}
