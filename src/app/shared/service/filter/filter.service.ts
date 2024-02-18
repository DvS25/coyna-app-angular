import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterValues: Map<string, { value1: string, value2: string, value3: string }> = new Map<string, { value1: string, value2: string, value3: string }>();

  constructor() {}

  setFilterValues(page: string, value1: string, value2: string, value3:string) {
    this.filterValues.set(page, { value1, value2, value3 });
  }

  getFilterValues(page: string): { value1: string, value2: string, value3: string } | undefined {
    return this.filterValues.get(page);
  }
}
