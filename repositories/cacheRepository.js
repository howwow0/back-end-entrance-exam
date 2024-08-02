class CacheRepository {
  constructor() {
    this.cache = new Map();
    this.size = 100; // начальный размер кеша
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    if (this.cache.size >= this.size) {
      // удалить первый добавленный элемент (политику можно изменять)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }

  resize(newSize) {
    this.size = newSize;
    // если текущий кеш превышает новый размер, удалить избыточные элементы
    while (this.cache.size > newSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

module.exports = new CacheRepository();
