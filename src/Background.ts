import { BackgroundAPI, TypesPackage } from "./utils/Types";
import { callApi } from "./utils/Helpers";
import { TypesStore } from "./utils/TypesStore";
const typesStore = new TypesStore();

chrome.runtime.onMessage.addListener(async (message: BackgroundAPI, sender) => {
  switch (message.type) {
    case "PACKAGE_INIT": {
      const packg = typesStore.findExactPackage(message.name);
      if (packg) {
        chrome.browserAction.setIcon({
          tabId: sender.tab!.id!,
          path: "icon_blue_48.png"
        });
      }
      break;
    }
    case "REPO_INIT": {
      try {
        // Try to find `typings` inside a package.json
        const { response, error } = await callApi(
          `https://raw.githubusercontent.com/${message.repoUrl}/master/package.json`
        );
        if (error) {
          throw new Error(error);
        }
        if ("typings" in response) {
          chrome.browserAction.setIcon({
            tabId: sender.tab!.id!,
            path: "icon_green_48.png"
          });
          break;
        }
      } catch {}
      const repo = typesStore.findExactRepo(message.repoName);
      if (repo) {
        chrome.browserAction.setIcon({
          tabId: sender.tab!.id!,
          path: "icon_blue_48.png"
        });
      }
      break;
    }
    default: {
      throw new Error(`undefined message '${message}'`);
    }
  }
});
