/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/i18n-react RanYunLong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Constants, Container, Module} from '@geckoai/gecko-core';
import {ReactRouter, useService} from '@geckoai/platform-react';
import {I18nElementDecorate, I18nLocale} from './decorators';
import {I18nService} from "./i18n-service";
import {ClassMirror} from "@geckoai/class-mirror";

@Module({
  providers: [I18nService],
  exports: [I18nService]
})
export class I18nReact {
  constructor(container: Container) {
    const parent = container.get<Container>(Constants.parent);
    const classMirror = parent.get(ClassMirror);
    const decorates = classMirror.getAllDecorates(I18nElementDecorate);
    const isBound = parent.isBound(ReactRouter.middleElements);
    if (isBound) {
      parent?.get<unknown[]>(ReactRouter.middleElements).push(...decorates.map(it => it.metadata));
    } else {
      parent?.bind(ReactRouter.middleElements).toConstantValue(decorates.map(it => it.metadata))
    }
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

export function useI18n<T>(): T {
  const service = useService<I18nService>(I18nService);
  const [locale] = service.locales.asState();
  return locale as T
}