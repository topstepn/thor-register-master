
module.exports = {
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: process.env.VUE_APP_API
    },
}
