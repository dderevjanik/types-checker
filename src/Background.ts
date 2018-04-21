import { BackgroundAPI, TypesPackage } from "./utils/Types";
import { TypesStore } from "./utils/TypesStore";
import { setPopupIcon, setPopupTitle } from "./utils/ChromeUtils";
import * as Network from "./utils/Network";

const typesStore = new TypesStore();

chrome.runtime.onMessage.addListener(async (message: BackgroundAPI, sender) => {
  switch (message.type) {
    case "NPM_PACKAGE": {
      const packg = typesStore.findExactPackage(message.name);
      if (packg) {
        setPopupIcon(sender.tab!.id!, "icons/icon_blue_48.png");
        setPopupTitle(sender.tab!.id!, `npm i @types/${message.name}`);
        break;
      }
      if (message.repoUrl.length > 0) {
        console.log("trying to find a package");
        // Try to find `typings` inside a package.json
        const { response, error } = await Network.getPackageFromGH(message.repoUrl.slice(19, message.repoUrl.length));
        if (error) {
          break;
        } else {
          if ("typings" in response) {
            setPopupIcon(sender.tab!.id!, "icons/icon_green_48.png");
            setPopupTitle(sender.tab!.id!, "package includes type definitions");
          }
        }
      }
      break;
    }
    case "GH_REPOSITORY": {
      try {
        // Try to find `typings` inside a package.json
        const { response, error } = await Network.getPackageFromGH(message.repoUrl);
        if (error) {
          throw new Error(error);
        }
        if ("typings" in response) {
          setPopupIcon(sender.tab!.id!, "icons/icon_green_48.png");
          setPopupTitle(sender.tab!.id!, "package includes type definitions");
          break;
        }
      } catch {}

      const repo = typesStore.findExactRepo(message.repoName);
      if (repo) {
        setPopupIcon(sender.tab!.id!, "icons/icon_blue_48.png");
        setPopupTitle(sender.tab!.id!, `npm i @types/${message.repoName}`);
      }
      break;
    }
    default: {
      throw new Error(`undefined message '${message}'`);
    }
  }
});
