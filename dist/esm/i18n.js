var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GeckoI18n_1;
import { Constants, Container, GeckoModule } from '@geckoai/gecko-core';
import { I18nDecorate } from './decorators';
import { LazyService, useContainer } from '@geckoai/gecko-router';
import { ClassMirror } from '@geckoai/class-mirror';
import { I18nService } from './i18n-service';
let GeckoI18n = GeckoI18n_1 = class GeckoI18n {
    static token = Symbol.for('GeckoI18n');
    static default = Symbol.for('default');
    constructor(container) {
        const parent = container.get(Constants.parent);
        const classMirror = parent.get(ClassMirror);
        const decorates = classMirror.getAllDecorates(I18nDecorate);
        const service = container.get(I18nService);
        service.vm.subscribe((value) => {
            parent?.get(LazyService)?.vm.next(Date.now());
        });
        if (!container?.isBound(GeckoI18n_1.default)) {
            const find = decorates.find(({ metadata }) => metadata.default);
            if (find) {
                service.setDefault(find.metadata.lang);
            }
            else if (decorates[0]) {
                service.setDefault(decorates[0].metadata.lang);
            }
        }
        decorates.map((decorate) => {
            parent?.bind(GeckoI18n_1.token).toDynamicValue(() => decorate.metadata.locale).whenNamed(decorate.metadata.lang);
        });
    }
    static loader(url) {
        return async () => {
            try {
                const result = await fetch(url);
                return result.json();
            }
            catch {
                return {};
            }
        };
    }
};
GeckoI18n = GeckoI18n_1 = __decorate([
    GeckoModule,
    __metadata("design:paramtypes", [Container])
], GeckoI18n);
export { GeckoI18n };
export function useI18n(language) {
    const container = useContainer();
    const service = container.get(I18nService);
    const [lang] = service.vm.asState();
    try {
        if (!language) {
            return container?.get(GeckoI18n.token, { name: lang });
        }
        return container?.get(GeckoI18n.token, { name: language });
    }
    catch {
        return container?.get(GeckoI18n.token, {
            name: container.get(GeckoI18n.default)
        });
    }
}
