//array toString
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr'];
var myVar = monthNames.toString(); // assigns 'Jan,Feb,Mar,Apr' to myVar.
console.log (myVar);

//add elements to begining of array and adjust length accordingly
var arr = [1, 2];
arr.unshift(0); // result of call is 3, the new array length
// arr is [0, 1, 2]
arr.unshift(-2, -1); // = 5
// arr is [-2, -1, 0, 1, 2]
arr.unshift([-3]);
// arr is [[-3], -2, -1, 0, 1, 2]
console.log (arr);


//give indiv values in array--not supported in some browsers
// var arr = ['w', 'y', 'k', 'o', 'p'];
// var eArr = arr.values();
// // your browser must support for..of loop
// // and let-scoped variables in for loops
// for (let letter of eArr) {
//   console.log(letter);
// }

// //or=>

// var arr = ['w', 'y', 'k', 'o', 'p'];
// var eArr = arr.values();
// console.log(eArr.next().value); // w
// console.log(eArr.next().value); // y
// console.log(eArr.next().value); // k
// console.log(eArr.next().value); // o
// console.log(eArr.next().value); // p

//copies 1 array from one array to another, but both point to the same object in memory
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
console.log (fruits, ' ' , citrus);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']


//search array elements to see condition is matched. If one is true, the whole thing is true
function isBiggerThan10(element, index, array) {
  return element > 10;
}
var arr1=[2, 5, 8, 1, 4];
var arr2=[12, 5, 8, 1, 4];

console.log (arr1.some(isBiggerThan10));  // false
console.log(arr2.some(isBiggerThan10)); //true


//sort array according to unicode values
var fruit = ['cherries', 'apples', 'bananas'];

console.log ("original: " ,fruit); // ['apples', 'bananas', 'cherries']
console.log("sorted: " ,fruit.sort());

var scores = [1, 10, 2, 21]; 
console.log ("original: ", scores);
console.log("sorted: ",scores.sort())
// Watch out that 10 comes before 2,
// because '10' comes before '2' in Unicode code point order.

var things = ['word', 'Word', '1 Word', '2 Words'];
console.log(things);
console.log(things.sort());
// ['1 Word', '2 Words', 'Word', 'word']
// In Unicode, numbers come before upper case letters,
// which come before lower case letters.