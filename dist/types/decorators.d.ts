import { ClassDecorate } from '@geckoai/class-mirror';
export declare class I18nDecorate extends ClassDecorate<I18nDoc> {
}
export declare function I18nMap(locales: Array<I18nDoc | I18nLazyDoc>): ClassDecorator;
export interface I18nLocale {
    [key: string]: any;
}
export type I18nLazyLoader = () => Promise<I18nLocale>;
export interface I18nDoc {
    lang: string;
    default?: boolean;
    locale: I18nLocale;
}
export interface I18nLazyDoc {
    lang: string;
    default?: boolean;
    locale: I18nLazyLoader;
}
