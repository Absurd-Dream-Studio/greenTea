const path = require('path')

module.exports = {
  entry: './src/test/index.ts',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias:{
      '.js': ['.ts', '.js'],
    },
    alias: {
      "@Src" : path.resolve(__dirname , "src/main")
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist-unit-test'),
    clean: true
  },
};
