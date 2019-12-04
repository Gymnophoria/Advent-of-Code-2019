const min = 134792;
const max = 675810;

let matches = 0;
let difficultMatches = 0;

for (let i = min; i <= max; i++) {
	if (checkNumber(i)) matches++;
	if (checkNumberDifficult(i)) difficultMatches++;
}

function checkNumber(num) {
	let pass = true;
	let passesSequential = false;

	let curDigit = num % 10;
	let cur = Math.floor(num / 10);

	for (let j = 0; j < 5; j++) {
		let digit = cur % 10;

		if (digit > curDigit) pass = false;
		if (digit === curDigit) passesSequential = true;

		curDigit = digit;
		cur = Math.floor(cur / 10);
	}

	return pass && passesSequential;
}

function checkNumberDifficult(num) {
	let pass = true;
	let passesSequential = false;

	let curDigit = num % 10;
	let cur = Math.floor(num / 10);
	let prevStreak = 0;

	for (let j = 0; j < 5; j++) {
		let digit = cur % 10;

		if (digit > curDigit) pass = false;
		if (digit === curDigit) {
			if (Math.floor(cur / 10) % 10 !== digit) {
				if (!prevStreak) passesSequential = true;
			} else prevStreak = true;
		} else prevStreak = false;

		curDigit = digit;
		cur = Math.floor(cur / 10);
	}

	return pass && passesSequential;
}
console.log(`Part 1: There are ${matches} matches.`); // 297561
console.log(`Part 2: There are ${difficultMatches} difficult matches.`);