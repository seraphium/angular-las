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
import { TreeModule } from 'angular-tree-component';
import {UnitEditDialogComponent} from "./dialogs/uniteditdialog.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {CityLineDialogComponent} from "./dialogs/citylinedialog.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    TreeModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    UnitEditDialogComponent,
    CityLineDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    TreeModule,
    Ng2Bs3ModalModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    UnitEditDialogComponent,
    CityLineDialogComponent
  ],

})
export class SharedModule {}
