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
  },

  async getAllFromSubcollection(parentCollection, subcollection) {
    const parents = await this.getAllFromCollection(parentCollection);
    const ids = parents.docs.map(doc => doc.id);

    const results = [];

    for (let i = 0; i < ids.length; i++) {
      const resultPromise = await this.getAllFromCollection(
        `${parentCollection}/${ids[i]}/${subcollection}`
      );
      results.push(...resultPromise.docs.map(doc => doc.data()));
    }

    return results;
  }
};

export default database;
