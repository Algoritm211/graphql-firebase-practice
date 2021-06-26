const functions = require('firebase-functions')
const express = require('express')
const admin = require('firebase-admin')
const { ApolloServer, gql } = require('apollo-server-express')

const serviceAccount = require('./gql-practice-firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const typeDefs = gql`
  type Contact {
    favorite: Boolean
    first_name: String
    id: String
    last_name: String
    profile_pic: String
    url: String
  }
  
  type Query {
    contacts: [Contact]
  }
`

const resolvers = {
  Query: {
    contacts: () => {
      return admin
        .firestore()
        .collection('contacts')
        .get()
        .then((data) => data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        }))
    },
  },
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)

