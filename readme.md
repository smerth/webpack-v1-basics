# Learn Webpack - the basics

## Reference

This is the project for the Lynda.com course [Learn Webpack the Basics](https://www.lynda.com/Webpack-tutorials/Learn-Webpack-Basics/483222-2.html)  which is a good intro to how to use webpack.

## Run the code:

Each folder is a separate demo of some webpack functionality.  CD into each folder and perform the following:

Install dependancies

```bash
yarn install
```

run webpack

```bash
webpack
```

view the webpage

```bash
python -m http.server
```


## Webpack react loader

ES6 syntax is transpiled to Vanilla JS



## Coffeescript loader

transpile Coffeescript to Vanilla JS

## Css loader

In addition to loading JavaScript with webpack, we can load CSS, Sass and LESS to style our pages. The benefit of loading CSS as a module like this is that webpack will only bundle the styles that our app uses. We can also require or import styles for use with certain files. Also, it will perform transformations on Sass and LESS to turn it into CSS prior to loading into a browser. Started with this we are going to create a simple component using React JS.



@ main.js

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

class Message extends React.Component {
	render() {
		return (<div>
					<h1>{this.props.title}</h1>
					<p>{this.props.message}</p>
				</div>);
	}
}

ReactDOM.render(<Message title="Styled with CSS" message="This page was styled with CSS."/>, 
	document.getElementById('react-container'));
```

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



## Sass loader

@ main.js

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
require('./style.scss');

class Message extends React.Component {
	render() {
		return (<div>
					<h1>{this.props.title}</h1>
					<p>{this.props.message}</p>
				</div>);
	}
}

ReactDOM.render(<Message title="Styled with SASS" message="This page was styled with SASS"/>, 
	document.getElementById('react-container'));
```

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



## Image loader

The process of loading images with webpack is very similar to loading CSS. With webpack we load images by using URL loader. Webpack in-lines a URL to the image bundle and then returns it from require. This is good because in-lining images will reduce the number of HTTP requests which will speed up our applications a lot.

dependancies

```bash
yarn add file-loader url-loader
```

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



## Multiple entry points

With multiple entry points we create separate bundles for different pages. That way we'll only load the code that we need.

Use node.js's path module

@webpack.config.js

```java
var webpack = require('webpack');
var path = require('path');
```

@ webpack.config.js

```javascript
	entry: {
		about: './dist/about',
		contact: './dist/contact'
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
```

When webpack is run a new dist folder appears with separate js files for about and contact.





## Commons chunk bundler

To take optimizations one step further, we can use a web pack plug in, called the CommonsChunkPlugin. The CommonsChunkPlugin will look for reused code and will create a separate bundle with common code. Then we'll load the common code into the page first and load in page specific code after that.

@ webpack.config.js

```javascript
	plugins: [
		new CommonsChunkPlugin('commons', 'commons.bundle.js')
	]
```



## Building vender files

Now that we know how to incorporate the CommonsChunkPlugin, we can use it to create a bundle of all of library files. In other words, a vendor bundle. A vendor bundle is just filled with code that probably we didn't write, it's code that's from different libraries. Things like React, jQuery, et cetera. And we're going to bundle that all up by adjusting our CommonsChunkPlugin.

@webpack.config.js

```javascript
	entry: {
		about: './dist/about',
		contact: './dist/contact',
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
```



## Webpack dev server




