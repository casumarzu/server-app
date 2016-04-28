module.exports = function(config) {
  config.set({
    files: [
      './src/**/*.test.js',
    ],

    preprocessors: {
      './src/**/*.test.js': ['webpack']
    },

    webpack: {},

    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher'
    ]
  });
};
