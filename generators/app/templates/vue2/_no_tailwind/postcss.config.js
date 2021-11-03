module.exports = ({ file }) => {
  return {
    plugins: {
      autoprefixer: {}, <%if(platform==='h5') {%>
      'postcss-pxtorem': {
        rootValue: 37.5,
        unitPrecision: 6,
        propList: ['*'],
      },<%}%>
    },
  };
};
