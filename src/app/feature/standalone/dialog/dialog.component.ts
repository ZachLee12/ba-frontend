import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  qrcodeUrl: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, CommonModule, QRCodeModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  data: DialogData = inject(MAT_DIALOG_DATA)

}
