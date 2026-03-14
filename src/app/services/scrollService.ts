import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollPositions = new Map<string, number>();

  savePosition(url: string, position: number) {
    this.scrollPositions.set(url, position);
  }

  getPosition(url: string): number {
    return this.scrollPositions.get(url) || 0;
  }
}
