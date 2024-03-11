import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  // This property will take the value passed to the directive
  @Input() appHasRole!: string;

  private templateRef: TemplateRef<any> = inject(TemplateRef)
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef)
  private loginService: LoginService = inject(LoginService)

  ngOnInit() {
    this.updateView();
  }

  // Function to simulate role checking, replace this with your actual authentication logic
  private userHasRole(role: string): boolean {
    return false
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this.userHasRole(this.appHasRole)) {
      // If the user has the role, render the template inside the view container
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      // Else, clear the view container (don't render the content)
      this.viewContainerRef.clear();
    }
  }

}
