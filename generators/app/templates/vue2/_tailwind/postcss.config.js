module.exports = ({ file }) => {
  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}, <%if(platform==='h5') {%>
      'postcss-pxtorem': {
        rootValue: 37.5,
        unitPrecision: 6,
        propList: ['*'],
      },<%}%>
    },
  };
};
