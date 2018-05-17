import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './components/auth/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', component: MainComponent, canLoad: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
