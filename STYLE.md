# Style Guide

## Rules
1. Raw Javascript only
2. No syntactic sugar
3. No libraries
4. No compilation
5. Every line must be commented*
6. Avoid "forEach()" when looping
7. Break up lines if they go too long
8. Avoid strict `===`/`!==` comparisons, screeps constants do not like them

\* comments may be omitted on sections of heavily repeated code that all do the exact same thing


## Naming Conventions
Be descriptive, use as many words as absolutely necessary to get the idea across.
We have comments, but we should be able to know what the code does without them from variable/class/function names alone.
### snake_case
- variables
- properties
- keys
- arguments
### CapitalCase
- class names
- singletons
- wrappers
### camelCase
- functions
- methods
### filenames
files get name in the format: `scope.name.js`, where `scope` is one of: controller, global, prototype, data, or role.
`main.js` is an exception to this rule as it is main and it's special

## example code

### find
```javascript
let targets = this.find(FIND_MY_STRUCTURES, {
    filter: struct => struct.hits < struct.hitsMax,
});
```

### array for loop
"for each element **in** an array"
```javascript
let names = ["Hanna", "Atlas"];
for (let name of names) {
    console.log(name);
}
```

### object for loop
"for each word **in** a dictionary"
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
