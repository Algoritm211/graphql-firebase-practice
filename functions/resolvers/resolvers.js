const admin = require('firebase-admin')

const resolvers = {
  Query: {
    contacts: () => {
      return admin
        .firestore()
        .collection('contacts')
        .get()
        .then((data) => data.docs.map(async (doc) => {
          const postsPromise = doc.data().posts.map((postDoc) => {
            const post = postDoc.get()
            return post
          })

          const posts = await Promise.all(postsPromise)

          const result = {
            ...doc.data(),
            id: doc.id,
            posts: posts.map((doc) => doc.data()),
          }
          return result
        }))
    },
  },
  Mutation: {
    createContact: async (_, { input: contactObj }) => {
      const collection = admin
        .firestore()
        .collection('contacts')

      const newObj = await collection.add({ ...contactObj, posts: [] })
      const data = await newObj.get().then((snap) => snap.data())
      return data
    },
  },
}

module.exports = resolvers
