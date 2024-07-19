import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolvedAddComponent } from './devolved-add.component';

describe('DevolvedAddComponent', () => {
  let component: DevolvedAddComponent;
  let fixture: ComponentFixture<DevolvedAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolvedAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolvedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
