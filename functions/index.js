const functions = require('firebase-functions')
const express = require('express')
const admin = require('firebase-admin')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs/typeDefs')
const resolvers = require('./resolvers/resolvers')

const serviceAccount = require('./gql-practice-firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app, path: '/', cors: true })

exports.graphql = functions.https.onRequest(app)
