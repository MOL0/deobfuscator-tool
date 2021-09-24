// ---------------------------
/// vous pouvez placer les fonctions ici












// ---------------------------


const fs = require("fs");

const wate = process.argv[1].substring(process.argv[1].lastIndexOf("\\")+1),
	  filename = process.argv[2],
	  func = process.argv[3];

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


String.prototype.replaceArrayWithArray = function(arr, omg) {
	var replaced = this;
	arr.forEach(el => {
		let replace = omg[arr.indexOf(el)];
		if (typeof replace === "string" && !el.startsWith("\\x")) replace = `"${replace}"`.replace(/\n/g, "\\n");
		replaced = replaced.split(el).join(replace);
	});
	return replaced;
};


if (process.argv.length < 3 || process.argv.some(pd => !pd)) return console.log(`\x1b[31mUtilisation : node ${wate} "fichier.js" ou node ${wate} 2 "0x1324(0x987)"\x1b[0m`), process.exit();
if (filename == 2) return console.log(eval(func)), process.exit();

let pasTrans = wate.substring(0, wate.lastIndexOf(".")), pasGay = filename.substring((58454+565/10)*0, filename.lastIndexOf("."));

if (wate === filename || wate === pasGay || (pasTrans && pasTrans === filename) || (pasTrans && pasGay && pasTrans === pasGay)) return console.log("\x1b[31mVeuillez ne pas désobfusquer le fichier actuel, cela pourrait causer des problèmes. (créez-en plutôt un nouveau)\x1b[0m"), process.exit();
if (!fs.existsSync(filename)) return console.log(`\x1b[31mLe fichier ${filename} n'existe pas.\x1b[0m`), process.exit();

try {
	fs.readFile(filename, (err, buf) => {
		if (err) throw err;
		let data = buf.toString(),
			obf0 = data.match(RegExp("_0x\\w*\\([^)]*.","g")) || [];
		
		obf0 = obf0.conserveOne();
		
		let obf = [],
			deob = [];
		
		obf0.forEach(d4rkTmtc => {
			if (exists(d4rkTmtc)) obf.push(d4rkTmtc);
			if (exists(d4rkTmtc.substring(d4rkTmtc.indexOf("(")+1))) obf.push(d4rkTmtc.substring(d4rkTmtc.indexOf("(")+1));
		});
		
		obf.forEach(pasGay=>deob.push(eval(pasGay)));
		
		let deobfuscated = data.replaceArrayWithArray(obf, deob).replace(/\\x[\w-]{2}/g, function (val) {
				let newVal = eval(`"${val}"`);
				if (val === "\\x27" || val === "\\x22") newVal = "\\"+newVal;
				if (val.toLowerCase() === "\\x0a") newVal = "\\n";
				if (val.toLowerCase() === "\\x1b") newVal = "\\x1b";
				if (val.toLowerCase() === "\\x5c") newVal = "\\";
				return newVal;
			}).replace(/\\u[\w-]{4}/g, function (val) {
				let newVal = eval(`"${val}"`);
				if (val === "\\u0027" || val === "\\u0022") newVal = "\\"+newVal;
				if (val.toLowerCase() === "\\u000a") newVal = "\\n", console.log(val);
				if (val.toLowerCase() === "\\u005c") newVal = "\\", console.log(val);
				return newVal;
			});
		
		const newData = new Uint8Array(Buffer.from(deobfuscated));
		
		fs.writeFile(filename, newData, (er) => {
			if (er) throw er;
			console.log(`\x1b[32mLe fichier ${filename} a correctement été désobfusqué\x1b[0m`);
			process.exit();
		});
	});
} catch (e) {
	console.error(e);
	process.exit();
}
