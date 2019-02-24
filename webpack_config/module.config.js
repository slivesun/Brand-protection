const ExtractTextPlugin = require('extract-text-webpack-plugin');
const moduleConfigDev = { 
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: 'style-loader',
                publicPath: '../'
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true}
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'less-loader',
                    options: { sourceMap: true,javascriptEnabled: true}
                }],
                fallback: 'style-loader',
                publicPath: '../'
            })

        },
        {
            test: /\.(gif|jpg|png)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 0,
                        name: '[name].[ext]',
                        outputPath: './img/',
                        publicPath: './img/'
                    }
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }

    ]
};
const moduleConfigProd = { 
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options:{
                        minimize: true //css压缩
                    }
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: 'style-loader',
                publicPath: '../'
            })
        },
        {
            test: /\.less/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options:{
                        minimize: true //css压缩
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader',
                publicPath: '../'
            })

        },
        {
            test: /\.(gif|jpg|png)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 0,
                        name: '[name].[ext]',
                        outputPath: './img/',
                        publicPath: './img/'
                    }
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }

    ]
};
if(process.env.npm_lifecycle_script.indexOf('development')>1){
    module.exports = moduleConfigDev;
    console.log('moduleConfigDev----->')
}else if(process.env.npm_lifecycle_script.indexOf('production')>1){
    module.exports = moduleConfigProd;
    console.log('moduleConfigProd----->')
}
