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
const base_controller_1 = __importDefault(require("./base_controller"));
//const studentController = new BaseController<IUser>(User)
class UserController extends base_controller_1.default {
    constructor() {
        super(user_model_1.default);
    }
    put(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let item = yield this.ItemModel.findById(req.params.id);
                item.name = req.body.name;
                item.email = req.body.email;
                item.age = req.body.age;
                item.imgUrl = req.body.imgUrl;
                req.body = item;
                _super.post.call(this, req, res);
            }
            catch (err) {
                console.log("The error in updating user is: " + err);
                res.status(400).send(err.message);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user_controller.js.map