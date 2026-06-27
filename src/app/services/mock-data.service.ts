import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { BlogPost, PostMeta } from '../models/blog-post.model';
import { BlogServiceModel } from '../models/blog-service.model';

@Injectable({ providedIn: 'root' })
export class MockDataService extends BlogServiceModel {
  private readonly http = inject(HttpClient);

  private getPostMetaData() {
    return this.http.get<PostMeta>('mock-post-meta.json');
  }
  private getContentData() {
    return this.http.get('mock-blog-article.html', { responseType: 'text' });
  }

  override readonly post = toSignal(
    combineLatest([this.getPostMetaData(), this.getContentData()]).pipe(
      map(([postMeta, content]) => ({ ...postMeta, content })),
    ),
    { initialValue: {} as BlogPost },
  );

  override readonly activeHeadingId = signal<string>('');
}
