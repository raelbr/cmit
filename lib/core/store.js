class Store {
  values = {};
  set = (prop, value) => {
    this.values[prop] = value;
  };
  get = (prop) => this.values[prop];
  remove = (prop) => delete this.values[prop];
}

const store = new Store();

module.exports = store;
