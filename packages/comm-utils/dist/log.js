"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const log = (...args) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...args);
    }
};
exports.log = log;
