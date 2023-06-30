const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  entry: './src/listen.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimize: !isDev,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: ['/node_modules/', '/build/', '/__tests__/'],
      },
    ],
  },
  target: 'node',
};
