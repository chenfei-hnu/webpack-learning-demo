module.exports = {  
    plugins: [  
          //npm install --save-dev autoprefixer postcss-loader
        require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })  
    ]  
}  