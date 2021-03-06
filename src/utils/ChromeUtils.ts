export function setPopupIcon(tabId: number, iconPath: string) {
  chrome.browserAction.setIcon({
    tabId,
    path: iconPath
  });
}

export function setPopupTitle(tabId: number, title: string) {
  chrome.browserAction.setTitle({
    tabId,
    title
  });
}
