import { Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resourceService: ResourceService = inject(ResourceService)

  ngOnInit() {
    this.resourceService.getUserMunicipality()
      .subscribe({
        next: res => console.log(res)
      })
  }

}
