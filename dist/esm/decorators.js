import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
import { createElement, Suspense } from "react";
import { useService } from "@geckoai/platform-react";
import { I18nService } from "./i18n-service";
import { Await } from 'react-router';
export class I18nDecorate extends ClassDecorate {
}
export class I18nElementDecorate extends ClassDecorate {
}
export function I18nMap(locales) {
    const decorators = [];
    locales.forEach((locale) => {
        decorators.push(ClassMirror.createDecorator(new I18nDecorate(locale)));
    });
    if (locales.find(it => typeof it.locale === 'function')) {
        decorators.push(ClassMirror.createDecorator(new I18nElementDecorate((({ children }) => {
            const service = useService(I18nService);
            service.config.current.asState();
            return createElement(Suspense, {
                fallback: createElement("div", {
                    children: 'Loading...'
                }),
                children: createElement(Await, {
                    resolve: service.load(),
                    children
                })
            });
        }))));
    }
    return ApplyClassDecorators(...decorators);
}
