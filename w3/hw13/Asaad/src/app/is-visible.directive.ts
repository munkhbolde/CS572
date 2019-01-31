import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[myIsVisible]'
})
export class IsVisibleDirective {
	@Input() val: boolean

	constructor(private e:ElementRef, private r: Renderer2) {
		r.setStyle(e.nativeElement, 'display', 'block')
	}

	ngOnInit() {
		if(this.val) {
			this.e.nativeElement.style.display = 'none'
		}
	}
}
