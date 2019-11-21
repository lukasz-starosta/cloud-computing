const database = {
  initialize(db) {
    this.db = db;
  },
  get instance() {
    return this.db;
  },
  collection(collectionName) {
    return this.db.collection(collectionName);
  },
  getAllFromCollection(collectionName) {
    return this.collection(collectionName).get();
  }
};

export default database;
