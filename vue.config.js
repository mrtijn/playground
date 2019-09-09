module.exports = {
    chainWebpack: config => {
        // GraphQL Loader
        config.module
            .rule('glslify')
            .test(/\.(glsl|vs|fs|vert|frag)$/)
            // .exclude(/node_modules/)
            .use('raw')
            .loader('raw-loader')
            .end()
            .use('import-loader')
            .loader('glslify-import-loader')
            .end()
            .use('glslify')
            .loader('glslify-loader')
            .end();
    }
}