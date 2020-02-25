import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TopComponent } from './components/top/top.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BeforeunloadGuard } from './shared/guards/beforeunload.guard';

const routes: Routes = [
  { path: '', component: TopComponent },
  { path: 'registration', component: CreateAccountComponent },
  { path: 'account', component: EditAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'article',
    children: [
      { path: 'create', component: CreateArticleComponent, canDeactivate: [BeforeunloadGuard] },
      { path: ':article_id', component: ArticleComponent },
      { path: ':article_id/edit', component: CreateArticleComponent, canDeactivate: [BeforeunloadGuard] },
      { path: '**', component: TopComponent },
    ],
  },
  { path: 'search', component: SearchResultComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: TopComponent },
];

@NgModule({
  providers: [BeforeunloadGuard],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
