import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovementsEditComponent } from './book-movements-edit.component';

describe('BookMovementsEditComponent', () => {
  let component: BookMovementsEditComponent;
  let fixture: ComponentFixture<BookMovementsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMovementsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMovementsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
