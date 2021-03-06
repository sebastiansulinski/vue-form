import { Helper } from '@ssdcode/cms-partials';

export default class Rule {
  static required(value) {
    return !Helper.isEmpty(value);
  }

  static validateIfNotEmpty(value, callback) {
    if (Helper.isEmpty(value)) {
      return true;
    }

    return callback();
  }

  static min(value, params) {
    if (isFinite(value)) {
      return Number(value) >= params;
    }

    if (typeof value === 'string') {
      return Rule.validateIfNotEmpty(value, () => {
        return value.length >= params;
      });
    }

    return Object.keys(value).length >= params;
  }

  static max(value, params) {
    if (isFinite(value)) {
      return Number(value) <= params;
    }

    if (typeof value === 'string') {
      return Rule.validateIfNotEmpty(value, () => {
        return value.length <= params;
      });
    }

    return Object.keys(value).length <= params;
  }

  static email(value) {
    return Rule.validateIfNotEmpty(value, () => {
      const pattern = new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );
      return pattern.test(value);
    });
  }

  static password(value) {
    return Rule.validateIfNotEmpty(value, () => {
      const pattern = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,30}$'
      );
      return pattern.test(value);
    });
  }

  static accepted(value) {
    return ['yes', 'on', 1, '1', true].includes(value);
  }

  static in(value, params) {
    if (params.substring(0, 1) === '[') {
      params = JSON.parse(params);
    }
    return Rule.validateIfNotEmpty(value, () => {
      const values = params.split(',').map((item) => item.trim());

      try {
        (Array.isArray(value) ? value : new Array(value)).forEach((v) => {
          if (!values.includes(v.toString())) {
            throw new Error('Invalid selection');
          }
        });
      } catch (error) {
        return false;
      }

      return true;
    });
  }
}
