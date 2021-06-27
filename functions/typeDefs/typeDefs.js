const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Post {
    id: Int
    title: String
    body: String
    user: Contact
  }

  type Contact {
    favorite: Boolean
    first_name: String
    id: String
    last_name: String
    profile_pic: String
    url: String
    posts: [Post]
  }
  
  type Query {
    contacts: [Contact]
    posts: [Post]
  }
`

module.exports = typeDefs
