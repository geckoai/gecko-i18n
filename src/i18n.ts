import { Constants, Container, GeckoModule } from '@geckoai/gecko-core';
import { I18nDecorate, I18nLocale } from './decorators';
import { useContainer } from '@geckoai/gecko-router';
import { ClassMirror } from '@geckoai/class-mirror';
import { I18nService } from './i18n-service';

@GeckoModule
export class GeckoI18n {
  public static token = Symbol.for('GeckoI18n');
  public static default = Symbol.for('default');

  public constructor(container: Container) {
    const parent = container.get<Container>(Constants.parent);
    const classMirror = parent.get(ClassMirror);
    const decorates = classMirror.getAllDecorates(I18nDecorate);
    if(!container?.isBound(GeckoI18n.default)) {
      const service = container.get<I18nService>(I18nService);
      const find = decorates.find(({ metadata }) => metadata.default);
      if (find) {
        service.setDefault(find.metadata.lang);
      } else if (decorates[0]) {
        service.setDefault(decorates[0].metadata.lang);
      }
    }
    decorates.map((decorate) => {
      parent?.bind(GeckoI18n.token).toDynamicValue(() => decorate.metadata.locale).whenNamed(decorate.metadata.lang);
    });
  }

  public static loader<T = I18nLocale>(url: string) {
    return async (): Promise<T> => {
      try {
        const result = await fetch(url);
        return result.json();
      } catch {
        return {} as T;
      }
    };
  }
}

export function useI18n(language?: string): I18nLocale | undefined {
  const container = useContainer();
  const service = container.get<I18nService>(I18nService);
  const [lang] = service.vm.asState();
  try {
    if (!language) {
      return container?.get(GeckoI18n.token, { name: lang });
    }
    return container?.get(GeckoI18n.token, { name: language });
  } catch {
    return container?.get(GeckoI18n.token, {
      name: container.get(GeckoI18n.default)
    });
  }
}