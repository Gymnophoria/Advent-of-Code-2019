const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

let orbits = input.split('\n').slice(0, -1).map(string => string.split(')'));

let solarSystem = {};

let orbitCount = 0;

orbits.forEach(orbit => {
    let object = orbit[0];
    let satellite = orbit[1];

    if (!solarSystem[object]) {
        solarSystem[object] = {
            object: object,
            satellites: [ satellite ],
            parent: null
        }
    } else {
        solarSystem[object].satellites.push(satellite);
    }

    if (!solarSystem[satellite]) {
        solarSystem[satellite] = {
            object: satellite,
            satellites: [],
            parent: object
        }
    } else {
        solarSystem[satellite].parent = object;
    }
});

console.log(solarSystem);

Object.keys(solarSystem).forEach(object => {
    let sats = countSatellites(object);
    orbitCount += sats;
    console.log(`Object ${object} has ${sats} satellites.`);
});

function countSatellites(name) {
    let object = solarSystem[name];

    if (typeof object.satelliteCount === 'number') return object.satelliteCount;
    else {
        let total = object.satellites.length;

        object.satellites.forEach(satellite => {
            total += countSatellites(satellite);
        });

        solarSystem[name].satelliteCount = total;
        return total;
    }
}
console.log(`Part 1: Total satellite count is ${orbitCount}.`); // x < 341702