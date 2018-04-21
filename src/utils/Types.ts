export type BackgroundAPI =
  | {
      type: "GH_REPOSITORY";
      /**
       * usr/repo
       */
      repoUrl: string;
      /**
       * repo
       */
      repoName: string;
    }
  | {
      type: "NPM_PACKAGE";
      /**
       * package
       */
      name: string;
      /**
       * https://github.com/usr/repo
       */
      repoUrl: string;
    };

export type PopupAPI = {
  type: "FOUND";
  name: string;
};

/**
 * Obtained from https://github.com/Microsoft/TypeSearch/blob/master/assets/script/search.ts#L3
 */
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
