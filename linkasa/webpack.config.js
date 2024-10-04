module.exports = {
    // ... other config settings ...
    module: {
      rules: [
        // ... other rules ...
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    // ... other config settings ...
  };