/* eslint-disable */

const url = require('url');
const ghpages = require('gh-pages');
const packageJson = require('./package');
const GithubToken = process.env.GH_TOKEN;

/**
 * Extract repo url from package.json, then add auth in it
 */
const getRepositoryURL = () => {
  const repoUrl = packageJson.repository.url;
  const parsedRepoURL = url.parse(repoUrl);
  parsedRepoURL.protocol = 'https';
  parsedRepoURL.auth = process.env.GH_TOKEN;
  return url.format(parsedRepoURL);
}

ghpages.publish('out', {
  repo: getRepositoryURL(),
  dotfiles: true,
  message: 'Deploy to Github Page',
  user: {
    name: 'Donatien NAMBININTSOA (CI)',
    email: 'donatiennambinintsoa@gmail.com'
  }
}, (error, message) => {
  if (error) return console.error(error);
  console.log("🥳, We made it...", message);
});
