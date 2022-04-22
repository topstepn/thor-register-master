
module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 75,
            minPixelValue: 2,
            propWhiteList: []
        })
    ]
}
