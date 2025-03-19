import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spin-loading-blur',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './spin-loading-blur.component.html',
})
export class SpinLoadingBlurComponent {
  
}
