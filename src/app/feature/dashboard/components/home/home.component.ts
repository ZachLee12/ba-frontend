import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { User, UserResource } from 'src/app/interfaces/resources.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resourceService: ResourceService = inject(ResourceService)

  userResources!: UserResource[];

  ngOnInit() {
    this.getUserResources()
  }


  getUserResources() {
    this.resourceService.getUserResources()
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.userResources = data
        }
      })
  }


  openCopProject() {
    this.resourceService.redirectToCoP().subscribe()
  }

}
