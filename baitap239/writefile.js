var fs = require('fs');

//create a file named mynewfile3.txt://ghi đè file
fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
