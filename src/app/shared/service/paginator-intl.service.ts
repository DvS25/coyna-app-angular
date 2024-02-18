import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorIntlService extends MatPaginatorIntl {
  override getRangeLabel =  (page: number, pageSize: number, length: number) => {
    return `Showing ${page+1} to ${pageSize} of ${length}`
  };
  constructor() {
    super();
  }
}
