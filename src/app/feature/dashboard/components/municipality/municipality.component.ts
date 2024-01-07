import { Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent {
  resourceService: ResourceService = inject(ResourceService)
  municipalities: string[] = []

  ngOnInit() {
    this.resourceService.getUserMunicipality()
      .subscribe(
        {
          next: res => this.municipalities = res
        }
      )
  }

}
