const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

let user_inputs = [ 1 ];
let memory = input.split(',').map(val => parseInt(val));

calculateOpcode();

function calculateOpcode() {
    for (let i = 0; i < memory.length; i += 4) {
		//console.log(memory.toString() + "\n----");
		const [ opcode, mode1, mode2, mode3 ] = processParameter(memory[i]);

		//console.log(`${i} - Applying opcode ${opcode} with modes ${mode1}, ${mode2}, ${mode3}`);
        
		if (opcode === 99) break;
		
		let first, second;

		if (opcode <= 2) {
			first = getValue(i + 1, mode1);
			second = getValue(i + 2, mode2);
			//console.log(`\tfirst: ${first}, second: ${second}`)
		}
    
        switch (opcode) {
            case 1:
				memory[memory[i + 3]] = first + second;
				//console.log(`\tSet ${memory[i + 3]} to ${first + second}`);
                break;
            case 2:
				memory[memory[i + 3]] = first * second;
				//console.log(`\tSet ${memory[i + 3]} to ${first * second}`);
				break;
			case 3:
				memory[memory[i + 1]] = user_inputs.shift();
				//console.log(`\tSet ${memory[i + 1]} to ${memory[memory[i + 1]]}`);
				i -= 2;
				break;
			case 4:
				console.log(getValue(i + 1, mode1));
				i -= 2;
				break;
		}
		
		
    }
}

function getValue(location, mode) {
	if (mode === 0) return memory[memory[location]];
	else if (mode === 1) return memory[location];
}

function processParameter(param) {
	let step = 0;

	let opcode;
	let mode1 = 0;
	let mode2 = 0;
	let mode3 = 0;

	while (param > 0) {
		let int = param % 10;

		switch (step) {
			case 0:
				opcode = int;
				break;
			case 1:
				opcode = int * 10 + opcode;
				break;
			case 2:
				mode1 = int;
				break;
			case 3:
				mode2 = int;
				break;
			case 4:
				mode3 = int;
				break;
		}

		step++;
		param = Math.floor(param / 10);
	}

	return [ opcode, mode1, mode2, mode3 ];
}