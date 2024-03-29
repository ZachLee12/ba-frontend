import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { CreateUser, UserResource } from 'src/app/interfaces/user.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { take } from 'rxjs';
import { Router } from '@angular/router';

// CreateUserComponent provides the view of forms to allow Admin to create a user and assign the user's resources.
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)
  snackBar: MatSnackBar = inject(MatSnackBar)
  router: Router = inject(Router)

  createUserForm!: FormGroup;
  createGroupedResourcesForm!: FormGroup;
  createUngroupedResourcesForm!: FormGroup;
  selectedUsername: string = ''

  ngOnInit() {
    //Get last piece of string, which is the username after string splitting
    this.selectedUsername = this.router.url.split('/').slice(-1)[0]
    this.createUserForm = this.formBuilder.group({
      username: [this.selectedUsername, Validators.required],
      groupedResources: this.formBuilder.array<UserResource>([]),
      ungroupedResources: this.formBuilder.array<UserResource>([])
    })

    const groupedTemplate = this.getResourceFormGroupTemplate(true)
    this.createGroupedResourcesForm = this.formBuilder.group(groupedTemplate)

    const ungroupedTemplate = this.getResourceFormGroupTemplate(false)
    this.createUngroupedResourcesForm = this.formBuilder.group(ungroupedTemplate)
  }

  getResourceFormGroupTemplate(grouped: boolean) {
    const template = {
      is_grouped_indicators: grouped,
      municipality: [''],
      indicators: ['']
    }
    return template
  }


  //Grouped Resources Form Methods
  getGroupedResourcesFormArray(): FormArray {
    return this.createUserForm.get('groupedResources') as FormArray
  }

  addGroupedResourcesFormField() {
    const municipalityInput: string = this.createGroupedResourcesForm.get('municipality')?.value
    const indicatorsInput: string = this.createGroupedResourcesForm.get('indicators')?.value
    const indicators = indicatorsInput.split(',').map(piece => piece.trim())
    const newFormGroup: FormGroup = this.formBuilder.group({
      is_grouped_indicators: [true],
      municipality: [municipalityInput],
      indicators: this.formBuilder.array(indicators.map(indicator => this.formBuilder.control(indicator)))
    })
    this.getGroupedResourcesFormArray().push(newFormGroup)
    this.createGroupedResourcesForm.reset()
  }

  removeGroupedResourcesFormGroup(index: number) {
    this.getGroupedResourcesFormArray().removeAt(index)
  }

  // Ungrouped Resources Form Methods
  getUngroupedResourcesFormArray(): FormArray {
    return this.createUserForm.get('ungroupedResources') as FormArray
  }

  addUngroupedResourcesFormField() {
    const municipalityInput: string = this.createUngroupedResourcesForm.get('municipality')?.value
    const indicatorsInput: string = this.createUngroupedResourcesForm.get('indicators')?.value
    const indicators = indicatorsInput.split(',').map(piece => piece.trim())
    const newFormGroup: FormGroup = this.formBuilder.group({
      is_grouped_indicators: [false],
      municipality: [municipalityInput],
      indicators: this.formBuilder.array(indicators.map(indicator => this.formBuilder.control(indicator)))
    })
    this.getUngroupedResourcesFormArray().push(newFormGroup)
    this.createUngroupedResourcesForm.reset()
  }

  removeUngroupedResourcesFormGroup(index: number) {
    this.getUngroupedResourcesFormArray().removeAt(index)
  }

  submitForm() {
    const formValue = this.createUserForm.value
    const createUser: CreateUser = {
      username: formValue.username,
      resources: [...formValue.groupedResources, ...formValue.ungroupedResources]
    }

    this.userService.createUser$(createUser).pipe(take(1)).subscribe(
      {
        next: message => {
          // Snackbar is the pop up that appears at the bottom of the screen. This is just to 
          // give the user feedback on whether a HTTP action has succeeded or not.
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000, //closes itself after 5 seconds
            data: {
              message: message,
              actionText: 'OK',
              actionButtonColor: 'primary'
            }
          })
        },
        error: err => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000, //closes itself after 5 seconds
            data: {
              message: err.error.detail,
              actionText: 'OK',
              actionButtonColor: 'warn'
            }
          })
        }
      }
    )
  }
}
