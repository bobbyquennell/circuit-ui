const webpack = require('webpack');

module.exports = {
  stories: [
    '../packages/**/*.stories.@(js|ts|tsx|mdx)',
    '../docs/**/*.stories.@(js|ts|tsx|mdx)',
  ],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: { transpileManager: true },
    },
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    'storybook-addon-performance',
  ],
  features: {
    postcss: false,
  },
  webpackFinal: createWebpackConfig,
  managerWebpack: createWebpackConfig,
};

function createWebpackConfig(config) {
  // Transpile all node_modules under the @sumup/* namespace.
  config.module.rules = config.module.rules.map((rule) => {
    // Modify all rules that apply to story files.
    if (
      rule.test &&
      rule.test instanceof RegExp &&
      ['.js', '.ts', '.tsx'].some((extension) => rule.test.test(extension))
    ) {
      return {
        ...rule,
        exclude: /node_modules\/(?!(@sumup|acorn-jsx)\/).*/,
      };
    }
    return rule;
  });
  // Expose environment variables to Storybook
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS': JSON.stringify(
        process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS,
      ),
    }),
  ];
  return config;
}
