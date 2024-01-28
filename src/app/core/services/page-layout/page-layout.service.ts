import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidenavStateEnum } from 'src/app/interfaces/pageLayout.interfaces';

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
