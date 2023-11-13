"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRespStruct = exports.listRespValStruct = exports.listRespValsStruct = exports.listRespIdStruct = exports.listRespIterStruct = exports.listRespErrorStruct = void 0;
var superstruct_1 = require("superstruct");
exports.listRespErrorStruct = (0, superstruct_1.object)({
    error: (0, superstruct_1.union)([
        (0, superstruct_1.literal)("Invalid auth data"),
        (0, superstruct_1.literal)("Iter is not exists"),
        (0, superstruct_1.literal)("Invalid format of request"),
        (0, superstruct_1.literal)("Unexcepted error")
    ]),
    details: (0, superstruct_1.union)([
        (0, superstruct_1.string)(),
        (0, superstruct_1.literal)(undefined)
    ])
});
exports.listRespIterStruct = (0, superstruct_1.object)({
    iter: (0, superstruct_1.string)()
});
exports.listRespIdStruct = (0, superstruct_1.object)({
    id: (0, superstruct_1.number)()
});
exports.listRespValsStruct = (0, superstruct_1.object)({
    vals: (0, superstruct_1.array)((0, superstruct_1.object)({
        id: (0, superstruct_1.number)(),
        val: (0, superstruct_1.any)()
    }))
});
exports.listRespValStruct = (0, superstruct_1.object)({
    val: (0, superstruct_1.nullable)((0, superstruct_1.object)({
        id: (0, superstruct_1.number)(),
        val: (0, superstruct_1.any)()
    }))
});
exports.listRespStruct = (0, superstruct_1.union)([
    exports.listRespErrorStruct,
    exports.listRespIterStruct,
    exports.listRespIdStruct,
    exports.listRespValsStruct,
    exports.listRespValStruct,
]);
