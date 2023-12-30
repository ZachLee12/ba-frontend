import { Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resourceService: ResourceService = inject(ResourceService)

  userMunicipalities: string[] = []

  ngOnInit() {
    this.getUserMunicipality()
  }


  getUserMunicipality() {
    this.resourceService.getUserMunicipality()
      .subscribe({
        next: data => {
          this.userMunicipalities = data
        }
      })
  }

}
