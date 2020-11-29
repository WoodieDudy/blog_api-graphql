const { ApolloServer, gql } = require('apollo-server');


module.exports = gql`

  type User {
    firstName: String,
    secondName: String,
    mail: String,
    avatar: String,
    _id: ID
  }

  type Post {
      author_id: ID,
      title: String,
      text: String,
      date: String,
      _id: ID
  }

  type Comment {
      post_id: ID,
      parent_id: ID,
      author_id: ID,
      text: String,
      date: String,
      answers_id: [String]
      _id: ID
  }


  type Query {
    getUser(id: ID!): User,
    getPost(id: ID!): Post,
    getComment(id: ID!): Comment
  }

  type Mutation {
    addUser(
        firstName: String!,
        secondName: String!,
        mail: String!,
        avatar: String!
    ): User,

    addPost(
        author_id: String!,
        title: String!,
        text: String!,
    ): Post,

    addComment(
        post_id: String!,
        author_id: String!,
        text: String!,
        parent_id: String = "0",
    ): Comment,

    deleteUser(
        id: ID!,
        customer: ID!
    ): User,

    deletePost(
        id: ID!,
        customer: ID!
    ): Post,

    deleteComment(
        id: ID!,
        customer: ID!
    ): Comment,

    updateUser(
        firstName: String,
        secondName: String,
        mail: String,
        avatar: String,
        customer: ID!,
        id: ID!
    ): User,

    updatePost(
        title: String,
        text: String,
        id: ID!,
        customer: ID!
    ): Post,

    updateComment(
        text: String,
        id: ID!,
        customer: ID!
    ): Comment
  }
`;
