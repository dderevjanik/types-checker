import { TypesPackage } from "./Types";
import * as Network from "./Network";

const seconds = (s: number) => s * 1000;
const minutes = (m: number) => seconds(60 * m);
const hours = (h: number) => minutes(60 * h);
const STORE_KEY = "TYPES";

export class TypesStore {
  isOutdated: boolean = true;
  private _types: TypesPackage[] = [];
  private _interval: number | NodeJS.Timer;

  constructor() {
    this.loadFromLocalStorage();
    this.update();
    this._interval = setInterval(() => {
      this.isOutdated = true;
    }, hours(1));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(STORE_KEY);
    if (data) {
      const types = JSON.parse(data) as TypesPackage[];
      this._types = types;
    } else {
      this._types = [];
    }
  }

  findExactPackage(packageName: string): TypesPackage | undefined {
    const foundPackage = this._types.find(t => t.t.toLowerCase() === packageName);
    if (foundPackage) {
      return foundPackage;
    }
    return undefined;
  }

  /**
   * Will try find if types based on repo url https://github.com/USER/REPO
   * matches any of types
   * @param reponName - name of repo, https://github.com/USER/REPO
   */
  findExactRepo(repoName: string): TypesPackage | undefined {
    const foundRepo = this._types.find(t => t.t.toLowerCase() === repoName);
    if (foundRepo) {
      return foundRepo;
    }
    return undefined;
  }

  async update() {
    const { response, error } = (await Network.getTypesPackages()) as any;
    if (error) {
      // Probably no internet connection
      return;
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(response));
    this.isOutdated = false;
  }
}
