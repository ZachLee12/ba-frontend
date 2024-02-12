import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserResource } from 'src/app/interfaces/resources.interfaces';
import { UserService } from 'src/app/core/services/user/user.service';
import { group } from '@angular/animations';
import { CreateUser } from 'src/app/interfaces/user.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { take } from 'rxjs';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)
  snackBar: MatSnackBar = inject(MatSnackBar)


  createUserForm!: FormGroup;
  createGroupedResourcesForm!: FormGroup;
  createUngroupedResourcesForm!: FormGroup;

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      username: ['leezhengyang1balau@gmail.com', Validators.required],
      password: ['hallo123', Validators.required],
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
      grouped,
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
      grouped: [true],
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
      grouped: [false],
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
      password: formValue.password,
      access: [...formValue.groupedResources, ...formValue.ungroupedResources]
    }
    console.log(createUser)
    this.userService.createUser(createUser).pipe(take(1)).subscribe(
      {
        next: message => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000, //milliseconds
            data: {
              message: message,
              actionText: 'OK',
              actionButtonColor: 'primary'
            }
          })
        },
        error: err => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000, //milliseconds
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
