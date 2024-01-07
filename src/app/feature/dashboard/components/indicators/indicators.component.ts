import { Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent {
  resourceService: ResourceService = inject(ResourceService)
  municipalityIndicatorsPairs: any[] = []

  ngOnInit() {
    this.resourceService.getUserIndicators().subscribe(
      {
        next: res => this.municipalityIndicatorsPairs = res
      }
    )
  }

}
