import { Directive, afterRenderEffect, input, output } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
})
export class ScrollSpyDirective {
  readonly ids = input.required<string[]>({ alias: 'appScrollSpy' });
  readonly rootMargin = input('-80px 0px -60% 0px');

  readonly activeChange = output<string>();

  constructor() {
    afterRenderEffect((onCleanup) => {
      const ids = this.ids();

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeChange.emit(entry.target.id);
              break;
            }
          }
        },
        { rootMargin: this.rootMargin(), threshold: 0 },
      );

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }

      onCleanup(() => observer.disconnect());
    });
  }
}
