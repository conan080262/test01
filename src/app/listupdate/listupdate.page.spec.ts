import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListupdatePage } from './listupdate.page';

describe('ListupdatePage', () => {
  let component: ListupdatePage;
  let fixture: ComponentFixture<ListupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListupdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
