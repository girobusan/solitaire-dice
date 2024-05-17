const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');
var coreCSS="/*not generated yet*/"


const env = process.env.NODE_ENV;


module.exports = function (env, argv) {

  let builddir = argv.mode== 'production' ? 'dist' : 'test';

  return {
    watch: argv.mode != 'production',
    target: 'web',
    optimization: {


    },


    mode: argv.mode,
    entry: {
      "solitaire": './src/index.js',
    },
    devtool: argv.mode != "production" ? 'inline-source-map' : false, 

    output: {
    //   filename: '[name].js',
      path: path.resolve(__dirname, builddir, "")
    },

    module: {
      rules: [

        {
          test: /\.svg$/,
          resourceQuery: /raw/,
          type: 'asset/source'
        },

        {
          test: /\.svg$/,
          resourceQuery: { not: [/raw/] },
          type: 'asset/inline'
        },
        {
          test: /\.htm$/,
          resourceQuery: /raw/,
          type: 'asset/source'
        },

        {
          test: /\.(less|css|scss)$/,
          use: [
            'style-loader' ,
            'css-loader',
            'sass-loader'
          ],
        },
        {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
        {
          test: /\.(woff|ttf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
          ],
        }
      ]

    },
    plugins: [
      new webpack.DefinePlugin({
        // Definitions...
        'VERSION': JSON.stringify(pkg.version)
      }),
      new HtmlWebpackPlugin({

        chunks: ["solitaire"],
        filename: 'index.html',
        minify: false,
        inject: "body",
        css: coreCSS,
        // scriptLoading: 'defer',
        template: path.join(__dirname, "src/templates/index.ejs"),
      }
      ),

    ],
  };
}
