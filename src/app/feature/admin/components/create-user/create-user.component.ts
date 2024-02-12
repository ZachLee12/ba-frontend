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
  @ViewChild('groupedMunicipalityInput') groupedMunicipalityInput!: ElementRef
  @ViewChild('groupedIndicatorsInput') groupedIndicatorsInput!: ElementRef


  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      username: [''],
      password: [''],
      groupedResources: this.formBuilder.array<UserResource>([]),
      ungroupedResources: this.formBuilder.array<UserResource>([])
    })
  }

  getGroupedResourcesFormArray(): FormArray {
    return this.createUserForm.get('groupedResources') as FormArray
  }

  getUngroupedResourcesFormArray(): FormArray {
    return this.createUserForm.get('ungroupedResources') as FormArray
  }

  addGroupedResourcesFormField() {
    const municipalityInput: string = this.groupedMunicipalityInput.nativeElement.value
    const indicatorsInput: string = this.groupedIndicatorsInput.nativeElement.value
    const indicators = indicatorsInput.split(',').map(piece => piece.trim())
    const userResource: UserResource = {
      grouped: true,
      municipality: municipalityInput,
      indicators: indicators
    }
    const newFormGroup: FormGroup = this.formBuilder.group({
      grouped: [userResource.grouped],
      municipality: [userResource.municipality],
      indicators: this.formBuilder.array(userResource.indicators.map(indicator => this.formBuilder.control(indicator)))
    })
    this.getGroupedResourcesFormArray().push(newFormGroup)
  }

  removeGroupedResourcesFormGroup(index: number) {
    this.getGroupedResourcesFormArray().removeAt(index)
  }

  submitForm() {
    console.log(this.createUserForm.value)
  }
}
