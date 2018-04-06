# Types Checker

Detects if npm packages has typescript types

## About

Chrome extension that will detect if currently visited javascript library has typescript
types. Extension detects libraries on **Github** and **Npm**.

* ![normal](dist/icon_dark_16.png) **probably** no types for a library
* ![blue](dist/icon_16.png) there are types for a library with that name, use `npm i @types/LIB_NAME`
* ![blue?](dist/icon_16.png) **probably** there are types for a library, first check, then `npm i @types/LIB_NAME`
* ![green](dist/icon_green_16.png) library has own types, no additional `npm i`

## How detection works ?

First of all, this extension will store data generated by [DefinetelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) project, which is hub for
type definition created for javascript libraries.

Microsoft creates web app called [Typesearch](https://microsoft.github.io/TypeSearch/),
which offers to user to search for a library with type definitions. If type definitions
has been found, user can install them using `npm i @types/PACKAGE_NAME`. Typesearch
is looking at lookup table created generated data from DefinetelyTyped. You can
see them [https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json](https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json) _(warning BIG JSON here!!!)_

Structrue:

```typescript
Array<{
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
}>
```

### Detection based on npm package

For example: `https://www.npmjs.com/package/react`

Based on unique package name, which is `/react`, we are looking for a type package called `react`. Looking back on our data received, we're iterating all items in array and doing `if('react' === item.t)`. If there's a match, extension icon will turn to `blue`.

### Detection based on Github repository

For example: `https://github.com/facebook/react`

We assume that `/react` is again our unique name, but that's wrong ! There are plenty of repositories out there with name `/react`, but we're looking only for type packge for `facebook/react`, but that kind of data are not generated by DefinetelyTyped project. So, there are 2 options:

* Try to look into `package.json` for a `typings` property. This can tell us if library has types without no need to install `@types/` (for example [axios](https://github.com/axios/axios) has types). Extension icon will turn to `green`

* In case, there are no `typings` inside `package.json`, we can still iterate over all types packages and try to find library name. Extension icon will turn to `blue` with `?` (question mark).
