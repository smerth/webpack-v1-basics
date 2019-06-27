# Webpack Workout v1

## About

A series of exercises using webpack version 1

## Usage

This is a yarn workspace.

From the root run

```bash
yarn install
```

Run webpack for each app

```bash
yarn workspace 2-3 webpack
```

To view each app cd into the app folder and run:

```bash
python3 -m http.server
```

Depending on your setup you may call `python` or `python2`...

The app is served at: http://0.0.0.0:8000/



## 2-3 Process ES5

Transpile es5 code in `src/main.js` into vanilla javascript in `build/bundle.js`

@ webpack.config.js

```javascript
module.exports = {
	entry: './src/main.js',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
};
```



## 2-4 Process Coffeescript

Transpile coffeescript to javascript.  Check the console to see the output message which was written in coffeescript.

@ webpack.config.js

```javascript
module.exports = {
	entry: './main.coffee',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.coffee$/,
				exclude: /(node_modules)/,
				loader: 'coffee'
			}
		]
	}
};
```

## 3-1 Process React and CSS

Transpile es5 / React and CSS.

@ webpack.config.js

```javascript
module.exports = {
	entry: './src/main.js',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};
```



## 3-2 Process SCSS

Transpile scss into css and inline it.

@ webpack.config.js

```javascript
module.exports = {
	entry: './src/main.js',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}
	 ]
	}
};
```



## 3-3 Process Images in SCSS

Makes image urls available in SCSS

@ webpack.config.js

```javascript
module.exports = {
	entry: './src/main.js',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url'
			}
	 ]
	}
};
```



## 4-2 Multiple entry points

Processes a bundled js file for each entry point "About" and "Contact"

@ webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		about: './dist/about',
		contact: './dist/contact'
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}, 
				{
			    test: /\.(png|jpg)$/,
			    loader: 'url-loader?limit=10000'
			}
	 ]
	}
};
```



4-3 Common Chunks

Carve out the javascript common to all pages and serve as a `commons.bundle.js` file along with a `js` file specific to that page.

@ webpack.config.js

```javascript
var webpack = require("webpack");
var path = require("path");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry: {
    about: "./dist/about",
    contact: "./dist/contact",
    main: "./dist/main"
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=10000"
      }
    ]
  },
  plugins: [new CommonsChunkPlugin("commons", "commons.bundle.js")],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
};

```



## 4-4 Vendor Bundles

A **vendor bundle** contains the third party code of your project.

@ webpack.config.js

```javascript
var webpack = require("webpack");
var path = require("path");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry: {
    about: "./dist/about",
    contact: "./dist/contact",
    main: "./dist/main"
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=10000"
      }
    ]
  },
  plugins: [new CommonsChunkPlugin("commons", "commons.bundle.js")],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
};

```

