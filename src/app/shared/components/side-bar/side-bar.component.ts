import { Component } from '@angular/core';
import { SideBarItemComponent } from '../side-bar-item/side-bar-item.component';
import { NAV_ITEMS } from '../../constants/nav-items';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SideBarItemComponent],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  navItems = NAV_ITEMS;
}
