const path = require('path');

module.exports = [
    {
        entry:     './src/ReactCodeInput.js',
        devtool:   'source-map',
        mode:      'production',
        output:    {
            path:          path.resolve(__dirname, 'lib'),
            filename:      'ReactCodeInput.js',
            libraryTarget: 'umd',
            library:       'ReactCodeInput',
        },
        module:    {
            rules: [
                {
                    test:    /\.js$/,
                    use:     ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.json$/,
                    use:  'json-loader',
                },
                {
                    test: /\.css$/,
                    use:  ['css', 'sass'],
                },
            ],
        },
        externals: {
            react: 'react',
        },
    },
    {
        output:  {
            path:     path.resolve(__dirname, 'example/dist'),
            filename: 'example.js',
        },
        mode:    'development',
        module:  {
            rules: [
                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    use:     ['babel-loader'],
                },
                {
                    test: /\.json$/,
                    use:  'json-loader',
                },
                {
                    test: /\.css$/,
                    use:  ['css', 'sass'],
                },
            ],
        },
        entry:   [
            'babel-polyfill',
            './example/example.js',
        ],
        stats:   {
            colors: true,
        },
        devtool: 'source-map',
    },
];
