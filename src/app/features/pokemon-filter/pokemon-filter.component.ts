import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSearchbar,
  IonHeader,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonSearchbar,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss'],
})
export class PokemonFilterComponent implements OnInit, OnDestroy {
  @Input() types: string[] = [];
  @Output() onFilterChange = new EventEmitter<string>();
  @Output() onSearchChange = new EventEmitter<string>();

  searchQuery = '';
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => this.onSearchChange.emit(query));
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  onFilterTypeChange(event: any) {
    this.onFilterChange.emit(event.detail.value);
  }

  onSearchQueryChange() {
    this.searchSubject.next(this.searchQuery);
  }
}
