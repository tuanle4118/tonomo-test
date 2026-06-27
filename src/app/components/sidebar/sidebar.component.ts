import { Component, computed, inject } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside
      class="lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto space-y-6 pb-8"
      aria-label="Article sidebar"
    >
      <!-- Author Card -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-5 transition-colors"
      >
        <h2
          class="text-xs font-semibold uppercase tracking-widest text-subtle dark:text-gray-500 mb-4"
        >
          Author
        </h2>
        <div class="flex items-start gap-3">
          <img
            [src]="post().author.avatar"
            [alt]="post().author.name"
            class="w-12 h-12 rounded-full object-cover ring-2 ring-border dark:ring-gray-700 flex-shrink-0"
            loading="lazy"
          />
          <div>
            <p class="font-semibold text-ink dark:text-gray-100 text-sm leading-tight">
              {{ post().author.name }}
            </p>
            <p class="text-muted dark:text-gray-400 text-xs mt-0.5">{{ post().author.role }}</p>
          </div>
        </div>
        <p class="text-xs text-muted dark:text-gray-400 mt-3 leading-relaxed">
          {{ post().author.bio }}
        </p>
      </div>

      <!-- Table of Contents -->
      <nav
        aria-label="Table of contents"
        class="bg-white dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-5 transition-colors"
      >
        <h2
          class="text-xs font-semibold uppercase tracking-widest text-subtle dark:text-gray-500 mb-3"
        >
          Contents
        </h2>
        <ol class="space-y-0.5">
          @for (entry of post().toc; track entry.id) {
            <li>
              <a
                [href]="'#' + entry.id"
                [class]="tocClasses().get(entry.id)"
                (click)="$event.preventDefault(); scrollTo(entry.id)"
                >{{ entry.label }}</a
              >
            </li>
          }
        </ol>
      </nav>

      <!-- Tags -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-5 transition-colors"
      >
        <h2
          class="text-xs font-semibold uppercase tracking-widest text-subtle dark:text-gray-500 mb-3"
        >
          Topics
        </h2>
        <div class="flex flex-wrap gap-2">
          @for (tag of post().tags; track tag) {
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-muted dark:text-gray-400 hover:bg-accent/10 hover:text-accent dark:hover:text-blue-400 cursor-default transition-colors"
              >#{{ tag }}</span
            >
          }
        </div>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  private readonly blog = inject(MockDataService);
  readonly post = this.blog.post;
  readonly activeId = this.blog.activeHeadingId;

  readonly tocClasses = computed(() => {
    const activeId = this.activeId();
    const map = new Map<string, string>();

    for (const entry of this.post().toc) {
      const base = 'block text-sm py-1 rounded transition-colors truncate ';
      const indent = entry.level === 3 ? 'pl-3 ' : '';
      const active =
        activeId === entry.id
          ? 'text-accent dark:text-blue-400 font-medium'
          : 'text-muted dark:text-gray-400 hover:text-ink dark:hover:text-gray-100';
      map.set(entry.id, base + indent + active);
    }

    return map;
  });

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
