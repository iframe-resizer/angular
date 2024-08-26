import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPage } from './child.page';

describe('ChildPage', () => {
  let component: ChildPage;
  let fixture: ComponentFixture<ChildPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
