// var options = {  
//     weekday: "long", year: "numeric", month: "short",  
//     day: "numeric", hour: "2-digit", minute: "2-digit"  
// };
// console.log(new Date(1525679708852).toLocaleDateString("en-us"));


var startTime = new Date().toDateString() + ' 08:00:00';
var endTime = new Date().toDateString() + ' 17:30:00';

var startTime = Date.parse(startTime);
var endTime = Date.parse(endTime);
console.log(startTime);
console.log(new Date(startTime).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" })	);
// var un = Date.parse('24-Nov-2009');
// console.log(new Date(un).toString());
