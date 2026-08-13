# Stamps Developer Recruitment - Mini Test Solutions

Solution repository for the Stamps Developer recruitment process. Written in **JavaScript / TypeScript (Node.js)**.

---

## 📌 Repository Contents

| File | Description |
| :--- | :--- |
| [`task1.ts`](file:///d:/MyWorkspace/stamps-mini-test/task1.ts) | Task 1 solution in TypeScript |
| [`task1.js`](file:///d:/MyWorkspace/stamps-mini-test/task1.js) | Task 1 solution in JavaScript (Node.js) |
| [`task2.ts`](file:///d:/MyWorkspace/stamps-mini-test/task2.ts) | Task 2 weather forecast solution in TypeScript |
| [`task2.js`](file:///d:/MyWorkspace/stamps-mini-test/task2.js) | Task 2 weather forecast solution in JavaScript (Node.js) |
| [`package.json`](file:///d:/MyWorkspace/stamps-mini-test/package.json) | Node package dependencies and scripts |
| [`tsconfig.json`](file:///d:/MyWorkspace/stamps-mini-test/tsconfig.json) | TypeScript compiler options |

---

## 🚀 Task 1: Small Program (FooBar with Prime Exclusion)

### Problem Description
1. Create an array/list of numbers from 1 to 100 in **reverse order** (100 down to 1).
2. **Rules**:
   - **Do not print prime numbers** (e.g., 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 are excluded). Note: `1` is not prime.
   - Replace numbers divisible by 3 and 5 with `"FooBar"`.
   - Replace numbers divisible by 3 with `"Foo"`.
   - Replace numbers divisible by 5 with `"Bar"`.
   - Print numbers horizontally separated by commas.

### How to Run

Using JavaScript (Node.js):
```bash
node task1.js
```

Using TypeScript:
```bash
npx ts-node task1.ts
```

### Expected Output
```text
Bar, Foo, 98, Foo, Bar, 94, Foo, 92, 91, FooBar, 88, Foo, 86, Bar, Foo, 82, Foo, Bar, Foo, 77, 76, FooBar, 74, Foo, Bar, Foo, 68, Foo, Bar, 64, Foo, 62, FooBar, 58, Foo, 56, Bar, Foo, 52, Foo, Bar, 49, Foo, 46, FooBar, 44, Foo, Bar, Foo, 38, Foo, Bar, 34, Foo, 32, FooBar, 28, Foo, 26, Bar, Foo, 22, Foo, Bar, Foo, 16, FooBar, 14, Foo, Bar, Foo, 8, Foo, 4, 1
```

---

## 🌤️ Task 2: Weather Forecast for Jakarta (Next 5 Days)

### Problem Description
1. Fetch the 5-day weather forecast for Jakarta using the OpenWeatherMap API (`http://openweathermap.org/`).
2. Display 1 temperature reading per day for 5 days.
3. The API key must **NOT** be hardcoded in the source code.

### How to Run

#### Option A: Using Environment Variable (Recommended)
```bash
# On macOS / Linux / Git Bash:
OPENWEATHER_API_KEY=your_api_key_here node task2.js

# On Windows PowerShell:
$env:OPENWEATHER_API_KEY="your_api_key_here"; node task2.js
```

#### Option B: Passing API Key as Argument
```bash
node task2.js your_api_key_here
```

#### Option C: Offline Demo / Preview Mode
```bash
node task2.js --demo
```

### Expected Output Format
```text
Weather Forecast:
Fri, 23 Apr 2021: 16.72°C
Sat, 24 Apr 2021: 18.57°C
Sun, 25 Apr 2021: 22.35°C
Mon, 26 Apr 2021: 20.42°C
Tue, 27 Apr 2021: 23.46°C
```

---

## 🔨 Building TypeScript Files
To compile TypeScript `.ts` files to JavaScript `.js`:
```bash
npm run build
```
