"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDb = void 0;
var ListIter_1 = require("./ListIter");
var uuid_1 = require("uuid");
var ListDb = /** @class */ (function () {
    function ListDb() {
        var _this = this;
        this.iters = {};
        this.arr = { arr: [] };
        this.push = function (val) {
            var len = _this.arr.arr.push(val);
            return len - 1;
        };
        this.clean = function () {
            delete _this.iters;
            delete _this.arr;
            _this.iters = {};
            _this.arr = { arr: [] };
        };
        this.regIter = function () {
            var id = (0, uuid_1.v4)();
            _this.iters[id] = new ListIter_1.ListIter(_this.arr, 0);
            return id;
        };
        this.getCount = function () { return _this.arr.arr.length; };
        this.getIter = function (id) {
            if (_this.iters[id]) {
                return _this.iters[id];
            }
            return undefined;
        };
        this.dropIter = function (id) {
            if (_this.iters[id]) {
                delete _this.iters[id];
            }
        };
        this.serializeToJson = function () {
            var dataClone = __spreadArray([], _this.arr.arr, true);
            return JSON.stringify(dataClone);
        };
        this.parseFromJson = function (json) {
            _this.clean();
            var data = JSON.parse(json);
            if (!Array.isArray(data)) {
                throw new Error("parsed data is not array");
            }
            _this.arr.arr = data;
        };
    }
    return ListDb;
}());
exports.ListDb = ListDb;
