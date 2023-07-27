# this how to search for an object in an array in JS : , contains or indexOf methods won't work

<script>
// An array of objects
var persons = [{name: "Harry"}, {name: "Alice"}, {name: "Peter"}];

// Find if the array contains an object by comparing the property value
if(persons.some(person => person.name === "Peter")){
    alert("Object found inside the array.");
} else{
    alert("Object not found.");
}
</script>
