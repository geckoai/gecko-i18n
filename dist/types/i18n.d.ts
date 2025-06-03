import { Container } from '@geckoai/gecko-core';
import { I18nLocale } from './decorators';
export declare class GeckoI18n {
    static token: symbol;
    static default: symbol;
    constructor(container: Container);
    static loader<T = I18nLocale>(url: string): () => Promise<T>;
}
export declare function useI18n(language?: string): I18nLocale | undefined;
