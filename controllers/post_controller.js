const Post = require("../models/post_model")

const getPosts = async (req, res) => {
    console.log("getPosts")
    try {
        if(req.params.id)
        {
            const post = await Post.findById(req.params.id)
        }
        else{
            const post = await Post.find()
        }
        
        res.status(200).send(post)   
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
    
}


const createPost = async (req, res) => {
    console.log("createPost")
    try {
        const new_post = await Post.create(req.body)
        res.status(201).send(new_post)   
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.post_title != req.body.post_title)
        {
            post.post_title = await req.body.post_title
        }  
        else if(post.post_text != req.body.post_text)
        {
            post.post_text = await req.body.post_text
        }
        post.save()
        res.status(201).send(post)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

const deletePost = async (req, res) => {
    console.log("deletePostById")
    try {
        await Post.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
    res.status(200).send()
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}
