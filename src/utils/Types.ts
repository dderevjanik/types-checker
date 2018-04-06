export type BackgroundAPI =
  | {
      type: "REPO_INIT";
      name: string;
    }
  | {
      type: "PACKAGE_INIT";
      name: string;
    };

export type PopupAPI = {
  type: "FOUND";
  name: string;
};

export type TypesPackage = {
  /**
   * types package name
   * @example "selenium-webdriver"
   */
  t: string;

  /**
   * Globals
   */
  g: string[];

  /**
   * modules
   * @example ["selenium-webdriver/firefox", "selenium-webdriver/http"]
   */
  m: string[];

  /**
   * Project url (it can be repository, documentation or product page)
   */
  p: string;

  /**
   * Library name
   * @example "Selenium WebDriverJS"
   */
  l: string;

  /**
   * downloads in the last month from NPM
   */
  d: number;
};
