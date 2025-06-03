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
let I18nService = class I18nService {
    container;
    _subject = new Subject();
    current = localStorage.getItem('gecko-i18n-language') ?? window.navigator.language;
    constructor(container) {
        this.container = container;
        this._subject.subscribe((value) => {
            this.current = value;
            localStorage.setItem('gecko-i18n-language', value);
        });
        this._subject.next(this.current);
    }
    getLanguage() {
        return this.current;
    }
    setLanguage(language) {
        if (language != this.current) {
            const service = this.container.get(LazyService);
            this._subject.next(language);
            service.next();
        }
    }
    asState() {
        const [state, setState] = useState(this.current);
        useEffect(() => {
            const subscription = this._subject.subscribe(setState);
            return () => subscription.unsubscribe();
        }, [state, setState]);
        return [state, this.setLanguage.bind(this)];
    }
};
I18nService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [Container])
], I18nService);
export { I18nService };
