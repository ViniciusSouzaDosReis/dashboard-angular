import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-nav-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header-nav-item.component.html',
})
export class HeaderNavItemComponent {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) isActive!: boolean;
}
