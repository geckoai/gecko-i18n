"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nService = void 0;
var gecko_core_1 = require("@geckoai/gecko-core");
var class_mirror_1 = require("@geckoai/class-mirror");
var decorators_1 = require("./decorators");
var platform_react_1 = require("@geckoai/platform-react");
var i18n_global_service_1 = require("./i18n-global-service");
var I18nService = (function () {
    function I18nService(container, config) {
        var _this = this;
        this.config = config;
        this.all = platform_react_1.ViewModel.for(new Map());
        var parent = container.get(gecko_core_1.Constants.parent);
        var classMirror = parent.get(class_mirror_1.ClassMirror);
        var decorates = classMirror.getAllDecorates(decorators_1.I18nDecorate);
        var map = new Map();
        decorates.forEach(function (decorate) {
            map.set(decorate.metadata.lang, decorate.metadata.locale);
        });
        this.all.next(map);
        this.locales = platform_react_1.ViewModel.for(I18nService_1.createProxy(this.all.value, config));
        var update = function () {
            _this.locales.next(I18nService_1.createProxy(_this.all.value, config));
        };
        this.all.subscribe(update);
        config.current.subscribe(update);
    }
    I18nService_1 = I18nService;
    I18nService.createProxy = function (target, config) {
        return new Proxy(target, {
            get: function (target, prop) {
                var _a, _b, _c;
                var keys = target.keys();
                var _default = (_a = target.get(config.DEFAULT)) !== null && _a !== void 0 ? _a : {};
                var _current = (_b = target.get(config.current.value)) !== null && _b !== void 0 ? _b : {};
                if (I18nService_1.__isObject(_default[prop])) {
                    var map_1 = new Map();
                    Array.from(keys).forEach(function (key) {
                        var _a;
                        map_1.set(key, (_a = target.get(key)) === null || _a === void 0 ? void 0 : _a[prop]);
                    });
                    return I18nService_1.createProxy(map_1, config);
                }
                return (_c = _current[prop]) !== null && _c !== void 0 ? _c : _default[prop];
            }
        });
    };
    I18nService.__isObject = function (v) {
        return typeof v === 'object' && v.constructor === Object;
    };
    I18nService.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, current, DEFAULT, languages, res;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.config, current = _a.current, DEFAULT = _a.DEFAULT;
                        languages = Array.from(new Set([DEFAULT, current.value]));
                        return [4, Promise.all(languages.map(function (it) {
                                var call = _this.all.value.get(it);
                                if (typeof call === "function") {
                                    return (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var value;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, call()];
                                                case 1:
                                                    value = _a.sent();
                                                    return [2, ({
                                                            language: it,
                                                            value: value,
                                                        })];
                                            }
                                        });
                                    }); })();
                                }
                                return null;
                            }).filter(Boolean))];
                    case 1:
                        res = _b.sent();
                        res.forEach(function (it) {
                            _this.all.value.set(it.language, it.value);
                            _this.all.next(_this.all.value);
                        });
                        return [2];
                }
            });
        });
    };
    var I18nService_1;
    I18nService = I18nService_1 = __decorate([
        (0, gecko_core_1.injectable)("Singleton"),
        __metadata("design:paramtypes", [gecko_core_1.Container, i18n_global_service_1.I18nGlobalService])
    ], I18nService);
    return I18nService;
}());
exports.I18nService = I18nService;
