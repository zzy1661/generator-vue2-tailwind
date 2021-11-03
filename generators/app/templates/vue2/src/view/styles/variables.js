// 以下数字单位都是750设计稿的px
const spacings = [
  0,4,8,16,24,32,48,64
];
const widths = [ 32,46,64,120,240,320,480];

const spacing = {
  px: '1px',
  ...spacings.reduce((pre, cur) => {
    pre[cur] = cur + 'px';
    return pre;
  }, {}),
};
const width = {
  ...widths.reduce((pre, cur) => {
    pre[cur] = cur + 'px';
    return pre;
  }, {}),
};

module.exports = {
  spacing,
  width,
};
