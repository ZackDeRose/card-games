import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a home link', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const homeLink = compiled.querySelector('a');
    expect(homeLink.textContent).toContain('Home');
    const href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');
    expect(href).toBe('/');
  });

  it('should have a memory game link', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const memoryGameLinks = fixture.debugElement
      .queryAll(By.css('a'))
      .filter(x => x.nativeElement.textContent === 'Memory Game');
    expect(memoryGameLinks.length).toBe(1);
    const memoryGameLink = memoryGameLinks[0];
    const href = memoryGameLink.nativeElement.getAttribute('href');
    expect(href).toBe('/memory-game');
  });
});
