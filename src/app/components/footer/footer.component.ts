import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer
      class="mt-16 border-t border-border dark:border-gray-800 bg-paper dark:bg-gray-950 transition-colors duration-300"
      role="contentinfo"
    >
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2.5">
          <span
            class="w-6 h-6 rounded bg-accent flex items-center justify-center text-white text-xs font-bold"
            aria-hidden="true"
            >S</span
          >
          <span class="font-serif font-bold text-ink dark:text-gray-100">Blogger</span>
        </div>
        <p class="text-sm text-muted dark:text-gray-500">
          &copy; 2026 The Blogger. Built with Angular &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
