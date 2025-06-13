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
import { ClassDecorate } from '@geckoai/class-mirror';
import { FC, ReactNode } from "react";
export declare class I18nDecorate extends ClassDecorate<I18nDoc | I18nLazyDoc> {
}
export declare class I18nElementDecorate extends ClassDecorate<FC<{
    children: ReactNode;
}>> {
}
/**
 * Decorator metadata for i18n
 * @param locales
 * @constructor
 */
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
