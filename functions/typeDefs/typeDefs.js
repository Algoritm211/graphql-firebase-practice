const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    body: String
    user: Contact
  }

  type Contact {
    favorite: Boolean
    first_name: String
    id: ID
    last_name: String
    profile_pic: String
    url: String
    posts: [Post]
  }

  input ContactsInput {
    favorite: Boolean
    first_name: String!
    id: ID
    last_name: String!
    profile_pic: String
    url: String
    posts: [PostInput]
  }

  input PostInput {
    id: ID
    title: String!
    body: String!
    user: ContactsInput!
  }

  type Query {
    getContacts: [Contact]
    getPosts: [Post]
  }

  type Mutation {
    createContact(input: ContactsInput): Contact
  }
`

module.exports = typeDefs
