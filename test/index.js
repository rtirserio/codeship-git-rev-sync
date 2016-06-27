'use strict';

const assert = require('chai').assert;
const mockery = require('mockery');

describe('module', () => {
  let mockGit = {
    branch: () => 'mock_branch',
    message: () => 'mock message',
    long: (dir) => 'mock long',
  };
  let git;
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('git-rev-sync', mockGit);
    git = require('../index.js');
  });

  after(() => {
    mockery.resetCache();
    mockery.disable();
  });

  describe('function - branch', () => {
    it('CI_BRANCH env var when present', () => {
      process.env.CI_BRANCH = 'test_branch';
      assert.equal(git.branch(), process.env.CI_BRANCH);
    });
    it('CI_BRANCH env var when not present', () => {
      process.env.CI_BRANCH = '';
      assert.equal(git.branch(), mockGit.branch());
    });
  });
  describe('function - long', () => {
    it('CI_COMMIT_ID env var when present', () => {
      process.env.CI_COMMIT_ID = '1234567890';
      assert.equal(git.long(), process.env.CI_COMMIT_ID);
    });
    it('CI_COMMIT_ID env var when not present', () => {
      process.env.CI_COMMIT_ID = '';
      assert.equal(git.long(), mockGit.long());
    });
  });
  describe('function - message', () => {
    it('CI_MESSAGE env var when present', () => {
      process.env.CI_MESSAGE = 'test commit message';
      assert.equal(git.message(), process.env.CI_MESSAGE);
    });
    it('CI_MESSAGE env var when not present', () => {
      process.env.CI_MESSAGE = '';
      assert.equal(git.message(), mockGit.message());
    });
  });
  describe('function - short', () => {
    it('returns short commit', () => {
      process.CI_COMMIT_ID = '12345678990';
      assert.equal(git.short().length, 7);
    });
  });
});
