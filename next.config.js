const withCSS = require("@zeit/next-css");
const withLess = require('@zeit/next-less')
module.exports = withLess({
    lessLoaderOptions : {
        javascriptEnabled : true
    },
    // exportPathMap: async function (defaultPathMap) {
    //     return {
    //       '/': { page: '/' },
    //       '/about': { page: '/about' },
    //       '/test': { page: '/about' },
    //     }
    // }
})
