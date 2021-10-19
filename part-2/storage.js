const storage = {};

export function save(id, data) {
  storage[id] = data;
}

export function get(id) {
  return storage[id];
}

export function getAll() {
  return Object.values(storage);
}
