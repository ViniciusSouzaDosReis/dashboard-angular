import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoadingWrapperComponent } from '../../../../shared/components/loading-wrapper/loading-wrapper.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [ButtonModule, NgClass, SkeletonModule],
  templateUrl: './metric-card.component.html',
})
export class MetricCardComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) isPositive!: boolean;
  @Input({ required: true }) percentage!: string;
  @Input({ required: true }) differenceThanLastMonth!: number;
  // @Input({ required: true }) isLoading!: boolean;

  sign = '';

  ngOnInit(): void {
    this.sign = this.isPositive ? '+' : '-';
  }
}
