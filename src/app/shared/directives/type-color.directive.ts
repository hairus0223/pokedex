import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { getTypeColor } from '../../core/utils/pokemon-utils';

@Directive({
  selector: '[appTypeColor]',
})
export class TypeColorDirective implements OnChanges {
  @Input() appTypeColor!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const colorClass = getTypeColor(this.appTypeColor);
    this.el.nativeElement.classList.add(colorClass);
  }
}
