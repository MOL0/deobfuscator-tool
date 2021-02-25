// cc
















function exists(str) {
	try {
		eval(str);
		return true;
	} catch (e) {
		return false;
	}
}

Array.prototype.conserveOne = function () {
	let xd = [];
	this.forEach(e => {
		if (xd.includes(e)) return;
		xd.push(e);
	});
	return xd;
}

String.prototype.replaceArrayWithString = function(arr, str) {
	var replaced = this;
	arr.forEach(el => {
		replaced = replaced.split(el).join(str);
	});
	return replaced;
};

const fs = require("fs");

String.prototype.replaceArrayWithArray = function(arr, omg) {
	var replaced = this;
	arr.forEach(el => {
		let replace = omg[arr.indexOf(el)];
		if (typeof replace === "string" && !el.startsWith("\\x")) replace = `"${replace}"`.replace(/\n/g, "\\n");
		replaced = replaced.split(el).join(replace);
	});
	return replaced;
};

const wate = process.argv[1].substring(process.argv[1].lastIndexOf("\\")+1),
	  filename = process.argv[2],
	  func = process.argv[3];

if (process.argv.length < 3 || process.argv.some(pd => !pd)) return console.log('\x1b[31mUtilisation : node '+wate+' "fichier.js" ou node '+wate+' 2 "0x1324(0x987)"\x1b[0m'), process.exit();
if (process.argv[2] == 2) return console.log(eval(func)), process.exit();

let trans = wate.substring(0, wate.lastIndexOf(".")), gay = filename.substring((58454+565/10)*0, filename.lastIndexOf("."));

if (wate === filename || wate === gay || (trans && trans === filename) || (trans && gay && trans === gay)) return console.log("\x1b[31mVeuillez ne pas désobfusquer le fichier actuel, cela pourrait causer des problèmes. (créez-en plutôt un nouveau)\x1b[0m"), process.exit();
if (!fs.existsSync(filename)) return console.log("\x1b[31mLe fichier "+filename+" n'existe pas.\x1b[31m"), process.exit();

try {
	fs.readFile(filename, (err, buf) => {
		if (err) throw err;
		let data = buf.toString(),
			slash = "\\",
			obf0 = data.match(RegExp("_0x\\w*\\([^)]*.","g")) || [];
		
		obf0 = obf0.conserveOne();
		
		let obf = [],
			deob = [];
		
		obf0.forEach(d4rk => {
			if (exists(d4rk)) obf.push(d4rk);
			if (exists(d4rk.substring(d4rk.indexOf("(")+1))) obf.push(d4rk.substring(d4rk.indexOf("(")+1));
		});
		
		obf.forEach(gay=>deob.push(eval(gay)));
		
		let deobfuscated = data.replaceArrayWithArray(obf, deob).replace(/\\x[\w-]{2}/g, function (value) {
				let newVal = eval(`"${value}"`);
				if (value === "\\x27") newVal = "\\"+newVal;
				if (value === "\\x0A" || value === "\\x0a") newVal = "\\n";
				if (value === "\\x1B" || value === "\\x1b") newVal = "\\x1b";
				if (value === "\\x5C" || value === "\\x5c") newVal = "\\";
				return newVal;
			}).replace(/\\u[\w-]{4}/g, function (value) {
				let newVal = eval(`"${value}"`);
				if (value === "\\u0027'") newVal = "\\"+newVal;
				if (value === "\\u000A" || value === "\\u000a") newVal = "\\n", console.log(value);
				if (value === "\\u005C" || value === "\\u005c") newVal = "\\", console.log(value);
				return newVal;
			});
		
		const newData = new Uint8Array(Buffer.from(deobfuscated));
		
		fs.writeFile(filename, newData, (er) => {
			if (er) throw er;
			console.log("\x1b[32mLe fichier "+filename+" a correctement été désobfusqué\x1b[0m");
			process.exit();
		});
	});
} catch (e) {
	console.error(e);
	process.exit();
}