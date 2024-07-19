import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoledPageComponent } from './devoled-page.component';

describe('DevoledPageComponent', () => {
  let component: DevoledPageComponent;
  let fixture: ComponentFixture<DevoledPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevoledPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevoledPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
