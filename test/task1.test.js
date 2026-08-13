import test from 'node:test';
import assert from 'node:assert/strict';

// Helper functions from task1
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function runFooBarReverse(max = 100, min = 1) {
  const result = [];

  for (let i = max; i >= min; i--) {
    if (isPrime(i)) {
      continue;
    }

    if (i % 15 === 0) {
      result.push("FooBar");
    } else if (i % 3 === 0) {
      result.push("Foo");
    } else if (i % 5 === 0) {
      result.push("Bar");
    } else {
      result.push(i);
    }
  }

  return result.join(", ");
}

test('isPrime correctly identifies prime numbers', () => {
  assert.equal(isPrime(1), false, '1 should not be prime');
  assert.equal(isPrime(2), true, '2 should be prime');
  assert.equal(isPrime(3), true, '3 should be prime');
  assert.equal(isPrime(4), false, '4 should not be prime');
  assert.equal(isPrime(5), true, '5 should be prime');
  assert.equal(isPrime(97), true, '97 should be prime');
  assert.equal(isPrime(100), false, '100 should not be prime');
});

test('runFooBarReverse generates correct output sequence', () => {
  const output = runFooBarReverse(100, 1);
  const items = output.split(', ');

  // Starts with 100 (Bar)
  assert.equal(items[0], 'Bar');
  // 99 (Foo)
  assert.equal(items[1], 'Foo');
  // 98 (98)
  assert.equal(items[2], '98');
  // 97 is prime, so next is 96 (Foo)
  assert.equal(items[3], 'Foo');

  // Ends with 8, Foo (6), 4, 1
  const lastFour = items.slice(-4);
  assert.deepEqual(lastFour, ['8', 'Foo', '4', '1']);

  // Verify prime numbers are excluded
  const primeList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  for (const prime of primeList) {
    assert.equal(items.includes(prime.toString()), false, `Prime number ${prime} should be omitted`);
  }
});
