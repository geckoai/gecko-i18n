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
import { ConstantValueProvider, Container, FactoryProvider } from "@geckoai/gecko-core";
import { ViewModel } from "@geckoai/platform-react";
import { ComponentType } from "react";
export declare class I18nGlobalService {
    private container;
    readonly DEFAULT: string;
    readonly ErrorBoundary?: ComponentType;
    readonly Loading?: ComponentType;
    /**
     * 当前语言包
     */
    current: ViewModel<string>;
    constructor(container: Container, DEFAULT: string, ErrorBoundary?: ComponentType, Loading?: ComponentType);
    /**
     * 提供默认常量用于注入默认语言
     * @param defaultLanguage
     * @constructor
     */
    static DefaultProvide(defaultLanguage: string): ConstantValueProvider<string>;
    static for(defaultLanguage: string, Loading?: ComponentType, ErrorBoundary?: ComponentType): FactoryProvider<I18nGlobalService>;
}
