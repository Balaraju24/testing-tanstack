import Cookies from 'js-cookie';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const arrayToUrlString = (key, value) => {
  let arrayUrl;
  arrayUrl = value.map((item) => {
    return `${key}=${item}`;
  });
  return arrayUrl.join("&");
};
const prepareURLEncodedParams = (url, params) => {
  let paramsArray = Object.keys(params).map((key) => {
    const value = params[key];
    if (value && value.length) {
      if (Array.isArray(value)) {
        return arrayToUrlString(key, value);
      }
      return `${key}=${params[key]}`;
    } else if (value) {
      return `${key}=${params[key]}`;
    } else {
      return "";
    }
  }).filter((e) => e.length);
  let paramsURLs = paramsArray.filter((e) => e).join("&");
  if (paramsURLs) {
    return url + "?" + paramsURLs;
  }
  return url;
};
class FetchService {
  constructor(fetchTypeValue = "json") {
    __publicField(this, "authStatusCodes", [401, 403, 404]);
    __publicField(this, "authErrorURLs", [
      "/auth/signin-with-phone",
      "/auth/signin-with-email"
    ]);
    __publicField(this, "_fetchType");
    this._fetchType = fetchTypeValue;
  }
  configureAuthorization(config) {
    let accessToken = Cookies.get("token") || "";
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  setHeader(config) {
    config.headers = {};
  }
  setDefaultHeaders(config) {
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  checkToLogOutOrNot(path) {
    return this.authErrorURLs.some(
      (arrayUrl) => path.includes(arrayUrl)
    );
  }
  isAuthRequest(path) {
    return this.authErrorURLs.includes(path);
  }
  async refreshAccessToken() {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      window.location.href = "/";
      return null;
    }
    try {
      const response = await fetch(
        "https://dev-api-b2b-nyatech.workr.in/v1.0/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken })
        }
      );
      if (!response.ok) {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/";
        return null;
      }
      const data = await response.json();
      Cookies.set("token", data.accessToken);
      return data.accessToken;
    } catch (error) {
      window.location.href = "/";
      return null;
    }
  }
  async hit(...args) {
    let [path, config] = args;
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"]) {
      this.setDefaultHeaders(config);
    }
    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config);
    }
    let url = "https://dev-api-b2b-nyatech.workr.in/v1.0" + path;
    let response = await fetch(url, config);
    if (!response.ok) {
      if (response.status === 401 && !this.checkToLogOutOrNot(path)) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          config.headers["Authorization"] = "Bearer " + newToken;
          response = await fetch(url, config);
        }
      }
      if (this.authStatusCodes.includes(response.status) && !this.checkToLogOutOrNot(path)) {
        const contentType2 = response.headers.get("Content-Type") || "";
        let errorData2;
        try {
          errorData2 = contentType2.includes("text/html") ? await response.text() : await response.json();
        } catch {
          errorData2 = { message: response.statusText };
        }
        return {
          success: false,
          status: response.status,
          data: errorData2,
          message: response.statusText
        };
      }
      const contentType = response.headers.get("Content-Type") || "";
      let errorData;
      try {
        errorData = contentType.includes("text/html") ? await response.text() : await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      let err = new Error(errorData.message || response.statusText);
      err.data = errorData;
      err.status = response.status;
      throw err;
    }
    if (this._fetchType === "response") {
      return response;
    } else {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("text/html")) {
        return {
          success: true,
          status: response.status,
          data: await response.text()
        };
      }
      return {
        success: true,
        status: response.status,
        data: await response.json()
      };
    }
  }
  async post(url, payload) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : void 0
    });
  }
  async postFormData(url, file) {
    return await this.hit(url, {
      method: "POST",
      body: file
    });
  }
  async get(url, queryParams = {}, contentType) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams);
    }
    const config = {
      method: "GET",
      headers: {}
    };
    this.setDefaultHeaders(config);
    if (contentType) {
      config.headers["Content-Type"] = contentType;
      config.headers["Accept"] = contentType;
    }
    return this.hit(url, config);
  }
  async delete(url, payload = {}) {
    return this.hit(url, {
      method: "DELETE",
      body: JSON.stringify(payload)
    });
  }
  async deleteWithOutPayload(url) {
    return this.hit(url, {
      method: "DELETE"
    });
  }
  async put(url, payload = {}) {
    return this.hit(url, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }
  async patch(url, payload = {}) {
    return this.hit(url, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
  }
}
const $fetch = new FetchService();

export { $fetch as $ };
//# sourceMappingURL=fetch-Cpm1bFFM.mjs.map
