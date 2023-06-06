import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHomePage } from './task-home.page';

describe('TaskHomePage', () => {
  let component: TaskHomePage;
  let fixture: ComponentFixture<TaskHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
