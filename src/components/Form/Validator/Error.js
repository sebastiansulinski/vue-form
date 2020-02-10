export default class Error {
  constructor() {
    this.clear();
  }

  set(errors) {
    this.errors = errors;
  }

  all() {
    return this.errors;
  }

  clear(field = null) {
    if (field) {
      delete this.errors[field];
    } else {
      this.errors = {};
    }
  }

  has(field, rule = null) {
    const hasProperty = this.errors.hasOwnProperty(field);

    if (rule === null) {
      return hasProperty;
    }

    return hasProperty && this.errors[field] === rule;
  }
}
