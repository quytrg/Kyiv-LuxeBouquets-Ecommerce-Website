const categoryRouter = require('./category.route')
const productRouter = require('./product.route')
const roleRouter = require('./role.route')
const accountRouter = require('./account.route')
const authRouter = require('./auth.route')

module.exports = (app) => {
    const ADMIN_PATH = `/${app.locals.apiPrefix}/${app.locals.adminPrefix}`
    app.use(ADMIN_PATH + '/category', categoryRouter)
    app.use(ADMIN_PATH + '/products', productRouter)
    app.use(ADMIN_PATH + '/roles', roleRouter)
    app.use(ADMIN_PATH + '/accounts', accountRouter)
    app.use(ADMIN_PATH + '/auth', authRouter)
}
