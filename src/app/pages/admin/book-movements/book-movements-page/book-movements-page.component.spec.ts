import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovementsPageComponent } from './book-movements-page.component';

describe('BookMovementsPageComponent', () => {
  let component: BookMovementsPageComponent;
  let fixture: ComponentFixture<BookMovementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMovementsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMovementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
