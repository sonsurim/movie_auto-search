const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const tsConfigPath = path.resolve(__dirname, "./tsconfig.json")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins:[
      new TsconfigPathsPlugin({
        configFile: tsConfigPath
      })
    ]
  },
	module: {
		rules: [
			{
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.m?js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "useBuiltIns": "usage",
                "corejs": 3
              }],
              "@babel/preset-typescript"
            ],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
		]
	},
	devtool: "inline-source-map",
  devServer: {
    client: {
      logging: 'none'
    }
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico')
    }),
    new CopyPlugin({
			patterns: [
				{ from: 'public/favicon.ico'}
			]
		}),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.[contenthash].css',
    })
  ]
}