"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDb = void 0;
var ListElem_1 = require("./ListElem");
var ListIter_1 = require("./ListIter");
var uuid_1 = require("uuid");
var ListDb = /** @class */ (function () {
    function ListDb() {
        var _this = this;
        this.iters = {};
        this.first = null;
        this.last = null;
        this.cnt = 0;
        this.push = function (val) {
            if (_this.first === null) {
                _this.first = new ListElem_1.ListElem(val);
                _this.last = _this.first;
                _this.cnt = 1;
            }
            else {
                _this.last = _this.last.setNext(new ListElem_1.ListElem(val)).goNext();
                _this.cnt++;
            }
            return _this;
        };
        this.clean = function () {
            delete _this.iters;
            delete _this.first;
            _this.iters = {};
            _this.first = null;
            _this.last = null;
            _this.cnt = 0;
            return _this;
        };
        this.regIter = function () {
            var id = (0, uuid_1.v4)();
            _this.iters[id] = new ListIter_1.ListIter(_this.first, 0);
            return id;
        };
        this.getIter = function (id) {
            var iter = _this.iters[id];
            if (!iter)
                return null;
            return iter;
        };
        this.getCount = function () { return _this.cnt; };
    }
    return ListDb;
}());
exports.ListDb = ListDb;
