"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterIter = void 0;
var IterIter = /** @class */ (function () {
    function IterIter(arr, n) {
        var _this = this;
        this.readed = false;
        this.read = function () {
            if (!_this.isFinish()) {
                _this.readed = true;
                return _this.arr.arr[_this.n];
            }
            return undefined;
        };
        this.next = function () {
            _this.n++;
            _this.readed = false;
            return _this;
        };
        this.isFinish = function () {
            return _this.n >= _this.arr.arr.length;
        };
        this.isReaded = function () { return _this.readed; };
        this.num = function () { return _this.n; };
        this.arr = arr;
        this.n = Math.round(n);
    }
    return IterIter;
}());
exports.IterIter = IterIter;
