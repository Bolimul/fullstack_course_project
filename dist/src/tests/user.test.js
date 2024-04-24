"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    const user = yield user_model_1.default.find({ email: testUser.email });
    testUser.accessToken = res.body.accessToken;
    testUser._id = user[0]._id.toString();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
const testUser = {
    _id: null,
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    imgUrl: "url",
    accessToken: null
};
const updatedTestStudent = {
    name: "ASDFGh",
    age: "236",
    email: "updatedstudent@gmail.com",
    password: "123457",
    imgUrl: "url",
};
describe("Student tests", () => {
    test("Test Student get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data[0].name).toBe(testUser.name);
        expect(data[0].age).toBe(testUser.age);
        expect(data[0].email).toBe(testUser.email);
    }));
    test("GET /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/user/" + testUser._id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(testUser.name);
        expect(res.body.age).toBe(testUser.age);
        expect(res.body._id).toBe(testUser._id);
    }));
    test("PUT /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield (0, supertest_1.default)(app).put("/user/" + testUser._id).send(updatedTestStudent).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(updatedTestStudent.name);
        expect(res.body.age).toBe(updatedTestStudent.age);
        expect(res.body.email).toBe(updatedTestStudent.email);
    }));
    test("DELETE /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield (0, supertest_1.default)(app).delete("/user/" + testUser._id).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201);
    }));
});
//# sourceMappingURL=user.test.js.map