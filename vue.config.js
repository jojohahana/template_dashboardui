const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
      },
    },
  },
  devServer: {
    host: '0.0.0.0', // This allows access from other devices on the network
    port: 8080,      // Specify your preferred port if you want to change it
    allowedHosts: "all"
  }
});
