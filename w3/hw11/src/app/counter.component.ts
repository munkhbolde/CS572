import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>
			<input type="button" value="-" (click)='decrease()'/>
			<span>{{ counterValue }}</span>
			<input type="button" value="+" (click)='increase()'/>
    </p>
  `,
	styles: ['span { margin: 0 5px}']
})
export class CounterComponent implements OnInit {
	@Input() counter: number
	@Output() counterChange: EventEmitter<number>
	counterValue: number

	constructor() {
		this.counterChange = new EventEmitter()
	}

	increase() {
		this.counterValue++
		this.counterChange.emit(this.counterValue)
	}

	decrease() {
		this.counterValue--
		this.counterChange.emit(this.counterValue)
	}

	ngOnInit() {
		if(this.counter)
			this.counterValue = this.counter
		else
			this.counterValue = 0

		this.counterChange.emit(this.counterValue)
	}
}
