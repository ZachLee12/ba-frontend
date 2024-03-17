import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// DetailsComponent provides the view to render more details about a selected resource.
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  @Input('details') details: any;
  selectedMunicipality!: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: any) => this.selectedMunicipality = params.municipality
    })
  }

}
