const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const DotEnv = require('dotenv-webpack')
const TerserPlugin = require("terser-webpack-plugin");



module.exports =env=>({
  entry: './src/main/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader:'ts-loader',
          options:{
            configFile:'tsconfig.build.json'
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images.[name].[ext]',
              // publicPath: '/dist/resources/images',
              outputPath: 'images/'
            }
          }
        ],
        exclude : /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        // exclude : /node_modules/
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        exclude : /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // this config let webpack can reslove esm typescript import syntax
    extensionAlias:{
      '.js': ['.ts', '.js', '.tsx'],
    },
    alias: {
      "@Icons" : path.resolve(__dirname , "resources/icon/"),
      "@Css" : path.resolve(__dirname , "resources/css/"),
      "@Html" : path.resolve(__dirname , "resources/html/"),
      "@Src" : path.resolve(__dirname , "src/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main/index.html',
      title: 'HelloWorld',
    }),
    // new DotEnv({
    //   path:`./env/.env.${env.env}`
    // }),
  ],
  devServer: {
    // stats: 'errors-only',
    https:true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  optimization:{
    minimizer:[
      new TerserPlugin({
        terserOptions:{
          compress:{
            drop_console:true,
          }
        },
      })
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
});
