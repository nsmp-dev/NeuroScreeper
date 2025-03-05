

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
    job: "programmer,
};
for (let prop in person) {
    console.log(prop + ": " + person[prop]);
}
```
