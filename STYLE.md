# Style Guide

## Rules
1. Raw Javascript only
2. No syntactic sugar
3. No libraries
4. No compilation
5. Every line must be commented*
6. Avoid "forEach()" when looping

\* comments may be omitted on sections of heavily repeated code


## Variable Naming Conventions
Be descriptive, use as many words as absolutely necessary to get the idea across.
We have comments, but we should be able to know what the code does without them from variable/class/function names alone.
### snake_case
variables, properties, keys, arguments
### CapitalCase
class names, singletons, wrappers
### camelCase
functions and methods

## example code

### find
```javascript
let targets = this.find(FIND_MY_STRUCTURES, {
    filter: struct => struct.hits < struct.hitsMax,
});
```

### array for loop
```javascript
let names = ["Hanna", "Atlas"];
for (let name of names) {
    console.log(name);
}
```

### object for loop
```javascript
let person = {
    id: 1,
    name: "Hanna",
    job: "programmer",
};
for (let prop in person) {
    console.log(prop + ": " + person[prop]);
}
```
