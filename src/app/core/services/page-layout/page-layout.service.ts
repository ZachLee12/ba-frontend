import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidenavStateEnum } from 'src/app/interfaces/pageLayout.interfaces';

// PageLayoutService keeps track of the state of the page layout of the application.
// At the moment, it is only tracking the state of whether the sidenav should be opened.
@Injectable({
  providedIn: 'root'
})
export class PageLayoutService {
  sidenavState$: BehaviorSubject<SidenavStateEnum> = new BehaviorSubject<SidenavStateEnum>(SidenavStateEnum.closed)

  closeSidenav$(): void {
    this.sidenavState$.next(SidenavStateEnum.closed)
  }

  openSidenav$(): void {
    this.sidenavState$.next(SidenavStateEnum.opened)
  }

  getSidenavState$(): Observable<SidenavStateEnum> {
    return this.sidenavState$.asObservable()
  }
}
