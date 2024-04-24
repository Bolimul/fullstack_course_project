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
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const testUser = {
    _id: null,
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    imgUrl: "url",
    accessToken: null
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield post_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ email: testUser.email });
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
describe("Post tests", () => {
    test("Test Post get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/post").set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    }));
    const post = {
        creator_id: testUser._id,
        post_id: null,
        post_title: "this is my post title",
        post_text: "this is my post about ...",
        imgUrl: "url"
    };
    const updatedPost = {
        post_title: "This is my updated text post about ...",
        post_text: "This is my updated post title ...",
        imgUrl: "url1"
    };
    test("POST new post to empty collection", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/post").set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
        post.post_id = res.body._id;
    }));
    test("GET specific post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data.post_title).toEqual(post.post_title);
        expect(data.post_text).toEqual(post.post_text);
    }));
    test("PUT specific post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield (0, supertest_1.default)(app).put("/post/" + post.post_id).send(updatedPost).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201);
        expect(res.body.post_text).toEqual(updatedPost.post_text);
        expect(res.body.post_title).toEqual(updatedPost.post_title);
    }));
    test("DELETE /post - delete post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
    }));
    test("GET unexisting post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    }));
});
//# sourceMappingURL=post.test.js.map