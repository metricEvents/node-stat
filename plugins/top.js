
function top() {
}

function unit_convert(m){
	if(m.indexOf('m')){
		return parseInt(m.slice(0,-1))*1024;
	} else if(m.indexOf('g')){
		return parseInt(m.slice(0,-1))*1024*1024;
	}
	
	return parseInt(m);
}

var topPattern = /([0-9]+)\s+(\w+)\s+([0-9]+)\s+([0-9]+)\s+([0-9]+(m|k|g)?)\s+([0-9]+(m|k|g)?)\s+([0-9]+(m|k|g)?)\s+(S|R)\s+([0-9]+(\.[0-9]+)?)\s+([0-9]+(\.[0-9]+)?)\s+(([0-9]+:)?[0-9]+\.[0-9]+)\s+(\w+)/;

top.prototype.get = function(nstat, callback) {

	nstat.exec('top', [ '-b', '-n1' ], function(err, data) {
		if (err) {
			callback(err);
		} else {
			var obj = {};
			var lines = data.split('\n');
			for (var i = 1; i < lines.length; i++) {
				if (topPattern.exec(lines[i])) {
					var line = lines[i].trim().split(/\s+/);
					var t_line = obj[line[11]] = {};
					t_line.PID = parseInt(line[0]);
					t_line.USER = line[1];
					t_line.PR = parseInt(line[2]);
					t_line.NI = parseInt(line[3]);
					t_line.VIRT = unit_convert(line[4]);
					t_line.RES = unit_convert(line[5]);
					t_line.SHR = unit_convert(line[6]);
					t_line.S = line[7];
					t_line.CPU_PCT = parseFloat(line[8]);
					t_line.MEM_PCT = parseFloat(line[9]);
					t_line.TIME = line[10];
				}
			}

			callback(null, obj);
		}
	});
};

module.exports = new top();
