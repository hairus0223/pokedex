import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { getTypeColor } from '../../../core/utils/pokemon-utils';
import { ZeroPadPipe } from '../../pipes/zero-pad.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ZeroPadPipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  // @Input() isFavorite: any = false;
  @Output() toggleFavorite = new EventEmitter<void>();

  constructor() {
    addIcons({ heart });
  }

  getTypeClasses(type: string): { bgColor: string; textColor: string } {
    return getTypeColor(type);
  }
}
