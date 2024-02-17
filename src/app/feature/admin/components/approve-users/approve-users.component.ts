import { Component, inject } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { EmailVerification } from 'src/app/interfaces/resources.interfaces';


@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent {
  adminService: AdminService = inject(AdminService)

  emailVertifications: EmailVerification[] = []
  columnNamesToDisplay: string[] = ['']
  dataSource: any[] = []

  ngOnInit() {
    this.adminService.getAllEmailVerifications()
      .subscribe(
        {
          next: emailVerifications => {
            this.emailVertifications = emailVerifications
            this.columnNamesToDisplay = ['actions', ...Object.keys(emailVerifications[0])]
            this.dataSource = emailVerifications.map(object => {
              return {
                actions: '',
                ...object
              }
            })
            console.log(this.columnNamesToDisplay)
            console.log(this.dataSource)
          }
        }
      )
  }


}
