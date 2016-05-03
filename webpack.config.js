module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js']
    }
}
