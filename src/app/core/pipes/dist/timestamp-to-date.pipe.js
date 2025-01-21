"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TimestampToDatePipe = void 0;
var core_1 = require("@angular/core");
var TimestampToDatePipe = /** @class */ (function () {
    function TimestampToDatePipe() {
    }
    TimestampToDatePipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        var date = new Date(value * 1000); // Convert timestamp to milliseconds
        return (this.leftPad(date.getDate(), 2) +
            '/' +
            this.leftPad(date.getMonth() + 1, 2) +
            '/' +
            date.getFullYear() +
            ' ' +
            this.leftPad(date.getHours(), 2) +
            ':' +
            this.leftPad(date.getMinutes(), 2));
    };
    TimestampToDatePipe.prototype.leftPad = function (number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    };
    TimestampToDatePipe = __decorate([
        core_1.Pipe({
            name: 'timestampToDate'
        })
    ], TimestampToDatePipe);
    return TimestampToDatePipe;
}());
exports.TimestampToDatePipe = TimestampToDatePipe;
