import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBarComponent } from './note-bar.component';

describe('NoteBarComponent', () => {
  let component: NoteBarComponent;
  let fixture: ComponentFixture<NoteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
