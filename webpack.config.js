import path from 'path'

const __dirname = path.resolve(path.dirname(''))

export default {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public/_js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.ts$/, use: 'ts-loader'
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                    import: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: "development",
};