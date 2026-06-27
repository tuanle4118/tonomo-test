import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollSpyDirective } from '../../directives/scroll-spy.directive';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-article',
  imports: [ScrollSpyDirective],
  template: `
    <article aria-label="Blog post content">
      <!-- Post header -->
      <header class="mb-8">
        <div class="flex flex-wrap gap-2 mb-4">
          @for (tag of post().tags.slice(0, 2); track tag) {
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent dark:text-blue-400"
            >
              {{ tag }}
            </span>
          }
        </div>

        <h1
          class="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-ink dark:text-gray-100 leading-tight mb-4"
        >
          {{ post().title }}
        </h1>
        <p class="text-lg text-muted dark:text-gray-400 leading-relaxed mb-6">
          {{ post().subtitle }}
        </p>

        <div
          class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-subtle dark:text-gray-500 border-y border-border dark:border-gray-800 py-4"
        >
          <div class="flex items-center gap-2">
            <img
              [src]="post().author.avatar"
              [alt]="post().author.name"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-muted dark:text-gray-400 font-medium">{{ post().author.name }}</span>
          </div>
          <span aria-hidden="true" class="hidden sm:inline">&middot;</span>
          <time [dateTime]="post().publishedAt">{{ post().publishedAt }}</time>
          <span aria-hidden="true" class="hidden sm:inline">&middot;</span>
          <span>{{ post().readingTime }} min read</span>
        </div>
      </header>

      <!-- Cover image -->
      <figure class="mb-10 rounded-xl overflow-hidden">
        <img
          [src]="post().coverImage"
          [alt]="post().coverAlt"
          class="w-full aspect-[2/1] object-cover"
          loading="eager"
        />
      </figure>

      <!-- Article body -->
      <div
        class="prose-article"
        [innerHTML]="postContent()"
        [appScrollSpy]="headingIds()"
        (activeChange)="blog.activeHeadingId.set($event)"
      ></div>
    </article>
  `,
})
export class ArticleComponent {
  protected readonly blog = inject(MockDataService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly post = this.blog.post;

  readonly headingIds = computed(() => this.post().toc.map((e) => e.id));

  readonly postContent = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.blog.post().content),
  );
}
