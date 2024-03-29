
import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import {Express} from "express";

let app: Express;
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});


describe("Post tests", () => {
    test("Test Post get all", async() => {
        const res = await request(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });
});