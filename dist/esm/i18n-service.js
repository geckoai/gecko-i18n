var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var I18nService_1;
import { Constants, Container, injectable } from '@geckoai/gecko-core';
import { ClassMirror } from "@geckoai/class-mirror";
import { I18nDecorate } from "./decorators";
import { ViewModel } from "@geckoai/platform-react";
import { I18nGlobalService } from "./i18n-global-service";
let I18nService = I18nService_1 = class I18nService {
    config;
    all = ViewModel.for(new Map());
    locales;
    constructor(container, config) {
        this.config = config;
        const parent = container.get(Constants.parent);
        const classMirror = parent.get(ClassMirror);
        const decorates = classMirror.getAllDecorates(I18nDecorate);
        const map = new Map();
        decorates.forEach((decorate) => {
            map.set(decorate.metadata.lang, decorate.metadata.locale);
        });
        this.all.next(map);
        this.locales = ViewModel.for(I18nService_1.createProxy(this.all.value, config));
        const update = () => {
            this.locales.next(I18nService_1.createProxy(this.all.value, config));
        };
        this.all.subscribe(update);
        config.current.subscribe(update);
    }
    static createProxy(target, config) {
        return new Proxy(target, {
            get(target, prop) {
                const keys = target.keys();
                const _default = target.get(config.DEFAULT);
                const _current = target.get(config.current.value);
                if (I18nService_1.__isObject(_default[prop])) {
                    const map = new Map();
                    Array.from(keys).forEach(key => {
                        map.set(key, target.get(key)?.[prop]);
                    });
                    return I18nService_1.createProxy(map, config);
                }
                return _current[prop] ?? _default[prop];
            }
        });
    }
    static __isObject(v) {
        return typeof v === 'object' && v.constructor === Object;
    }
    async load() {
        const { current, DEFAULT } = this.config;
        const languages = Array.from(new Set([DEFAULT, current.value]));
        const res = await Promise.all(languages.map(it => {
            const call = this.all.value.get(it);
            if (typeof call === "function") {
                return (async () => {
                    const value = await call();
                    return ({
                        language: it,
                        value,
                    });
                })();
            }
            return null;
        }).filter(Boolean));
        res.forEach((it) => {
            this.all.value.set(it.language, it.value);
            this.all.next(this.all.value);
        });
    }
};
I18nService = I18nService_1 = __decorate([
    injectable("Singleton"),
    __metadata("design:paramtypes", [Container, I18nGlobalService])
], I18nService);
export { I18nService };
