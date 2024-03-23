const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/test/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
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
        exclude : /node_modules/
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
      '.js': ['.ts', '.js'],
    },
    alias: {
      "@Icons" : path.resolve(__dirname , "resources/icon/"),
      "@Css" : path.resolve(__dirname , "resources/css/"),
      "@Html" : path.resolve(__dirname , "resources/html/"),
      "@Src" : path.resolve(__dirname , "src/main"),
      "@Test" : path.resolve(__dirname , "src/test")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/test/index.html',
      title: 'test',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
