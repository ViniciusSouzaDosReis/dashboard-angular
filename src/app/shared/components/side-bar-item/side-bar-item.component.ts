import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-side-bar-item',
  standalone: true,
  imports: [RouterModule, TooltipModule, NgClass],
  templateUrl: './side-bar-item.component.html',
})
export class SideBarItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) route!: string;
  @Input({ required: true }) title!: string;

  isActive = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isActive = this.router.isActive(this.route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
