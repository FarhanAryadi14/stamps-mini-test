"use strict";
/**
 * Task 1: Small Program (FooBar with Prime Exclusion)
 *
 * Rules:
 * - Numbers 1 to 100 in reverse order (100 down to 1).
 * - Do not print prime numbers.
 * - Replace numbers divisible by 3 and 5 with "FooBar".
 * - Replace numbers divisible by 3 with "Foo".
 * - Replace numbers divisible by 5 with "Bar".
 * - Print horizontally separated by commas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isPrime(num) {
    if (num <= 1)
        return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}
function runFooBarReverse() {
    const result = [];
    for (let i = 100; i >= 1; i--) {
        // Rule 1: Do not print prime numbers
        if (isPrime(i)) {
            continue;
        }
        // Rule 2: Replace multiples of 3 and/or 5
        if (i % 15 === 0) {
            result.push("FooBar");
        }
        else if (i % 3 === 0) {
            result.push("Foo");
        }
        else if (i % 5 === 0) {
            result.push("Bar");
        }
        else {
            result.push(i);
        }
    }
    return result.join(", ");
}
// Execute and print output
console.log(runFooBarReverse());
