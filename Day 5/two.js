const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

let user_inputs = [ 5 ];
let memory = input.split(',').map(val => parseInt(val));

calculateOpcode();

function calculateOpcode() {
    for (let i = 0; i < memory.length; i += 4) {
		const [ opcode, mode1, mode2, mode3 ] = processParameter(memory[i]);
        
		if (opcode === 99) break;

		const startingI = i;
		const startingInst = memory[i];
		
		let first = getValue(i + 1, mode1);
		let second = getValue(i + 2, mode2);
    
        switch (opcode) {
            case 1: // add 1 + 2 and place them in 3
				setValue(i + 3, first + second);
                break;
            case 2: // multiply 1 + 2 and place them in 3
				setValue(i + 3, first * second);
				break;
			case 3: // place user input in 1
				setValue(i + 1, user_inputs.shift());
				i -= 2;
				break;
			case 4: // print value at 1
				console.log(getValue(i + 1, mode1));
				i -= 2;
				break;
			case 5: // jump to value at 2 if 1 is non-zero
				if (first !== 0) i = second - 3;
				i -= 1;
				break;
			case 6: // jump to value at 2 if 1 is zero
				if (first === 0) i = second - 3;
				i -= 1;
				break;
			case 7: // if 1 is less than 2, set 3 to 1, else set 3 to 0
				setValue(i + 3, first < second ? 1 : 0);
				break;
			case 8: // if 1 equals 2, set 3 to 1, else set 3 to 0
				setValue(i + 3, first === second ? 1 : 0);
				break;
		}
		
		if (startingInst !== memory[startingI]) i = startingI - 4;
    }
}

function getValue(location, mode) {
	if (mode === 0) return memory[memory[location]];
	else if (mode === 1) return memory[location];
}

function setValue(location, value) {
	memory[memory[location]] = value;
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