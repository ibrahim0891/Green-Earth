## 1) What is the difference between var, let, and const?
**Ans:** var , let and const are the keywords to define variable in JavaScript. They all do the same task of defining varibable but they have some distinct difference in the way the behave. 

`var` set the declartion in the global scope. which means the variabe declared with it can be accessed from anywhere. Multiple variable can have same name which actually overwrite the privious declaration. which can cause sirious issues in large codebase where multiple persons are working. 

`let` and `const` keyword set varible in block scope. this means block and the nested block can access the decalred variable. outer scope don't access to the variable. Once a variable is declared inside a block with `let` or `const` keyword , new variable with same name can't be decalred again. 

`let` keyword let us to reassaing its value. but `const` does not let us to do that. The part of the value inside can be modified but can't redeclare or reassaing variable 

Example: 

```js
//var keyword 
var a = 10 
var a = 12 // reassignment is fine with var , now a is 12 

if (true){
    var b = 11
}
console.log(b) // 11 . b is accessable from outside. 

// let keyword
let x = 10 
x = 20 // redeclaration is fine, no issue
let x = 30 // re-assignment is not allowd - raise an error 

if(true){
    let b = 50;
}
console.log(b) // b is not defined. we can't access a block scopped variable 

//const keyword
const g = 9.8
g = 9.9 //re declaration is not allowed , raise an error
const g = 'Notun kichu' // re assaignmetn is also not allowed, raise an errror

if(true){
    const b = 50;
}
console.log(b) // b is not defined. we can't access a block scopped variable

```


## 2) What is the difference between map(), forEach(), and filter()?
**Ans:** The given methods are used on array to do iterative work. The all are used to perfrom iteration on array but the are used in different task and requirement.

**map() method:** This iterate over every array element, do some task and return a new array with the result got from every iteration. 

**forEach() method:** This works exactly same as 'map()' method. but doesn't return anyting. This is helpful in scenarios where we have to do something but we don't need anything to be returned. 

**filter() method:** This method run a function for every array element and returns a new array with the elements which have returned true for certain test.

So, the diffrenece between them is that `map()` return an array with the same length as input. `forEach()` doesn't return anything and `filter()` method return an array with the element only which had passed the test.
## 3) What are arrow functions in ES6?
**Ans:** Arrow functions are new ways to write function in JS introduced in ES6 2015. this is a easier and compact way of writing fucntions.
This let us to write functions without the `function` keyword. This saves us from spelling mistakes we accidently make while writng 'fucntion' (Oops, this happenend again.).

We can write function in one line and return a result immediately.

Example: 
```js 
//regular funciton 
var person = 'ibrahim'
function sayHi(name){
    console.log("hi! " + name)
}
sayHi(person)

//modern way 
let person = `ibrahim`
let sayHi = name => console.log(`hi! ${name}`)
sayHi(person)
//multiple liner version 
let sayHello = (name) => {
    console.log(`hello ${name}`)
}
sayHello(person)
```

## 4) How does destructuring assignment work in ES6?
**Ans:** Destructuring is compact way of accessing values of an array or object. 

Example of using destructing in arrays: 
```js
let myArray = [1,2,3,4]

//traditional way to access 
var first = myArray[0]
var second = myArray[2]

//Destructuring way
let [first , second] = myArray //this is much easy to write. 

//we can set default value if it is missing 
let rolls = [1,2]
let [ firstBoy , secondGirl , ghorarDimPolapan = 'absent' ] = rolls
console.log(ghorarDimPolapan) // result is 'absent' even though array has not defined it. 
```
Now we wil see how destructuring works with objects:
```js
let me = {name : 'ibrahim' , age : '10'}

//old way 
var name = me.name; 
var age = me['age]

//Detructuring way
let {name , age } = me 

//we can add default value too.
let {name , age , sleepTime = '12h'} = me; 
console.log(sleepTime) //result 12h. Even though i don't sleep for that long time. 

// we can also rename keys while accessing them 
let {name , age: boyos } = me 
console.log(boyos) // result is 10
```

## 5) Explain template literals in ES6. How are they different from string concatenation?
**Ans:** String literals in ES6 is a dynamic string system. Regular string has some limitation in terms of how we can use it and what can we do inside of it. 

When we have multiple strings to join, we've to use the + operator in regular string . In this case we have to be aware of spaces for the result we actually want.
we have to write our expression inbetween the operators which is hard to read and need extra effort to write them. It also does not support dynamic expression inside of it. 

Example of regular string concatintion: 
```js
var age = 10; 
var myString = "my name is ibrahim" + "i am" + age + "years old" 
//result: my name is ibrahimi am10years old. 
```

This is where string literals comes to save our life. we can write stirngs with (`) this. It is called the backtick. This helps us to write expression right into the string. we can use quotation inside as like as we want. We have to pay less attention in formating string because the produced result is almost like what we see. 

Example of string literal: 
```js
const myAge = 10 ; 
let myString = `my name is ibrahim. i am ${age} years old.`
//result: my name is ibrahim. i am 10 years old. 
```
