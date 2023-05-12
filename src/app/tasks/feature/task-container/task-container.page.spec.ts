import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskContainerPage } from './task-container.page';

describe('TaskContainerPage', () => {
  let component: TaskContainerPage;
  let fixture: ComponentFixture<TaskContainerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
