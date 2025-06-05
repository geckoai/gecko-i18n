import { Container, ViewModel } from '@geckoai/gecko-core';
export declare class I18nService {
    private container;
    vm: ViewModel<string>;
    constructor(container: Container);
    setDefault(lang: string): void;
}
