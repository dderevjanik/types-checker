/**
 * @param url
 * Credits: https://stackoverflow.com/a/39621502/8899193
 */
function callApi(url: string) {
  return fetch(url).then((response: any) => {
    if (response.ok) {
      return response.json().then((response: any) => ({ response }));
    }

    return response.json().then((error: any) => ({ error }));
  });
}

/**
 * @param userWithRepo "usr/repo"
 */
export function getPackageFromGH(userWithRepo: string) {
  return callApi(`https://raw.githubusercontent.com/${userWithRepo}/master/package.json`);
}

export function getTypesPackages() {
  return callApi("https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json");
}
