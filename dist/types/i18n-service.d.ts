import { Container } from '@geckoai/gecko-core';
export declare class I18nService {
    private container;
    private _subject;
    private current;
    constructor(container: Container);
    getLanguage(): string;
    setLanguage(language: string): void;
    asState(): [string, (state: string) => void];
}
