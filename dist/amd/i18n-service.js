var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@geckoai/gecko-core", "./i18n"], function (require, exports, gecko_core_1, i18n_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.I18nService = void 0;
    var I18nService = (function () {
        function I18nService(container) {
            var _a;
            this.container = container;
            this.vm = gecko_core_1.ViewModel.for((_a = localStorage.getItem('gecko-i18n-language')) !== null && _a !== void 0 ? _a : window.navigator.language);
            this.vm.subscribe(function (language) {
                localStorage.setItem('gecko-i18n-language', language);
            });
        }
        I18nService.prototype.setDefault = function (lang) {
            this.container.bind(i18n_1.GeckoI18n.default).toConstantValue(lang);
        };
        I18nService = __decorate([
            (0, gecko_core_1.injectable)(),
            __metadata("design:paramtypes", [gecko_core_1.Container])
        ], I18nService);
        return I18nService;
    }());
    exports.I18nService = I18nService;
});
