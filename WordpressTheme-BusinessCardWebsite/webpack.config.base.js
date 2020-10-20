const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = JSON.stringify(process.env.NODE_ENV);
console.log('NODE_ENV: ' + NODE_ENV);
const PATHS = {
  src: path.resolve(__dirname, '_dev/src'),
  dist: path.resolve(__dirname, ''),
  assets: path.resolve(__dirname, 'assets'),
  pages: path.resolve(__dirname, ''),
};
console.log(PATHS)
module.exports = {

  mode: 'production',
  
  externals: {
    paths: PATHS
  },
  
  context: PATHS.src,
  entry: {
    common: './index.js',
    // vendor: './style/vendor.scss',
    main: './pages/main',
    about_me: './pages/about_me',
    articles: './pages/articles',
    contacts: './pages/contacts',
    services: './pages/services',
  },

  output: {
    path: PATHS.assets,
    filename: `script/[name].js`,
    publicPath: '/',
    library: 'webpackVariable'
  },
  
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: NODE_ENV
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/main/index.html`,
      filename: './index.html',
      chunks: ['vendor', 'common', 'main']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/about_me/index.html`,
      filename: './about_me.html',
      chunks: ['vendor', 'common', 'about_me']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/articles/index.html`,
      filename: './articles.html',
      chunks: ['vendor', 'common', 'articles']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/contacts/index.html`,
      filename: './contacts.html',
      chunks: ['vendor', 'common', 'contacts']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/services/index.html`,
      filename: './services.html',
      chunks: ['vendor', 'common', 'services']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
    })
    
    // common: './index.js',
    // main: './pages/main',
    // about_me: './pages/about_me',
    // articles: './pages/articles',
    // contacts: './pages/contacts',
    // services: './pages/services',
    // new CleanWebpackPlugin()
  ],
  
  module: {
    rules: [

      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[path][name].[ext]'}
        }]
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[path][name].[ext]'}
        }]
      },

      // {
      //   test: /\.(html)$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {name: '[name].[ext]'}
      //   }],
      //   exclude: `${PATHS.src}/index.html`
      // },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },

      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          // options: {presets: ["latest"]} настроены в package.json
        }
      },
      
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          
          {loader: 'style-loader',
            options: {
              // injectType: 'linkTag',
              // sourceMap: true
            }
          },

          // {loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: './build/style',
          //   },
          // },

          {loader: 'css-loader',
            options: {
              'url': false,
            }
          },

          {loader: 'postcss-loader',
            options: {sourceMap: true}
          },

          {loader: 'sass-loader'},

          // {loader: 'stylefmt-loader',
          //   options: {}
          // },
        ]
      },
    ],
  },

};