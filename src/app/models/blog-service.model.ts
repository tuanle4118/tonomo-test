import { Signal } from '@angular/core';
import { BlogPost } from './blog-post.model';

export abstract class BlogServiceModel {
  abstract post: Signal<BlogPost>;
  abstract activeHeadingId: Signal<string>;
}
