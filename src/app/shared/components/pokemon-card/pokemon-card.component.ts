import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { getTypeColor } from '../../../core/utils/pokemon-utils';
import { ZeroPadPipe } from '../../pipes/zero-pad.pipe';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [IonIcon, IonButton, CommonModule, RouterModule, ZeroPadPipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Input() favorites: any = false;
  @Output() toggleFavorite = new EventEmitter<void>();

  constructor() {
    addIcons({ heart, heartOutline });
  }

  getTypeClasses(type: string): { bgColor: string; textColor: string } {
    return getTypeColor(type);
  }
}
