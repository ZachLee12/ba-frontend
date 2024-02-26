import { Component, inject } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { EmailVerification } from 'src/app/interfaces/resources.interfaces';


@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent {
  adminService: AdminService = inject(AdminService)

  emailVerifications: EmailVerification[] = []
  columnNamesToDisplay: string[] = ['']
  dataSource: any[] = []

  ngOnInit() {
    this.adminService.getAllEmailVerifications()
      .pipe(take(1))
      .subscribe(
        {
          next: emailVerifications => {
            this.emailVerifications = emailVerifications
            this.columnNamesToDisplay = ['actions', 'username', 'verification_code', 'is_verified']
            if (!emailVerifications || emailVerifications.length < 1) {
              this.dataSource = [{ action: '', username: 'No user email verifications', verification_code: 'N/A', is_verified: 'N/A' }]
              return
            }
            this.dataSource = emailVerifications.map(object => ({ actions: '', ...object }))
          }
        }
      )
  }

  rejectUserAccountRequest(username: string) {
    this.adminService.rejectUserAccountRequest(username)
      .pipe(
        switchMap(() => this.adminService.getAllEmailVerifications()),
        take(1))
      .subscribe(
        {
          next: emailVerifications => {
            this.dataSource = []
            if (!emailVerifications || emailVerifications.length < 1) {
              this.dataSource = emailVerifications.map(object => ({ actions: '', ...object }))
            }
          }
        }
      )
  }

}
