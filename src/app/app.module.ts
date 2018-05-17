import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule }   from '@angular/common/http';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { TrnsComponent } from './components/main/trns/trns.component';
import { UserPanelComponent } from './components/main/user-panel/user-panel.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

//services
import { UserService } from './services/user.service';
import { TransactionService } from './services/transaction.service';
import { AuthGuard } from './components/auth/auth.guard';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    TrnsComponent,
    UserPanelComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [UserService, TransactionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
}
