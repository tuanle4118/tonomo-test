import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ArticleComponent } from '../../components/article/article.component';

@Component({
  selector: 'app-blog-post',
  imports: [HeaderComponent, FooterComponent, SidebarComponent, ArticleComponent],
  template: `
    <div
      class="min-h-screen bg-paper dark:bg-gray-950 transition-colors duration-300 flex flex-col"
    >
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <app-header />

      <main class="flex-1" id="main-content" role="main">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <!-- Mobile: article first, then sidebar. Desktop: sidebar left, article right -->
          <div class="flex flex-col-reverse lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 xl:gap-16">
            <!-- Sidebar (stacks below on mobile, sticky on desktop) -->
            <div class="mt-12 lg:mt-0">
              <app-sidebar />
            </div>

            <!-- Main article -->
            <div class="min-w-0">
              <app-article />
            </div>
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `,
})
export class BlogPostComponent {}
