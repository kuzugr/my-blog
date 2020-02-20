import { Article } from '../models/article';

export class ArticleList {
  articles: Array<Article>;
  next_page: Number;
  previous_page: Number;
}
