(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var Typewriter = /** @class */ (function () {
        function Typewriter(element, texts, waitTime) {
            this.element = element;
            this.texts = texts || [];
            this.current = 1;
            this.waitTime = waitTime || 2000;
        }
        Typewriter.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.element.innerText = this.texts[0] || '';
                            this.increment();
                            _a.label = 1;
                        case 1:
                            return [4 /*yield*/, this.swap()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Typewriter.prototype.swap = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wait(this.waitTime)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.clear()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.type(this.nextText())];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Typewriter.prototype.increment = function () {
            this.current++;
            if (this.current > this.texts.length) {
                this.current = 1;
            }
        };
        Typewriter.prototype.nextText = function () {
            var text = this.texts[this.current - 1];
            this.increment();
            return text;
        };
        Typewriter.prototype.text = function () {
            return this.element.innerText;
        };
        Typewriter.prototype.length = function () {
            return this.text().length;
        };
        Typewriter.prototype.append = function (text) {
            this.element.innerText += text;
            return this.wait(100);
        };
        Typewriter.prototype.backspace = function () {
            this.element.innerText = this.text().slice(0, -1);
            return this.wait(100);
        };
        Typewriter.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.length()) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.backspace()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        Typewriter.prototype.type = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!text.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.append(text[0])];
                        case 1:
                            _a.sent();
                            text = text.substring(1);
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        Typewriter.prototype.wait = function (milliseconds) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            setTimeout(resolve, milliseconds);
                        })];
                });
            });
        };
        return Typewriter;
    }());
    function Typewriter$1 (Alpine) {
        Alpine.directive('typewriter', function (el, _a, _b) {
            var expression = _a.expression, modifiers = _a.modifiers;
            var evaluate = _b.evaluate;
            var texts = evaluate(expression);
            if (!Array.isArray(texts)) {
                throw new Error('Please provide an array of strings.');
            }
            var timeModifiers = modifiers.filter(function (modifier) { return modifier.match(/^\d+m?s$/); });
            var latestTimeModifier = timeModifiers.pop();
            var milliseconds = null;
            if (latestTimeModifier) {
                if (latestTimeModifier.endsWith('ms')) {
                    milliseconds = parseInt(latestTimeModifier.match(/^(\d+)/)[1]);
                }
                else {
                    milliseconds = parseInt(latestTimeModifier.match(/^(\d+)s/)[1]) * 1000;
                }
            }
            new Typewriter(el, texts, milliseconds).start().then();
        });
    }

    document.addEventListener('alpine:init', function () {
        Typewriter$1(window.Alpine);
    });

}));
//# sourceMappingURL=alpine-typewriter.js.map
