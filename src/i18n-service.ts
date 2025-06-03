import { Container, injectable } from '@geckoai/gecko-core';
import { Subject } from 'rxjs';
import { useEffect, useState } from 'react';
import { LazyService } from '@geckoai/gecko-router';

@injectable()
export class I18nService {
  private _subject = new Subject<string>();

  private current: string = localStorage.getItem('gecko-i18n-language') ?? window.navigator.language

  constructor(private container: Container) {
    this._subject.subscribe((value) => {
      this.current = value;
      localStorage.setItem('gecko-i18n-language', value);
    });
    this._subject.next(this.current);
  }

  public getLanguage() {
    return this.current;
  }

  public setLanguage(language: string) {
    if (language != this.current) {
      const service = this.container.get<LazyService>(LazyService);
      this._subject.next(language);
      service.next();
    }
  }

  public asState(): [string, (state: string) => void] {
    const [state, setState] = useState(this.current);
    useEffect(() => {
      const subscription = this._subject.subscribe(setState);
      return () => subscription.unsubscribe()
    }, [state, setState]);
    return [state, this.setLanguage.bind(this)];
  }
}