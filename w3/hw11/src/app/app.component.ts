import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
	template: `
		<app-counter (counterChange)="dosomething($event)"></app-counter>
		<span> ComponentCounterValue = {{ ComponentCounterValue }}</span>
	`,
})
export class AppComponent {
  title = 'counter'
	ComponentCounterValue = ''
	dosomething(e) {
		this.ComponentCounterValue = e
	}
}
