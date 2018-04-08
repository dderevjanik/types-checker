import { BackgroundAPI } from "./utils/Types";
import { isNpmPackagePage, isGithubRepoPage } from "./utils/PageDetect";

const getRepoName = () => /\/.*?\/(.*?)(\/|$)/.exec(location.pathname);
const getPackageName = () => /\/package\/(.*?)(\/|$)/.exec(location.pathname);

if (isGithubRepoPage()) {
  const match = getRepoName();
  if (match) {
    const repoUrl = "https://github.com" + match[0]; // match[0] = "usr/repo"
    chrome.runtime.sendMessage({
      type: "REPO_INIT",
      repoName: match[1],
      repoUrl
    } as BackgroundAPI);
  }
} else if (isNpmPackagePage()) {
  const match = getPackageName();
  if (match) {
    // document.querySelectorAll('div:nth-child(4)>div>p>.link') <a href={REPO_LINK}/>
    const packageName = match[1];
    chrome.runtime.sendMessage({
      type: "PACKAGE_INIT",
      name: packageName
    } as BackgroundAPI);
  }
}
