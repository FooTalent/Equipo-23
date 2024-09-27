export const removeEmptyObjectFields = (obj) => {
    for (let key in obj) {
      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === "" ||
        (Array.isArray(obj[key]) && obj[key].length === 0) ||
        (typeof obj[key] === "object" && Object.keys(obj[key]).length === 0)
      ) {
        delete obj[key];
      }
    }
    return obj;
  }