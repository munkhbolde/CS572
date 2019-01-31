import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLoggable]'
})
export class LoggableDirective {
  constructor() { }
	@HostListener('dblclick') log() {
		console.log('DIV element has been clicked')
	}
}
