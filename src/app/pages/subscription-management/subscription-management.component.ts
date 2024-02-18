import { Component } from '@angular/core';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';

@Component({
  selector: 'app-subscription-managemen',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class SubscriptionManagemenComponent {
  isYearly: boolean = false;

  constructor(
    private AdminComponent: AdminComponent,
  ) {
  }

  ngOnInit(): void {
    this.AdminComponent.SetTitle('Subscription Management');
  }
}
