import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFocusTimerPage } from './task-focus-timer.page';

describe('TaskFocusTimerPage', () => {
  let component: TaskFocusTimerPage;
  let fixture: ComponentFixture<TaskFocusTimerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskFocusTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
