import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

enum RESULT_TEMPLATE {
  NONE,
  VIEW_PASSWORD,
  INFORMATION
}

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.scss']
})
export class AccountStatusComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)

  checkAccountStatusForm!: FormGroup
  RESULT_TEMPLATE = RESULT_TEMPLATE
  resultTemplate: RESULT_TEMPLATE = RESULT_TEMPLATE.NONE;
  resultTemplateData: any = {}


  ngOnInit() {
    this.checkAccountStatusForm = this.formBuilder.group(
      {
        username: ['', Validators.required]
      }
    )
  }

  onSubmit() {
    const { username } = this.checkAccountStatusForm.value
    this.userService
      .getUserAccountStatus(username.trim())
      .pipe(take(1))
      .subscribe(
        {
          next: result => {
            this.resultTemplate = RESULT_TEMPLATE.VIEW_PASSWORD
            this.resultTemplateData = result
          },
          error: err => {
            this.resultTemplate = RESULT_TEMPLATE.INFORMATION
            this.resultTemplateData = err.error
          }
        }
      )
  }


}
