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
const user = {
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    imgUrl: "url",
};
let app;
let accessToken = "";
let refreshToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    user_model_1.default.deleteMany({ email: user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Auth tests", () => {
    test("Post /register", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    }));
    test("Post /login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res2.statusCode).toBe(200);
        const fakeToken = accessToken + '0';
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    }));
    jest.setTimeout(100000);
    const timeout = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    test("refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        //const accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        const refreshToken2 = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken2).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
        yield timeout(6000);
        const res4 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res4.statusCode).not.toBe(200);
    }));
    test("refresh token after expiration", () => __awaiter(void 0, void 0, void 0, function* () {
        yield timeout(6000);
        const res = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res.statusCode).not.toBe(200);
        const res1 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
    }));
    test("refresh token violation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield timeout(6000);
        const res1 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        const oldRefreshToken = refreshToken;
        if (oldRefreshToken == res1.body.refreshToken)
            console.log("refresh token is the same");
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + oldRefreshToken).send();
        expect(res2.statusCode).not.toBe(200);
        const res3 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res3.statusCode).not.toBe(200);
    }));
    test("logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/auth/logout").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=auth.test.js.map