import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { UserResource } from 'src/app/interfaces/user.interfaces';

// HomeComponent provides the view to display the user's resources after logging in. 
// The resources are displayed in tiles/cards so it is easy to see what resources the 
// current logged in user has.
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resourceService: ResourceService = inject(ResourceService)

  userResources!: UserResource[];

  ngOnInit() {
    // Get the user's resources after the user has logged in and redirected to `/dashboard/home`.
    this.getUserResources()
  }


  getUserResources() {
    this.resourceService.getUserResources$()
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.userResources = data
        }
      })
  }

  openCopProject() {
    this.resourceService.redirectToCoP().pipe(take(1)).subscribe()
  }
}
