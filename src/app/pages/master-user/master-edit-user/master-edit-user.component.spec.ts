import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEditUserComponent } from './master-edit-user.component';

describe('MasterEditUserComponent', () => {
  let component: MasterEditUserComponent;
  let fixture: ComponentFixture<MasterEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
