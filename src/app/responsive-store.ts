import { Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  isMobile = signal(false);
  isTablet = signal(false);
  isDesktop = signal(false);

  constructor(private breakpoint: BreakpointObserver) {
    this.breakpoint
      .observe('(max-width: 767px)')
      .subscribe((result) => this.isMobile.set(result.matches));

    this.breakpoint
      .observe('(min-width: 768px) and (max-width: 1023px)')
      .subscribe((result) => this.isTablet.set(result.matches));

    this.breakpoint
      .observe('(min-width: 1024px)')
      .subscribe((result) => this.isDesktop.set(result.matches));
  }
}
