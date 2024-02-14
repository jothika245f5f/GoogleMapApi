import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatdialoComponent } from './deals/matdialog/matdialo.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  
  {path:'deals',
  loadChildren:()=>
  import('./deals/deals.module').then((m)=>m.DealsModule)
},
{
  path:'signin',
  loadChildren:()=>
  import('./register/register.module').then((m)=>m.RegisterModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 
 }
