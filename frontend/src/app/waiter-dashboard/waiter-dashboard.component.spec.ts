import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterDashboardComponent } from './waiter-dashboard.component';

describe('WaiterDashboardComponent', () => {
  let component: WaiterDashboardComponent;
  let fixture: ComponentFixture<WaiterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaiterDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
