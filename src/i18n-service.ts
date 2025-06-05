import {Container, injectable, ViewModel} from '@geckoai/gecko-core';
import {GeckoI18n} from "./i18n";

@injectable("Singleton")
export class I18nService {
  public vm = ViewModel.for<string>(localStorage.getItem('gecko-i18n-language') ?? window.navigator.language)

  constructor(private container: Container) {
    this.vm.subscribe((language) => {
      localStorage.setItem('gecko-i18n-language', language);
    })
  }

  public setDefault(lang: string) {
    this.container.bind(GeckoI18n.default).toConstantValue(lang)
  }
}