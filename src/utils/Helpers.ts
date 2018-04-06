/**
 * @param url
 * Credits: https://stackoverflow.com/a/39621502/8899193
 */
export function callApi(url: string) {
  return fetch(url).then((response: any) => {
    if (response.ok) {
      return response.json().then((response: any) => ({ response }));
    }

    return response.json().then((error: any) => ({ error }));
  });
}
