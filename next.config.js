/* eslint-disable */

const url = require('url');
const path = require('path');
const ghpages = require('gh-pages');
const packageJson = require('./package');
const { CI } = process.env;

/**
 * Extract repo name from package.json
 */
const getRepositoryName = () => {
  const repoUrl = packageJson.repository.url;
  const parsedRepoURL = url.parse(repoUrl);
  const extname = path.extname(parsedRepoURL.pathname);
  return path.basename(parsedRepoURL.pathname).replace(extname, '');
}

// next.config.js
module.exports = {
  env: {
  	baseURL: CI ? `/${getRepositoryName()}` : ''
  },
  assetPrefix: CI ? `/${getRepositoryName()}` : ''
  /* config options here */
}
