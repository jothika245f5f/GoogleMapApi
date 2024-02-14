import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealscComponent } from './dealsData/deals.component';
import { MarketdetComponent } from './marketdetails/marketdet.component';
import { InfoDealsComponent } from './info-deals/info-deals.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { TestmetricsComponent } from './testmetrics/testmetrics.component';

const routes: Routes = [
  {path:'',
component:DealscComponent,
children:[{path:'deals',
component:DealscComponent}],
},
{path:'',
component:MarketdetComponent,
children:[{path:'details',
component:MarketdetComponent}],
},
{path:'',
component:InfoDealsComponent,
children:[{path:'info',
component:InfoDealsComponent}],
},
{path:'',
component:CriteriaComponent,
children:[{path:'criteria',
component:CriteriaComponent}],
},
{path:'',
component:TestmetricsComponent,
children:[{path:'metrics',
component:TestmetricsComponent}],
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
