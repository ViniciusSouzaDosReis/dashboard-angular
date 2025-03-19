import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-loading-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './loading-wrapper.component.html',
})
export class LoadingWrapperComponent {
  @Input({ required: true }) isLoading: boolean = false;
  @Input({ required: true }) contentTemplate!: TemplateRef<any>;
  @Input({ required: true }) fallbackTemplate!: TemplateRef<any>;
}
