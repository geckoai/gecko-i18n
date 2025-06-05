import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
import { GeckoLazyTaskDecorate } from '@geckoai/gecko-router';
import { I18nService } from './i18n-service';

export class I18nDecorate extends ClassDecorate<I18nDoc> {
}

export function I18nMap(locales: Array<I18nDoc | I18nLazyDoc>): ClassDecorator {

  const decorators: ClassDecorator[] = [];

  locales.forEach((locale) => {
    decorators.push(
      ClassMirror.createDecorator(new I18nDecorate(locale))
    );

    const call = locale.locale;

    if (typeof call === 'function') {
      decorators.push(ClassMirror.createDecorator(new GeckoLazyTaskDecorate(async (c) => {
        const service = c.get(I18nService);
        const language = service.vm.current;
        if (locale.lang === language) {
          locale.locale = await call();
        }
      })));
    }
  });

  return ApplyClassDecorators(...decorators);
}

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