
import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import {Express} from "express";
import User from '../models/user_model'

let app: Express;
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
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

const testUser = {
    _id: null,
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    imgUrl: "url",
    accessToken: null
}

const updatedTestStudent = {
    name: "ASDFGh",
    age: "236",
    email: "updatedstudent@gmail.com",
    password: "123457",
    imgUrl: "url",
}

describe("Student tests", () => {
    test("GET /user/", async () => {
        const res = await request(app).get("/user").set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200)
        expect(res.body[2].name).toBe(testUser.name);
        expect(res.body[2].age).toBe(testUser.age);
        expect(res.body[2]._id).toBe(testUser._id);
    })

    test("GET /user/:id", async () => {
        const res = await request(app).get("/user/" + testUser._id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe(testUser.name);
        expect(res.body.age).toBe(testUser.age);
        expect(res.body._id).toBe(testUser._id);
    })

    test("PUT /user/:id", async () => {
        const res = (await request(app).put("/user/" + testUser._id).send(updatedTestStudent).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe(updatedTestStudent.name);
        expect(res.body.age).toBe(updatedTestStudent.age);
        expect(res.body.email).toBe(updatedTestStudent.email);
    })

    test("DELETE /user/:id", async () => {
        const res = (await request(app).delete("/user/" + testUser._id).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201)
    })


});