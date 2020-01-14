import firebase from 'firebase';

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
  },

  async getPosts() {
    const createPost = (userUid, username, postId, post) => ({
      userUid,
      username,
      post: {
        id: postId,
        ...post
      }
    });

    const posts = [];

    await this.db
      .collectionGroup('posts')
      .orderBy('created_at', 'desc')
      .get()
      .then(function(querySnapshot) {
        posts.push(
          ...querySnapshot.docs.map(doc =>
            createPost(doc.data().userUid, doc.data().username, doc.id, doc.data())
          )
        );
      });

    return posts;
  },

  async setUser(user) {
    const users = this.collection('users');
    const uid = user.uid;
    delete user.uid;
    users.doc(uid).set(user);
  },

  async getUser(uid) {
    const users = this.collection('users');

    return users.doc(uid).get();
  },

  async updateUser(uid, userData) {
    const users = this.collection('users');
    await users.doc(uid).update(userData);
  },

  async setPost(userUid, username, post) {
    const posts = this.collection('users')
      .doc(userUid)
      .collection('posts');

    await posts.add({
      ...post,
      userUid,
      username,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
};

export default database;
