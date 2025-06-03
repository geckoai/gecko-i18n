var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Container, injectable } from '@geckoai/gecko-core';
import { Subject } from 'rxjs';
import { useEffect, useState } from 'react';
import { LazyService } from '@geckoai/gecko-router';
var I18nService = (function () {
    function I18nService(container) {
        var _this = this;
        var _a;
        this.container = container;
        this._subject = new Subject();
        this.current = (_a = localStorage.getItem('gecko-i18n-language')) !== null && _a !== void 0 ? _a : window.navigator.language;
        this._subject.subscribe(function (value) {
            _this.current = value;
            localStorage.setItem('gecko-i18n-language', value);
        });
        this._subject.next(this.current);
    }
    I18nService.prototype.getLanguage = function () {
        return this.current;
    };
    I18nService.prototype.setLanguage = function (language) {
        if (language != this.current) {
            var service = this.container.get(LazyService);
            this._subject.next(language);
            service.next();
        }
    };
    I18nService.prototype.asState = function () {
        var _this = this;
        var _a = useState(this.current), state = _a[0], setState = _a[1];
        useEffect(function () {
            var subscription = _this._subject.subscribe(setState);
            return function () { return subscription.unsubscribe(); };
        }, [state, setState]);
        return [state, this.setLanguage.bind(this)];
    };
    I18nService = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Container])
    ], I18nService);
    return I18nService;
}());
export { I18nService };
