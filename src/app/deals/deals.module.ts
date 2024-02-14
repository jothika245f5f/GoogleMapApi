import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { DealsRoutingModule } from './deals-routing.module';
import { DealscComponent } from './dealsData/deals.component';
import {  MatPaginatorModule } from "@angular/material/paginator";
import { MarketdetComponent } from './marketdetails/marketdet.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatdialoComponent } from './matdialog/matdialo.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import {MatRadioModule} from '@angular/material/radio';
import { InfoDealsComponent } from './info-deals/info-deals.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { TestmetricsComponent } from './testmetrics/testmetrics.component';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  declarations: [
    DealscComponent,
    MarketdetComponent,
    MatdialoComponent,
    InfoDealsComponent,
    CriteriaComponent,
    TestmetricsComponent,
    FilterPipe
  
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,
    MatTableModule,MatPaginatorModule,
    MatDialogModule,MatRadioModule,
    MatFormFieldModule,ReactiveFormsModule,MatSelectModule,FormsModule,GoogleMapsModule,
    
  ],
  providers:[GoogleMap],
  exports:[MarketdetComponent]
})
export class DealsModule { }
