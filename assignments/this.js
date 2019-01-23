/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. When using global scope it will return  windows object
* 2. Implicit Binding is when it takes values from the current function. Does not have to be defined
* 3. Explicit Binding is when it takes the value from different object that is passed with a call or apply
* 4. New Binding is when using a constructor function it will stay inside that instance.
*
* write out a code example of each explanation above
*/

// Principle 1

function sayHello(){
	console.log(this);
	return "Hello";
}

sayHello();
// code example for Window Binding

// Principle 2

const user = {
	greeting: "Hello",
	greet: function(name){
		return `${this.greeting}, ${name}`;
	},
}

console.log(user.greet("Maks"));

// code example for Implicit Binding

// Principle 3

function CreatePerson(name, age){
	this.name = name;
	this.age = age;
	this.about = function(){
		return `Hello my name is ${this.name} and I am ${this.age}`;
	}
}

const jo = new CreatePerson("Jo", 20);
const dan = new CreatePerson("Dan", 18);

console.log(jo.about());
console.log(dan.about());
// code example for New Binding

// Principle 4
console.log(dan.about.call(jo));
// code example for Explicit Binding