"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = exports.parseBoolean = exports.parseDate = exports.stringLengthCheck = exports.isNumber = exports.isBoolean = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isBoolean = (value) => {
    return typeof value === 'boolean';
};
exports.isBoolean = isBoolean;
const isNumber = (value) => {
    return typeof value === 'number';
};
exports.isNumber = isNumber;
const stringLengthCheck = (text, length, subject) => {
    if (text.length < length) {
        console.log(`${subject} is too short, minimum length is ${length}.`);
        throw new Error(`${subject} is too short, minimum length is ${length}.`);
    }
    return true;
};
exports.stringLengthCheck = stringLengthCheck;
const parseDate = (date) => {
    if (!(0, exports.isString)(date) || !date) {
        console.log('parse Date Error * raw data:', date);
        throw new Error('Incorrect or missing date 5!');
    }
    return new Date(date);
};
exports.parseDate = parseDate;
const parseBoolean = (value) => {
    if (!(0, exports.isBoolean)(value)) {
        console.log('parse Boolean Error * raw data:', value);
        throw new Error('Incorrect or missing data - parseBoolean !');
    }
    return value;
};
exports.parseBoolean = parseBoolean;
const parseId = (id) => {
    if (!(0, exports.isNumber)(id)) {
        console.log('parse Id Error * raw data:', id);
        throw new Error('Incorrect or missing data - parseId !');
    }
    console.log('parse Id :', id);
    return id;
};
exports.parseId = parseId;
