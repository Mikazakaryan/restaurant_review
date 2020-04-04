export default {
  set: (key, value) => {
    localStorage[key] = value;
    return localStorage[key];
  },

  setObject: (key, value) => {
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
  },

  get: (key, defaultValue) => localStorage[key] || defaultValue,

  getObject: key => JSON.parse(localStorage[key] || "{}"),

  clear: () => localStorage.clear(),

  remove: key => localStorage.removeItem(key)
};
