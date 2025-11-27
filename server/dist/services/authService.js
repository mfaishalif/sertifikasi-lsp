"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository = __importStar(require("../repositories/authRepository"));
const SALT_ROUNDS = 10;
const login = (username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    if (role === 'admin') {
        user = yield authRepository.findAdminByUsername(username);
    }
    else {
        user = yield authRepository.findPeminjamByUsername(username);
    }
    if (!user) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }
    const dbPassword = role === 'admin' ? user.passAdmin : user.passPeminjam;
    const match = yield bcrypt_1.default.compare(password, dbPassword);
    if (!match) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }
    const token = jsonwebtoken_1.default.sign({ id: role === 'admin' ? user.idAdmin : user.idPeminjam, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, user };
});
exports.login = login;
const register = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, SALT_ROUNDS);
    const existingUser = yield authRepository.findPeminjamByUsername(data.username);
    if (existingUser) {
        throw { statusCode: 400, message: 'Username already exists' };
    }
    const newUser = yield authRepository.createPeminjam({
        namaPeminjam: data.nama,
        userPeminjam: data.username,
        passPeminjam: hashedPassword,
        fotoPeminjam: file ? file.filename : null,
    });
    return newUser;
});
exports.register = register;
