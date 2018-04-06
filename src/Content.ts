import { BackgroundAPI } from "./utils/Types";
import { isNpmPackagePage, isGithubRepoPage } from "./utils/PageDetect";
console.log("TC: intial");

const getRepoName = () => /\/.*?\/(.*?)(\/|$)/.exec(location.pathname);
const getPackageName = () => /\/package\/(.*?)(\/|$)/.exec(location.pathname);

if (isGithubRepoPage()) {
  console.log("TC: is GH");
  const match = getRepoName();
  if (match) {
    const repoName = "https://github.com" + match[0]; // match[0] = "usr/repo"
    chrome.runtime.sendMessage({
      type: "REPO_INIT",
      name: repoName
    } as BackgroundAPI);
  }
} else if (isNpmPackagePage()) {
  const match = getPackageName();
  if (match) {
    const packageName = match[1];
    chrome.runtime.sendMessage({
      type: "PACKAGE_INIT",
      name: packageName
    } as BackgroundAPI);
  }
}
