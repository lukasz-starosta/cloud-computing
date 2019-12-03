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
    const parentPromise = await this.getAllFromCollection('users');
    const users = parentPromise.docs;
    const createPost = (username, postId, post) => ({
      username,
      post: {
        id: postId,
        ...post
      }
    });

    const posts = [];

    for (let i = 0; i < users.length; i++) {
      const resultPromise = await this.getAllFromCollection(
        `users/${users[i].id}/posts`
      );

      posts.push(
        ...resultPromise.docs.map(doc =>
          createPost(users[i].data().name, doc.id, doc.data())
        )
      );
    }

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

  async setPost(userUid, post) {
    const posts = this.collection('users')
      .doc(userUid)
      .collection('posts');

    posts.add({
      ...post,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
};

export default database;
