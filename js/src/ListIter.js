"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIter = void 0;
var ListIter = /** @class */ (function () {
    function ListIter(l, n) {
        var _this = this;
        this.readed = false;
        this.read = function () {
            _this.readed = true;
            return _this.ref.getVal();
        };
        this.next = function () {
            _this.ref = _this.ref.goNext();
            _this.n++;
            _this.readed = false;
            return _this;
        };
        this.isFinish = function () {
            return _this.ref === null;
        };
        this.hasNext = function () {
            return !!_this.ref.goNext();
        };
        this.isReaded = function () { return _this.readed; };
        this.timestamp = function () { return _this.ref.getTimestamp(); };
        this.num = function () { return _this.n; };
        this.ref = l;
        this.n = Math.round(n);
    }
    return ListIter;
}());
exports.ListIter = ListIter;
