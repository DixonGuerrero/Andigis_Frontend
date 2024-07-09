import { Component, inject } from '@angular/core';
import { SearchService } from '../../../core/services/admin/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  searchService = inject(SearchService)
  private searchSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe((term: string) => {
      this.searchTerm = term;
    });
  }
}
