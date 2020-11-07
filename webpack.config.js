const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/js/main.ts',
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js',
  },
  target: 'node-webkit', // must target to node-webkit
  resolve: {
    modules: ['./src/js', 'node_modules'],
    extensions: ['.js', '.vue', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true, esModule: false },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [path.join(__dirname, '/src/css/app.scss')],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: ['css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  devtool: 'source-map',
  plugins: [new VueLoaderPlugin()],
}
