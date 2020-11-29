const Users = require('../models/user');
const Posts = require('../models/post');
const Comments = require('../models/comment');
const user = require('../models/user');


module.exports =  {
    Query: {
        getUser: async (parent, args) => {
            return await Users.findById(args.id);
        },
        getPost: async (parent, args) => {
            return await Posts.findById(args.id);
        },
        getComment: async (parent, args) => {
            return await Comments.findById(args.id);
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = new Users({
                firstName: args.firstName,
                secondName: args.secondName,
                mail: args.mail,
                avatar: args.avatar
            });
            return await user.save();
        },

        addPost: async (parent, args) => {
            const post = new Posts({
                author_id: args.author_id,
                title: args.title,
                text: args.text,
                date: new Date().toISOString()
            });
            return await post.save();
        },

        addComment: async (parent, args) => {
            const comment = new Comments({
                post_id: args.post_id,
                author_id: args.author_id,
                text: args.text,
                parend_id: args.parend_id,
                date: new Date().toISOString()
            });
            await comment.save();
            if (args.parend_id != 0){
                await Comments.findByIdAndUpdate(
                    args.parend_id,
                    {$push: {answers_id: comment._id}},
                    { new: true }
                )
            };
            return comment;
        },

        deleteUser: async (parent, args) => {
            if (args.id === args.customer){
                return await Users.findByIdAndRemove(args.id);
            }
            else {
                return null
            }
        },

        deletePost: async (parent, args) => {
            let post = await Posts.findById(args.id);
            let post_author = post.author_id;
            if (args.customer == post_author){
                return await Posts.findByIdAndRemove(args.id);
            }
            else {
                return null;
            }
        },

        deleteComment: async (parent, args) => {
            let comment = await Comments.findById(args.id);
            let post = await Posts.findById(comment.post_id);
            if (args.customer == post.author_id || args.customer == comment.author_id){
                return await Comments.findByIdAndRemove(args.id);
            }
            else {
                return null
            }
        },

        updateUser: async (parent, args) => {
            if (args.id == args.customer){
                let user = await Users.findById(args.id);
                return await Users.findByIdAndUpdate(
                    args.id,
                    { $set: {
                        firstName: (args.firstName ? args.firstName : user.firstName),
                        secondName: (args.secondName ? args.secondName : user.secondName),
                        mail: (args.mail ? args.mail : user.mail),
                        avatar: (args.avatar ? args.avatar : user.avatar)
                    }},
                    { new: true }
                )
            }
            else {
                return null;
            }
        },

        updatePost: async (parent, args) => {
            let post = await Posts.findById(args.id);
            let post_author = post.author_id;
            if (args.customer == post_author){
                return await Posts.findByIdAndUpdate(
                    args.id,
                    { $set: {
                        title: (args.title ? args.title : post.title),
                        text: (args.text ? args.text : post.text),
                    }},
                    { new: true }
                )
            }
            else {
                return null;
            }
        },

        updateComment: async (parent, args) => {
            let comment = await Comments.findById(args.id);
            let post = await Posts.findById(comment.post_id);
            if (args.customer == post.author_id || args.customer == comment.author_id){
                return await Comments.findByIdAndUpdate(
                    args.id,
                    { $set: {
                        text: (args.text ?  args.text : comment.text),
                    }},
                    { new: true }
                )
            }
            else {
                return null;
            }
        }
    }
};