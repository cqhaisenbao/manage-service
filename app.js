const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('./utils/log4j')
const routing = require('./routes')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
    await next()
    log4js.info('xx')
})

// routes
routing(app)

// error-handling
app.on('error', (err, ctx) => {
    log4js.error(`${err.stack}`)
});

module.exports = app
