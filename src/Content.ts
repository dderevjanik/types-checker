import { BackgroundAPI } from "./utils/Types";
import { isNpmPackagePage, isGithubRepoPage } from "./utils/PageDetect";

const getRepoName = () => /\/.*?\/(.*?)(\/|$)/.exec(location.pathname);
const getPackageName = () => /\/package\/(.*?)(\/|$)/.exec(location.pathname);

if (isGithubRepoPage()) {
  const match = getRepoName();
  if (match) {
    const repoUrl = "https://github.com" + match[0]; // match[0] = "usr/repo"
    const hasPackage = document.querySelector('a.js-navigation-open[title="package.json"]') ? true : false;
    if (hasPackage) {
      // It is a javascript library
      chrome.runtime.sendMessage({
        type: "GH_REPOSITORY",
        repoName: match[1], // "repo"
        repoUrl
      } as BackgroundAPI);
    }
  }
} else if (isNpmPackagePage()) {
  const match = getPackageName();
  if (match) {
    const packageName = match[1]; // "package"
    const linkToRepo = document.querySelector("div>div:nth-child(8)>p>.link") as HTMLAnchorElement | undefined;
    console.log((window as any).__context__);
    chrome.runtime.sendMessage({
      type: "NPM_PACKAGE",
      name: packageName,
      repoUrl: linkToRepo && linkToRepo.href.startsWith("https://github.com") ? linkToRepo.href : ""
    } as BackgroundAPI);
  }
}
