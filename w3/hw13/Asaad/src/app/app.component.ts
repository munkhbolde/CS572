import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
	template: `
	<div mysIsVisible val='val' appLoggable>
		<app-dumb *ngFor='let obj of objects' [obj]='obj' myIsVisible [val]='val'></app-dumb>
	</div>`
})
export class AppComponent {
  title = 'Asaad'
	val = false

	objects = [
		{lname: 'Asaad', fname: 'Saad'},
		{lname: 'Munkhbold', fname: 'Enkhtur'},
		{lname: 'Zair', fname: 'Ogniv'},
	]
}
