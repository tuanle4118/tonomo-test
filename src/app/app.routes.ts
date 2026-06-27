import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent),
  },
];
