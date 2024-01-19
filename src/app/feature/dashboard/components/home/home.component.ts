import { Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { User, UserResource } from 'src/app/interfaces/resources.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resourceService: ResourceService = inject(ResourceService)

  user!: User;

  ngOnInit() {
    this.getUser()
  }


  getUser() {
    this.resourceService.getUserResources()
      .subscribe({
        next: data => {
          this.user = data
        }
      })
  }

  makeDummyExpressCall() {
    this.resourceService.makeDummyExpressCall(this.user.username).subscribe(console.log)
  }

}
