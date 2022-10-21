import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationComponent } from './animation/animation.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [

  {path:"", component:AnimationComponent},

  {path:"movies", component:HomeComponent},

  {path:"view", component:ViewComponent},

  {path:"book", component:BookingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
