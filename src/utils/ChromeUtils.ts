export function setPopupIcon(tabId: number, iconPath: string) {
  chrome.browserAction.setIcon({
    tabId,
    path: iconPath
  });
}
