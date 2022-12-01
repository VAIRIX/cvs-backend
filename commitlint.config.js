module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 255],
    'footer-max-line-length': [2, 'always', 255],
  },
  ignores: [(message) => /\(\[#\d+\]\(https:\/\/github.com/.test(message)],
};
