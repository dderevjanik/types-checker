import { BackgroundAPI, TypesPackage } from "./utils/Types";
import { callApi } from "./utils/Helpers";
import { TypesStore } from "./utils/TypesStore";

const typesStore = new TypesStore();

chrome.runtime.onMessage.addListener((message: BackgroundAPI, sender) => {
  switch (message.type) {
    case "PACKAGE_INIT": {
      const packg = typesStore.findExactPackage(message.name);
      if (packg) {
        chrome.browserAction.setIcon({
          tabId: sender.tab!.id!,
          path: "icon_green_48.png"
        });
      }
      break;
    }
    case "REPO_INIT": {
      const repo = typesStore.findExactRepo(message.name);
      if (repo) {
        chrome.browserAction.setIcon({
          tabId: sender.tab!.id!,
          path: "icon_green_48.png"
        });
      }
      break;
    }
    default: {
      throw new Error(`undefined message '${message}'`);
    }
  }
});