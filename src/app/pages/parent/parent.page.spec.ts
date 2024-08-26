import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentPage } from './parent.page';

describe('ParentPage', () => {
  let component: ParentPage;
  let fixture: ComponentFixture<ParentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
