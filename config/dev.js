module.exports = {
  port: 3000,

  amqp: {
    url: 'amqp://localhost',
    prefetch: 5
  },

  mongodb: {
    url: 'mongodb://localhost:27017/renderService',
    database: 'renderService'
  },

  cache: 24 * 60, // 1 day

  sentry: {
    dsn: ''
  }
}
