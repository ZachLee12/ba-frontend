import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserResource } from 'src/app/interfaces/resources.interfaces';

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

  createUserForm!: FormGroup;
  createGroupedResourcesForm!: FormGroup;
  createUngroupedResourcesForm!: FormGroup;

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      username: [''],
      password: [''],
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
      municipality: '',
      indicators: ''
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
      grouped: [true],
      municipality: [municipalityInput],
      indicators: this.formBuilder.array(indicators.map(indicator => this.formBuilder.control(indicator)))
    })
    this.getUngroupedResourcesFormArray().push(newFormGroup)
  }

  removeUngroupedResourcesFormGroup(index: number) {
    this.getUngroupedResourcesFormArray().removeAt(index)
  }
  submitForm() {
    console.log(this.createUserForm.value)
  }
}
