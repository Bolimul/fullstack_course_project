
import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import {Express} from "express";
import User from '../models/user_model'

const testUser = {
    _id: null,
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    imgUrl: "url",
    accessToken: null
}

let app: Express;
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
    await User.deleteMany({email: testUser.email})
    await request(app).post("/auth/register").send(testUser)
    const res = await request(app).post("/auth/login").send(testUser)
    const user = await User.find({email: testUser.email})
    testUser.accessToken = res.body.accessToken
    testUser._id = user[0]._id.toString()
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});


describe("Post tests", () => {
    test("Test Post get all", async() => {
        const res = await request(app).get("/post").set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    const post = {
        creator_id: testUser._id,
        post_id: null,
        post_title: "this is my post title",
        post_text: "this is my post about ...",
        imgUrl: "url"
    }

    const updatedPost = {
        post_title: "This is my updated text post about ...",
        post_text: "This is my updated post title ...",
        imgUrl: "url1"
    }

    test("POST new post to empty collection", async () => {
        const res = await request(app).post("/post").set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
        post.post_id = res.body._id
    })

    test("GET specific post", async() => {
        const res = await request(app).get("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data.post_title).toEqual(post.post_title);
        expect(data.post_text).toEqual(post.post_text);
        
    });

    test("PUT specific post", async() => {
        const res = (await request(app).put("/post/" + post.post_id).send(updatedPost).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201);
        expect(res.body.post_text).toEqual(updatedPost.post_text);
        expect(res.body.post_title).toEqual(updatedPost.post_title);
    })

    test("DELETE /post - delete post", async () => {
        const res = await request(app).delete("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
    })

    test("GET unexisting post", async() => {
        const res = await request(app).get("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    })
});