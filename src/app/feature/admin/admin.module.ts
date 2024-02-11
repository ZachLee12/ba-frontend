import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AdminComponent, CreateUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class AdminModule { }
