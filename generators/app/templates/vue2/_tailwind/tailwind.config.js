/**
 * tailwindcss 用于配置全局样式
 *
 */
const plugin = require('tailwindcss/plugin');
const styleConfig = require('./src/view/styles/variables.js')

module.exports = {
  important: true, // 生成!important的类
  // production下的tree shake

  purge: { layers: ['components', 'utilities'], content: ['./public/*.html', './src/**/*.js', './src/**/*.vue'] },
  corePlugins: {
    colors: false, // 不生成默认colors
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // 为了复用colors，放在extend中，会覆盖colors中冲突的配置
      textColor: styleConfig.textColor,
    },
    colors: styleConfig.colors,
    spacing: styleConfig.spacing,
    width: styleConfig.width,
    height: styleConfig.height,
    fontSize: styleConfig.fontSize,
    borderRadius: styleConfig.borderRadius
  },

  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, e, prefix, config }) {

    }),
  ],
};
