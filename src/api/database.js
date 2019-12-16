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
            createPost(
              doc.data().userUid,
              doc.data().username,
              doc.id,
              doc.data()
            )
          )
        );
      });
    return posts;
  },

  async getLikes(postId, userId) {
    const createLikes = (likeId, userId, postId) => ({
      likeId,
      userId,
      postId
    });

    const likes = [];

    await this.db
      .collection('likes')
      .where('postId', '==', postId)
      .get()
      .then(function(querySnapshot) {
        likes.push(
          ...querySnapshot.docs.map(doc =>
            createLikes(doc.id, doc.data().userId, doc.data().postId)
          )
        );
      });
    return likes;
  },

  async getComments(postId) {
    const createComments = (commentId, userId, postId, content) => ({
      commentId,
      userId,
      postId,
      content
    });

    const comments = [];

    await this.db
      .collection('comments')
      .where('postId', '==', postId)
      .get()
      .then(function(querySnapshot) {
        comments.push(
          ...querySnapshot.docs.map(doc =>
            createComments(
              doc.id,
              doc.data().userId,
              doc.data().postId,
              doc.data().content
            )
          )
        );
      });
    return comments;
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
  },

  async setLike(userId, postId) {
    const likes = this.collection('likes');

    await likes.add({
      postId,
      userId,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  async setComment(postId, userId, content) {
    const comments = this.collection('comments');

    await comments.add({
      postId,
      userId,
      content,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
};

export default database;
