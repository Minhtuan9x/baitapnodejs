var fs = require('fs');

fs.open('mynewfile2.txt', 'dominhtuan', function (err, file) {//ghi file đã có sẵn
    if (err) throw err;
    console.log('Saved!');
});