"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterRespStruct = exports.iterRespValStruct = exports.iterRespValsStruct = exports.iterRespIdStruct = exports.iterRespIterStruct = exports.iterRespErrorStruct = void 0;
var superstruct_1 = require("superstruct");
exports.iterRespErrorStruct = (0, superstruct_1.object)({
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
exports.iterRespIterStruct = (0, superstruct_1.object)({
    iter: (0, superstruct_1.string)()
});
exports.iterRespIdStruct = (0, superstruct_1.object)({
    id: (0, superstruct_1.number)()
});
exports.iterRespValsStruct = (0, superstruct_1.object)({
    vals: (0, superstruct_1.array)((0, superstruct_1.object)({
        id: (0, superstruct_1.number)(),
        val: (0, superstruct_1.any)()
    }))
});
exports.iterRespValStruct = (0, superstruct_1.object)({
    val: (0, superstruct_1.nullable)((0, superstruct_1.object)({
        id: (0, superstruct_1.number)(),
        val: (0, superstruct_1.any)()
    }))
});
exports.iterRespStruct = (0, superstruct_1.union)([
    exports.iterRespErrorStruct,
    exports.iterRespIterStruct,
    exports.iterRespIdStruct,
    exports.iterRespValsStruct,
    exports.iterRespValStruct,
]);
