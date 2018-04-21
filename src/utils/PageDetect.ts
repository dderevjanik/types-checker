const isRepo = () =>
  /^\/[^/]+\/[^/]+/.test(location.pathname) &&
  !location.pathname.startsWith("/trending") &&
  !location.pathname.startsWith("gist.") &&
  !location.pathname.startsWith("gist/");

export function isGithubRepoPage() {
  if (location.hostname.includes("github") && isRepo()) {
    return true;
  }
  return false;
}

export function isNpmPackagePage() {
  if (location.hostname.includes("npm") && location.pathname.startsWith("/package/")) {
    return true;
  }
  return false;
}
