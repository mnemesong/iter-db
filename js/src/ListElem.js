"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListElem = void 0;
var ListElem = /** @class */ (function () {
    function ListElem(val) {
        var _this = this;
        this.getVal = function () { return _this.val; };
        this.goNext = function () { return _this.next; };
        this.setNext = function (l, t) {
            _this.next = l;
            _this.timestamp = t;
            return _this;
        };
        this.getTimestamp = function () { return _this.timestamp; };
        this.val = val;
    }
    return ListElem;
}());
exports.ListElem = ListElem;
