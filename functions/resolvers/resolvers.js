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

          console.log(posts)
          const result = {
            ...doc.data(),
            id: doc.id,
            posts: posts.map((doc) => doc.data()),
          }
          // console.log(result)
          return result
        }))
    },
    posts: () => {
      return admin
        .firestore()
        .collection('posts')
        .get()
        .then((data) => data.docs.map((doc) => {
          const result = { ...doc.data(), id: doc.id }
          return result
        }))
    },
  },
}

module.exports = resolvers
