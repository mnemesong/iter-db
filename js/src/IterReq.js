"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqIterBodyStruct = exports.reqIterStruct = void 0;
var superstruct_1 = require("superstruct");
exports.reqIterStruct = (0, superstruct_1.object)({
    iter: (0, superstruct_1.string)(),
    req: (0, superstruct_1.union)([
        (0, superstruct_1.object)({ batchNew: (0, superstruct_1.number)() }),
        (0, superstruct_1.object)({ oneNew: (0, superstruct_1.literal)(true) }),
        (0, superstruct_1.object)({ again: (0, superstruct_1.literal)(true) })
    ])
});
exports.reqIterBodyStruct = (0, superstruct_1.union)([
    (0, superstruct_1.object)({
        authToken: (0, superstruct_1.string)(),
        req: exports.reqIterStruct
    }),
    (0, superstruct_1.object)({
        authToken: (0, superstruct_1.string)(),
        set: (0, superstruct_1.any)()
    }),
    (0, superstruct_1.object)({
        authToken: (0, superstruct_1.string)(),
        reg: (0, superstruct_1.literal)(true)
    })
]);
