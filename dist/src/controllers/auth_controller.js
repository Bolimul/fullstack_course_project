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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const email = req.body.email;
    const name = req.body.name;
    const age = req.body.age;
    const imgUrl = req.body.imgUrl;
    const password = req.body.password;
    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(200).send("user already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({
            'name': name,
            'age': age,
            'email': email,
            'imgUrl': imgUrl,
            'password': hashedPassword
        });
        return res.status(200).send(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});
const generateTokens = (userId) => {
    const token = jsonwebtoken_1.default.sign({ _id: userId }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET);
    return {
        accessToken: token,
        refreshToken: refreshToken
    };
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(400).send("invalid user or password");
        }
        const validPassword = bcrypt_1.default.compare(password, user.password);
        if (validPassword == null) {
            return res.status(400).send("invalid user or password");
        }
        const { accessToken, refreshToken } = generateTokens(user._id.toString());
        if (user.tokens == null) {
            user.tokens = [refreshToken.toString()];
        }
        else {
            user.tokens.push(refreshToken.toString());
        }
        yield user.save();
        return res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});
const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if (refreshToken == null) {
        return res.status(401).send("missing token");
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send("invalid token");
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (!user.tokens == null || !user.tokens.includes(refreshToken)) {
                user.tokens = [];
                yield user.save();
                return res.status(401);
            }
            else {
                user.tokens = user.tokens.filter(token => token !== refreshToken);
                yield user.save();
                return res.status(200);
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }));
};
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //extract token from header
    const authHeader = req.headers['authorization'];
    const oldRefreshToken = authHeader && authHeader.split(' ')[1];
    if (oldRefreshToken == null) {
        return res.status(401).send("missing token");
    }
    //verify token
    jsonwebtoken_1.default.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).send(err.name);
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(oldRefreshToken)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    yield user.save();
                }
                return res.status(403).send("invalid token");
            }
            //generate new refresh token
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            //update refresh token in db
            user.tokens = user.tokens.filter(token => token !== oldRefreshToken);
            user.tokens.push(refreshToken.toString());
            yield user.save();
            //return new access token & new refresh token
            return res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken.toString() });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }));
});
exports.default = {
    register,
    login,
    logout,
    refresh
};
//# sourceMappingURL=auth_controller.js.map