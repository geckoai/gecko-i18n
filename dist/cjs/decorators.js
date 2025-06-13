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
import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
import { createElement, Suspense } from "react";
import { useService } from "@geckoai/platform-react";
import { I18nService } from "./i18n-service";
import { Await } from 'react-router';
var I18nDecorate = (function (_super) {
    __extends(I18nDecorate, _super);
    function I18nDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return I18nDecorate;
}(ClassDecorate));
export { I18nDecorate };
var I18nElementDecorate = (function (_super) {
    __extends(I18nElementDecorate, _super);
    function I18nElementDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return I18nElementDecorate;
}(ClassDecorate));
export { I18nElementDecorate };
export function I18nMap(locales) {
    var decorators = [];
    locales.forEach(function (locale) {
        decorators.push(ClassMirror.createDecorator(new I18nDecorate(locale)));
    });
    if (locales.find(function (it) { return typeof it.locale === 'function'; })) {
        decorators.push(ClassMirror.createDecorator(new I18nElementDecorate((function (_a) {
            var children = _a.children;
            var service = useService(I18nService);
            service.config.current.asState();
            return createElement(Suspense, {
                fallback: createElement("div", {
                    children: 'Loading...'
                }),
                children: createElement(Await, {
                    resolve: service.load(),
                    children: children
                })
            });
        }))));
    }
    return ApplyClassDecorators.apply(void 0, decorators);
}
