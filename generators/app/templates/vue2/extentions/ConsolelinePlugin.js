/* eslint-disable */

module.exports = function ({ types: t }) {
  let defaultOpt = {
    include: 'src',
    badge: '🍳',
    style: 'background:#5965ba;padding:0 4px;color:#fff;'
  }
  if (process.env.NODE_ENV === 'development') {
    return {
      visitor: {
        CallExpression(path) {
          defaultOpt = { ...defaultOpt, ...this.opts };
          const filename = this.filename || this.file.opts.filename || 'unknown';
          if (filename.match(defaultOpt.include)) {
            if (path.node.callee.object && path.node.callee.object.name === 'console' && path.node.callee.property.name !== 'error') {
              const line = path.node.loc.start.line;
              const description = `%c${defaultOpt.badge} ${filename.split(/\\|\//).slice(-2).join('/ ')}:${line}`;
              const style = defaultOpt.style;
              const args = path.node.arguments;
              const isDup = args.some(item => item.type === 'StringLiteral' && item.value === style)
              if (!isDup) {
                args.unshift(t.stringLiteral(style));
                args.unshift(t.stringLiteral(description));
              }
            }
          }
        }
      },
    };
  } else {
    return {}
  }
};
