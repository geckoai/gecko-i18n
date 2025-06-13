var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@geckoai/gecko-core", "@geckoai/platform-react"], function (require, exports, gecko_core_1, platform_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.I18nGlobalService = void 0;
    var DEFAULT = Symbol.for("I18nGlobalService.default");
    var I18nGlobalService = (function () {
        function I18nGlobalService(container, DEFAULT, ErrorBoundary, Loading) {
            var _a;
            this.container = container;
            this.DEFAULT = DEFAULT;
            this.ErrorBoundary = ErrorBoundary;
            this.Loading = Loading;
            this.current = platform_react_1.ViewModel.for((_a = localStorage.getItem('gecko-i18n-language')) !== null && _a !== void 0 ? _a : window.navigator.language);
            this.current.subscribe(function (language) {
                localStorage.setItem('gecko-i18n-language', language);
            });
        }
        I18nGlobalService_1 = I18nGlobalService;
        I18nGlobalService.DefaultProvide = function (defaultLanguage) {
            return gecko_core_1.ConstantValueProvider.create(DEFAULT, defaultLanguage);
        };
        I18nGlobalService.for = function (defaultLanguage, Loading, ErrorBoundary) {
            return gecko_core_1.FactoryProvider.create(I18nGlobalService_1, function (context) {
                return context && new I18nGlobalService_1(context === null || context === void 0 ? void 0 : context.get(gecko_core_1.Container), defaultLanguage, Loading, ErrorBoundary);
            });
        };
        var I18nGlobalService_1;
        I18nGlobalService = I18nGlobalService_1 = __decorate([
            (0, gecko_core_1.injectable)("Singleton"),
            __param(1, (0, gecko_core_1.inject)(DEFAULT)),
            __metadata("design:paramtypes", [gecko_core_1.Container, String, Object, Object])
        ], I18nGlobalService);
        return I18nGlobalService;
    }());
    exports.I18nGlobalService = I18nGlobalService;
});
