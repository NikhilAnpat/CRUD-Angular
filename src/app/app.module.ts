import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environmets } from '../environment/environment'
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SearchPipe } from './search.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NumericOnlyDirective } from './numeric-only.directive';
import { PhoneNumberPrefixPipe } from './phone-number-prefix.pipe'
import { ToastrModule } from 'ngx-toastr';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { Dailog1Component } from './dailog1/dailog1.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchPipe,
    ManageUsersComponent,
    NumericOnlyDirective,
    PhoneNumberPrefixPipe,
    Dailog1Component,
    

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environmets.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastrComponentlessModule,
    MatButtonModule,
    MatDialogModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
