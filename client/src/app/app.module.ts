import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';
import { AdsenseModule } from 'ng2-adsense';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpsInterceptor } from './shared/services/http.interceptor';

import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SafeHtmlPipe } from './shared/pipes/pipe.safehtml.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { CommentComponent } from './components/comment/comment.component';

import { ConfirmDialogService } from './shared/services/confirm-dialog.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TopComponent } from './components/top/top.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { SearchComponent } from './components/search/search.component';
import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ArticleCardComponent } from './shared/components/article-card/article-card.component';
import { FileUploaderComponent } from './shared/components/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CreateAccountComponent,
    EditAccountComponent,
    LoginComponent,
    CreateArticleComponent,
    ProfileComponent,
    SafeHtmlPipe,
    ContactComponent,
    CommentComponent,
    ConfirmDialogComponent,
    PrivacyPolicyComponent,
    TopComponent,
    BlogsComponent,
    SearchComponent,
    ScrollTopButtonComponent,
    SearchResultComponent,
    ArticleCardComponent,
    FileUploaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMarkdownEditorModule.forRoot(),
    MarkdownModule.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-4015300938527195',
    }),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true }, ConfirmDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
