import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovementsAddComponent } from './book-movements-add.component';

describe('BookMovementsAddComponent', () => {
  let component: BookMovementsAddComponent;
  let fixture: ComponentFixture<BookMovementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMovementsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMovementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
