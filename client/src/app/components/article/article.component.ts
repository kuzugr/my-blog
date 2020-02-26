import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ConfirmDialogService } from '../../shared/services//confirm-dialog.service';
import { MetaTagService } from '../../shared/services/meta-tag.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleLoaded: boolean;
  loginState: boolean;
  articleId: number;
  isDisabled: boolean;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private metaTagService: MetaTagService,
  ) {}

  ngOnInit() {
    this.isDisabled = false;
    this.articleLoaded = false;
    this.loginState = false;
    this.route.params.subscribe((params) => {
      this.articleId = params['article_id'];
      this.getArticle(params['article_id']);
    });
    this.getLoginState();
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      (response) => {
        this.article = response;
        this.metaTagService.setMetaTag(this.article);
        this.articleLoaded = true;
      },
      (error) => {
        this.router.navigate(['/']);
      },
    );
  }

  getLoginState() {
    this.authService.loginState().then(
      (response) => {
        this.loginState = response['login_state'];
      },
      (error) => {},
    );
  }

  changePublishStatus(articleId: number) {
    const dialogTitle = this.article.published ? '非公開' : '公開';
    this.confirmDialogService
      .showConfirm({
        title: '公開状況変更',
        content: `${dialogTitle}に変更しますか？`,
        acceptButton: '変更する',
        cancelButton: 'キャンセル',
        isDanger: true,
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.articleService.changePublishStatus(articleId).subscribe(
            (response) => {
              this.article = response;
            },
            (error) => {},
          );
        }
      });
  }

  tweetArticle() {
    this.confirmDialogService
      .showConfirm({
        title: 'ツイート',
        content: `この記事をツイートしますか？`,
        acceptButton: 'ツイートする',
        cancelButton: 'キャンセル',
        isDanger: true,
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.articleService.tweet(this.article.id).subscribe(
            (response) => {
              this.isDisabled = true;
            },
            (error) => {},
          );
        }
      });
  }

  destoryArticle() {
    this.confirmDialogService
      .showConfirm({
        title: '削除',
        content: `この記事を削除しますか？`,
        acceptButton: '削除する',
        cancelButton: 'キャンセル',
        isDanger: true,
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.articleService.destroy(this.article.id).subscribe(
            (response) => {
              this.router.navigate(['/']);
            },
            (error) => {},
          );
        }
      });
  }
  // tslint:disable-next-line:max-file-line-count
}
