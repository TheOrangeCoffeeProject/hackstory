import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { loadScreenComponent } from './loadScreen.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('loadScreenComponent', () => {
  let component: loadScreenComponent;
  let fixture: ComponentFixture<loadScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [loadScreenComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(loadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.HOME.TITLE'
    );
  }));
});
