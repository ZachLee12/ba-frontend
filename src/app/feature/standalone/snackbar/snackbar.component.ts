import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

interface SnackBarData {
  message: string,
  actionText: string,
  actionButtonColor: 'primary' | 'accent' | 'warn'
}

// SnackbarComponent provides a view to a small dialoag that only appears at the bottom of the screen.
// It can be used, for example, to give feedback to the user on the result of a HTTP request.
@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data: SnackBarData = inject(MAT_SNACK_BAR_DATA)
}
