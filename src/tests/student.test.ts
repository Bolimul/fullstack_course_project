
import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import Student from "../models/student_model";
import {Express} from "express";

let app: Express;
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
    await Student.deleteMany();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});
const students = [
    {
        name: "John Doe",
        _id: "12345",
        age:22
    },

    {
        name: "Jane Doe 2",
        _id: "12346",
        age:22
    }
]

describe("Student tests", () => {
    test("Test Student get all", async() => {
        const res = await request(app).get("/student");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test('POST /student', async() => {
        const res  =await request(app)
        .post('/student')
        .send(students[0]);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(students[0].name);

        const res2 = await request(app).get("/student");
        expect(res2.statusCode).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe(students[0].name);
        expect(data[0].age).toBe(students[0].age);
        expect(data[0]._id).toBe(students[0]._id);
    })

    test("GET /student/:id", async () => {
        const res = await request(app).get("/student/" + students[0]._id);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe(students[0].name);
        expect(res.body.age).toBe(students[0].age);
        expect(res.body._id).toBe(students[0]._id);
    })


});