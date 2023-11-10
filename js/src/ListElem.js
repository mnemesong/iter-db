"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListElem = void 0;
var ListElem = /** @class */ (function () {
    function ListElem(val) {
        var _this = this;
        this.getVal = function () { return _this.val; };
        this.goNext = function () { return _this.next; };
        this.setNext = function (l) {
            _this.next = l;
            return _this;
        };
        this.val = val;
    }
    return ListElem;
}());
exports.ListElem = ListElem;
