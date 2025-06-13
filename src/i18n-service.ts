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

import {Constants, Container, injectable} from '@geckoai/gecko-core';
import {ClassMirror} from "@geckoai/class-mirror";
import {I18nDecorate, I18nLazyLoader, I18nLocale} from "./decorators";
import {ViewModel} from "@geckoai/platform-react";
import {I18nGlobalService} from "./i18n-global-service";

@injectable("Singleton")
export class I18nService {
  public all: ViewModel<Map<string, I18nLazyLoader | I18nLocale>> = ViewModel.for(new Map());

  /**
   * 语言包
   */
  public locales: ViewModel<I18nLocale>;

  constructor(container: Container, public config: I18nGlobalService) {
    const parent = container.get<Container>(Constants.parent);
    const classMirror = parent.get(ClassMirror);
    const decorates = classMirror.getAllDecorates(I18nDecorate);
    const map = new Map<string, I18nLazyLoader | I18nLocale>();
    // 全部语言包
    decorates.forEach((decorate) => {
      map.set(decorate.metadata.lang, decorate.metadata.locale);
    })
    this.all.next(map);
    this.locales = ViewModel.for(I18nService.createProxy(this.all.value, config) as I18nLocale);
    const update = () => {
      this.locales.next(I18nService.createProxy(this.all.value, config) as I18nLocale)
    }
    this.all.subscribe(update)
    config.current.subscribe(update)
  }

  private static createProxy(target: Map<string, any>, config: I18nGlobalService) {
    return new Proxy(target, {
      get(target, prop: string): any {
        const keys = target.keys();
        const _default = target.get(config.DEFAULT)
        const _current = target.get(config.current.value);

        if (I18nService.__isObject(_default[prop])) {
          const map = new Map();
          Array.from(keys).forEach(key => {
            map.set(key, target.get(key)?.[prop]);
          })
          return I18nService.createProxy(map, config);
        }
        return _current[prop] ?? _default[prop];
      }
    })
  }

  /**
   * 判断是否为对象
   * @param v
   * @private
   */
  private static __isObject(v: any): boolean {
    return typeof v === 'object' && v.constructor === Object;
  }

  public async load() {
    const {current, DEFAULT} = this.config;
    const languages = Array.from(new Set([DEFAULT, current.value]));
    const res = await Promise.all(languages.map(it => {
      const call = this.all.value.get(it);
      if (typeof call === "function") {
        return (async () => {
          const value = await call();
          return ({
            language: it,
            value,
          })
        })()
      }
      return null
    }).filter(Boolean))

    res.forEach((it: any) => {
      this.all.value.set(it.language, it.value);
      this.all.next(this.all.value)
    })
  }
}