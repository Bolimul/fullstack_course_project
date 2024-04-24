import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import {Express} from "express";
import fs from 'mz/fs'


let app: Express;
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

jest.setTimeout(30000)

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/avatar.png`;
        console.log(filePath)
        const rs = await fs.exists(filePath)
        if (rs) {
            const response = await request(app).post("/file/file" ).attach('file', filePath)
            expect(response.statusCode).toEqual(200);
        }
    })
   })