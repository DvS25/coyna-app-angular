import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './custom-icon.component.html',  
  styles: [
    `:host {display: inline-flex;}`
  ]
})
export class CustomIconComponent {

  @Input() name: string ='';

}

@NgModule({
  declarations: [CustomIconComponent],
  imports: [ ],
  exports:[CustomIconComponent],
  providers: []
})
export class CustomIconModule { }

