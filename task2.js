"use strict";
/**
 * Task 2: Display Weather Forecast for Jakarta for the Next 5 Days
 *
 * Rules:
 * - Uses OpenWeatherMap API (http://openweathermap.org/).
 * - Displays 5-day weather forecast for Jakarta.
 * - Only 1 temperature per day.
 * - API key MUST NOT be hardcoded in the source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const dayNum = date.getDate().toString().padStart(2, '0');
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${dayNum} ${monthName} ${year}`;
}
async function getWeatherForecast(apiKey) {
    const city = 'Jakarta';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error (${response.status}): ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        processAndDisplayForecast(data.list);
    }
    catch (error) {
        console.error('Failed to fetch weather forecast:', error.message);
        process.exit(1);
    }
}
function processAndDisplayForecast(list) {
    // Group forecasts by date (YYYY-MM-DD)
    const dailyMap = new Map();
    for (const item of list) {
        // Extract date string from dt_txt (e.g. "2026-08-12 12:00:00" -> "2026-08-12")
        const dateStr = item.dt_txt.split(' ')[0];
        if (!dailyMap.has(dateStr)) {
            dailyMap.set(dateStr, []);
        }
        dailyMap.get(dateStr).push(item);
    }
    console.log('Weather Forecast:');
    // Take the first 5 unique days
    let count = 0;
    for (const [dateStr, items] of dailyMap.entries()) {
        if (count >= 5)
            break;
        // Pick item closest to 12:00:00 (midday) or fallback to first item
        const middayItem = items.find((item) => item.dt_txt.includes('12:00:00')) || items[0];
        const dateObj = new Date(middayItem.dt * 1000);
        const formattedDate = formatDate(dateObj);
        const temp = middayItem.main.temp.toFixed(2);
        console.log(`${formattedDate}: ${temp}°C`);
        count++;
    }
}
// Support mock / demo data mode for offline testing / verification
function runDemoMode() {
    const mockList = [
        { dt: 1619179200, dt_txt: '2021-04-23 12:00:00', main: { temp: 16.72 } },
        { dt: 1619265600, dt_txt: '2021-04-24 12:00:00', main: { temp: 18.57 } },
        { dt: 1619352000, dt_txt: '2021-04-25 12:00:00', main: { temp: 22.35 } },
        { dt: 1619438400, dt_txt: '2021-04-26 12:00:00', main: { temp: 20.42 } },
        { dt: 1619524800, dt_txt: '2021-04-27 12:00:00', main: { temp: 23.46 } },
    ];
    processAndDisplayForecast(mockList);
}
// Entry Point
async function main() {
    // Check command line flag for demo mode
    if (process.argv.includes('--demo')) {
        runDemoMode();
        return;
    }
    // Retrieve API key from environment variable or command line argument
    const apiKey = process.env.OPENWEATHER_API_KEY || process.argv[2];
    if (!apiKey) {
        console.error('Error: OpenWeatherMap API key is required.');
        console.error('\nPlease provide the API key using one of the following methods:');
        console.error('  1. Environment variable: OPENWEATHER_API_KEY=your_api_key node task2.js');
        console.error('  2. Command-line argument: node task2.js your_api_key');
        console.error('\nOr run in demo mode to preview output:');
        console.error('  node task2.js --demo');
        process.exit(1);
    }
    await getWeatherForecast(apiKey);
}
main();
