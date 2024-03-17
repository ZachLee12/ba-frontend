import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  qrcodeUrl: string;
}

// DialogComponent provides the view for a general-purpose dialog to display any information as a pop-up.
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
