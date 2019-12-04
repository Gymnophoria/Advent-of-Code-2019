const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

let opcode = input.split(',').map(val => parseInt(val));

let noun;
let verb;

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        opcode[1] = i;
        opcode[2] = j;

        if (calculateOpcode() === 19690720) {
            noun = i;
            verb = j;
            break;
        }

        ressetOpcode();
    }

    if (noun) break;
}

function ressetOpcode() {
    opcode = input.split(',').map(val => parseInt(val));
}

function calculateOpcode() {
    for (let i = 0; i < opcode.length; i += 4) {
        const inst = opcode[i];
        
        if (inst === 99) break;
    
        const first = opcode[opcode[i + 1]];
        const second = opcode[opcode[i + 2]];
    
        switch (inst) {
            case 1:
                opcode[opcode[i + 3]] = first + second;
                break;
            case 2:
                opcode[opcode[i + 3]] = first * second;
                break;
        }
    }

    return opcode[0];
}

ressetOpcode();
opcode[1] = 12;
opcode[2] = 2;
calculateOpcode();

console.log(`Part 1: Opcode at position 0 is ${opcode[0]}`);
console.log(`Part 2: Output is ${100 * noun + verb}`);