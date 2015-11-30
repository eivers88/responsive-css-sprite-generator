module.exports = {
    entry: './js/index.js',
    output: {
        filename: './js/bundle.js',
        path: __dirname
    },
    devtool:'#source-map',
    module: {
        loaders:[
            {test:/\.js$/, exclude: /node_modules/, loader:'babel-loader?presets[]=es2015'},
            {test:/\.css$|\.scss$/, exclude: /node_modules/, loader:'style!css!sass'},
            {test:/\.png$|\.svg$|\.jpg$/, exclude: /node_modules/, loader:'url'}
        ]
    }
};