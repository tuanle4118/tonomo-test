import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  template: `
    <header
      class="sticky top-0 z-50 bg-paper/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-border dark:border-gray-800 transition-colors duration-300"
      role="banner"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2.5 group" aria-label="The Signal — Home">
          <span
            class="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white text-sm font-bold leading-none"
            aria-hidden="true"
            >B</span
          >
          <span
            class="font-serif text-lg font-bold text-ink dark:text-gray-100 group-hover:text-accent dark:group-hover:text-blue-400 transition-colors"
          >
            Blogger
          </span>
        </a>

        <nav class="flex items-center gap-1" aria-label="Site navigation">
          <a
            href="#"
            class="hidden sm:inline-flex px-3 py-1.5 text-sm text-muted dark:text-gray-400 hover:text-ink dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >Articles</a
          >
          <a
            href="#"
            class="hidden sm:inline-flex px-3 py-1.5 text-sm text-muted dark:text-gray-400 hover:text-ink dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >Topics</a
          >
          <a
            href="#"
            class="hidden sm:inline-flex px-3 py-1.5 text-sm text-muted dark:text-gray-400 hover:text-ink dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >About</a
          >

          <button
            (click)="theme.toggle()"
            class="ml-2 p-2 rounded-md text-muted dark:text-gray-400 hover:text-ink dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (theme.isDark()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            }
          </button>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
}
