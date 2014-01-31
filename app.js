var nodestat = require('./node-stat');
setInterval(function() {
    nodestat.get('top','stat','net','load','disk', function(err, data) {
        console.log(JSON.stringify(data));
    });
}, 1000);
