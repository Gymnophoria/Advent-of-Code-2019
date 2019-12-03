const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();

input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

input = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

let [ first, second ] = input.split('\n');
let locations = []; // array of [x, y] coordinate arrays where first has traveled
let overlap = []; // array of [x, y] coordinates where first and second overlap

first = first.split(',');
second = second.split(',');

let cur = [0, 0];

first.forEach((inst, j) => {
	console.log(`Instruction ${j} of ${first.length}`);

	let dir = inst.substring(0, 1);
	let num = parseInt(inst.substring(1));

	for (let i = 0; i < num; i++) {
		modifyCur(cur, dir);
		locations.push([cur[0], cur[1]]);
	}
});

console.log(`Locations is ${locations.length} long.`);
cur = [0, 0];

second.forEach((inst, j) => {
	console.log(`Instruction ${j} of ${second.length}`);

	let dir = inst.substring(0, 1);
	let num = parseInt(inst.substring(1));

	for (let i = 0; i < num; i++) {
		modifyCur(cur, dir);
		if (i % 100 === 0) console.log(`Modification ${i} of ${num}`);
		if (locations.some(loc => cur[0] === loc[0] && cur[1] === loc[1])) overlap.push([ cur[0], cur[1] ]);
	}
});

let smallestDistance = Number.MAX_VALUE;

overlap.forEach(location => {
	let distance = Math.abs(location[0]) + Math.abs(location[1]);

	if (distance < smallestDistance) smallestDistance = distance;
});

console.log(`Part 1: Manhattan distance from central point to closest intersection is ${smallestDistance}.`); // 2129

function modifyCur(cur, dir) {
	switch (dir) {
		case 'L':
			cur[0]--;
			break;
		case 'R':
			cur[0]++;
			break;
		case 'D':
			cur[1]--;
			break;
		case 'U':
			cur[1]++;
			break;
	}
}