import test from 'node:test';
import assert from 'node:assert/strict';

function formatDate(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getDay()];
  const dayNum = date.getDate().toString().padStart(2, '0');
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

function processForecast(list) {
  const dailyMap = new Map();

  for (const item of list) {
    const dateStr = item.dt_txt.split(' ')[0];
    if (!dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, []);
    }
    dailyMap.get(dateStr).push(item);
  }

  const results = [];
  let count = 0;
  for (const [_, items] of dailyMap.entries()) {
    if (count >= 5) break;

    const middayItem =
      items.find((item) => item.dt_txt.includes('12:00:00')) || items[0];

    const dateObj = new Date(middayItem.dt * 1000);
    const formattedDate = formatDate(dateObj);
    const temp = middayItem.main.temp.toFixed(2);

    results.push(`${formattedDate}: ${temp}°C`);
    count++;
  }

  return results;
}

test('formatDate formats dates correctly', () => {
  // April 23, 2021 was a Friday
  const date = new Date(2021, 3, 23); // Month is 0-indexed (3 = April)
  assert.equal(formatDate(date), 'Fri, 23 Apr 2021');
});

test('processForecast extracts 1 temperature per day for 5 days', () => {
  const mockList = [
    { dt: 1619179200, dt_txt: '2021-04-23 12:00:00', main: { temp: 16.72 } },
    { dt: 1619265600, dt_txt: '2021-04-24 12:00:00', main: { temp: 18.57 } },
    { dt: 1619352000, dt_txt: '2021-04-25 12:00:00', main: { temp: 22.35 } },
    { dt: 1619438400, dt_txt: '2021-04-26 12:00:00', main: { temp: 20.42 } },
    { dt: 1619524800, dt_txt: '2021-04-27 12:00:00', main: { temp: 23.46 } },
    { dt: 1619611200, dt_txt: '2021-04-28 12:00:00', main: { temp: 22.07 } },
  ];

  const results = processForecast(mockList);
  assert.equal(results.length, 5, 'Should limit output to exactly 5 days');
  assert.equal(results[0], 'Fri, 23 Apr 2021: 16.72°C');
  assert.equal(results[1], 'Sat, 24 Apr 2021: 18.57°C');
  assert.equal(results[4], 'Tue, 27 Apr 2021: 23.46°C');
});
