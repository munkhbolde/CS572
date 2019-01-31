import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dumb',
	template: `
		<div>{{	obj.lname }} {{ obj.fname}}</div>
	`,
})
export class DumbComponent implements OnInit {
	@Input() obj: {lname: string, fname: string}

  constructor() { }
  ngOnInit() {
  }
}
