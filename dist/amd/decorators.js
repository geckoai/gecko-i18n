var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@geckoai/class-mirror", "@geckoai/gecko-core", "react", "@geckoai/platform-react", "./i18n-service", "react-router"], function (require, exports, class_mirror_1, gecko_core_1, react_1, platform_react_1, i18n_service_1, react_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.I18nMap = exports.I18nElementDecorate = exports.I18nDecorate = void 0;
    var I18nDecorate = (function (_super) {
        __extends(I18nDecorate, _super);
        function I18nDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return I18nDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.I18nDecorate = I18nDecorate;
    var I18nElementDecorate = (function (_super) {
        __extends(I18nElementDecorate, _super);
        function I18nElementDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return I18nElementDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.I18nElementDecorate = I18nElementDecorate;
    function I18nMap(locales) {
        var decorators = [];
        locales.forEach(function (locale) {
            decorators.push(class_mirror_1.ClassMirror.createDecorator(new I18nDecorate(locale)));
        });
        if (locales.find(function (it) { return typeof it.locale === 'function'; })) {
            decorators.push(class_mirror_1.ClassMirror.createDecorator(new I18nElementDecorate((function (_a) {
                var _b;
                var children = _a.children;
                var service = (0, platform_react_1.useService)(i18n_service_1.I18nService);
                service.config.current.asState();
                return (0, react_1.createElement)(react_1.Suspense, {
                    fallback: service.config.Fallback ? (0, react_1.createElement)(service.config.Fallback) : (0, react_1.createElement)("div", {
                        children: 'Loading...'
                    }),
                    children: (0, react_1.createElement)(react_router_1.Await, {
                        resolve: service.load(),
                        errorElement: ((_b = service.config) === null || _b === void 0 ? void 0 : _b.ErrorBoundary) && (0, react_1.createElement)(service.config.ErrorBoundary),
                        children: children
                    })
                });
            }))));
        }
        return gecko_core_1.ApplyClassDecorators.apply(void 0, decorators);
    }
    exports.I18nMap = I18nMap;
});
