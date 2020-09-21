const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
							'@primary-color': '#373530',
							'@border-radius-base': '3px'
						},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
