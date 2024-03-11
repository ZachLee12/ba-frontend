import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, switchMap, take, zip } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { ConfirmationDialogComponent } from 'src/app/feature/standalone/confirmation-dialog/confirmation-dialog.component';
import { EmailVerification } from 'src/app/interfaces/resources.interfaces';


@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent {
  adminService: AdminService = inject(AdminService)
  confirmationDialog: MatDialog = inject(MatDialog)

  emailVerifications: EmailVerification[] = []
  columnNamesToDisplay: string[] = ['']
  dataSource: any[] = []

  ngOnInit() {
    this.getEmailVerificationsAndUsersZip$()
      .subscribe(
        {
          next: ([emailVerifications, users]) => {
            this.emailVerifications = emailVerifications
            this.columnNamesToDisplay = ['actions', 'username', 'verification_code', 'is_verified']

            const existingUsernames = users.map(user => user.username)
            // Display only users that have requested an account, but not yet approved.
            this.dataSource = emailVerifications.filter(object => !existingUsernames.includes(object.username)).map(object => ({ actions: '', ...object }))
            if (this.dataSource.length === 0) {
              this.dataSource = [{ action: '', username: 'No user email verifications', verification_code: 'N/A', is_verified: 'N/A' }]
            }
          }
        }
      )
  }


  getEmailVerificationsAndUsersZip$(): Observable<[EmailVerification[], { username: string, is_password_viewed: boolean }[]]> {
    return zip(this.adminService.getAllEmailVerifications(), this.adminService.getAllUsers())
  }

  rejectUserAccountRequest(username: string) {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent,
      {
        data: {
          title: 'Confirm Delete',
          targetUsername: username,
          content: 'Are you sure you want to delete user account request for',
          primaryActionButton: {
            color: 'warn',
            text: 'Delete'
          },
          secondaryActionButton: {
            color: 'basic',
            text: 'Cancel'
          }
        }
      }
    )

    dialogRef.afterClosed().subscribe(confirmDelete => {
      if (confirmDelete) {
        this.adminService.rejectUserAccountRequest(username)
          .pipe(
            switchMap(() => this.getEmailVerificationsAndUsersZip$()),
            take(1)
          )
          .subscribe(
            {
              next: ([emailVerifications, users]) => {
                this.emailVerifications = emailVerifications
                this.columnNamesToDisplay = ['actions', 'username', 'verification_code', 'is_verified']

                const existingUsernames = users.map(user => user.username)
                // Display only users that have requested an account, but not yet approved.
                this.dataSource = emailVerifications.filter(object => !existingUsernames.includes(object.username)).map(object => ({ actions: '', ...object }))

                if (this.dataSource.length === 0) {
                  this.dataSource = [{ action: '', username: 'No user email verifications', verification_code: 'N/A', is_verified: 'N/A' }]
                }
              }
            }
          )
      }
    })
  }
}
