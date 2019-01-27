class University {
	constructor(private name: string, private dept: string) {}

	graduation(year: number): void  {
		console.log(`Graduating ${this.dept} ${year}`)
	}
}

let mum = new University("MUM", "Computer Science")
mum.graduation(2019)
