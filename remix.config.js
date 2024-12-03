// remix.config.js
require('dotenv').config();

module.exports = {
  // Base config
  appDirectory: 'app',
  extends: ["eslint:recommended"],
  ignorePatterns: ["!**/.server", "!**/.client"],
};