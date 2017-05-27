/**
 * Created by LX on 2017/5/15.
 */
var path = require('path');
var express = require('express'); //启用一个server
var app = express();

var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');
var compiler = webpack(webpackDevConfig);
app.use(express.static(path.join(__dirname, 'src')));
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.listen(3000, function () {
    console.log('App (dev) is now running on port 3000!');
});