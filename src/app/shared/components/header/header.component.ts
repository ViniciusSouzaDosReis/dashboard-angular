import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderNavItemComponent } from '../header-nav-item/header-nav-item.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, FormsModule, NgIf, HeaderNavItemComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  groupedTeams: SelectItemGroup[];

  selectedTeam: string;

  actualRoute: string = window.location.pathname;

  constructor() {
    this.groupedTeams = [
      {
        label: 'Conta pessoal',
        value: 'personal',
        items: [{ label: 'Admin', value: 'Admin' }],
      },
      {
        label: 'Times',
        value: 'teams',
        items: [
          { label: 'Time 1', value: 'Time 1' },
          { label: 'Time 2', value: 'Time 2' },
          { label: 'Time 3', value: 'Time 3' },
        ],
      },
    ];

    this.selectedTeam = this.groupedTeams[0].items[0].value;
  }
}
