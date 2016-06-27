'use strict';

const git = require('git-rev-sync');

const branch = () => process.env.CI_BRANCH || git.branch();

const count = git.count;

const log = git.log;

const long = (dir) => process.env.CI_COMMIT_ID || git.long(dir);

const message = () => process.env.CI_MESSAGE || git.message();

const short = (dir) => long(dir).substr(0, 7);

const tag = git.tag;

module.exports = {
  branch: branch,
  count: count,
  log: log,
  long: long,
  message: message,
  short: short,
  tag: tag,
};
