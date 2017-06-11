import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from "./list-errors.component";
import { ShowAuthedDirective } from './show-authed.directive';
import {FollowButtonComponent} from "./buttons";
import {ArticleMetaComponent} from "./article-helpers/article-meta.component";
import {FavoriteButtonComponent} from "./buttons/favorite-button.component";
import {ArticleListConfig} from "./models/article-list-config.model";
import {ArticleListComponent} from "./article-helpers/article-list.component";
import {ArticlePreviewComponent} from "./article-helpers/article-preview.component";
import {ShowDialogComponent} from "./dialogs";
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    TreeModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ShowDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ShowDialogComponent,
    TreeModule
  ],

})
export class SharedModule {}
