
var config = {
    context: __dirname + "/assets",
    entry: "./js/index.js",
    devtool: "cheap-source-map",
    // devtool: "cheap-eval-source-map",
    // devtool: "cheap-module-eval-source-map",
    output: {
        filename: "bundle.js",
        path: __dirname + "/assets/js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;