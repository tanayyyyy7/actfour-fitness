# ACT4 FITNESS

ACT4 FITNESS is a comprehensive fitness tracking application built with React and Vite. It allows users to log their daily activities, track calories burned, monitor step count, and set personal fitness goals.

## Features

- Daily activity logging
- Step counting
- Calorie burn tracking
- Weight goal setting and tracking
- Customizable calorie goals
- Full activity log view
- Responsive design for both mobile and desktop

## Tech Stack

- React
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- date-fns for date manipulation
- Lucide React for icons
- Context API

## Project Structure


```
├── actfour-fitness
│   ├── App.jsx
│   ├── assets
│   ├── components
│   │   ├── ActivityLog.jsx
│   │   ├── AddActivity.jsx
│   │   ├── CalorieGoalDialog.jsx
│   │   ├── contexts
│   │   │   ├── ActivityContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── data
│   │   │   └── mets.json
│   │   ├── FullActivityLog.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── LogActivityDialog.jsx
│   │   ├── LogStepsDialog.jsx
│   │   ├── LogSteps.jsx
│   │   ├── MyStats.jsx
│   │   ├── MyStatsPage.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── SuspenseFallback.jsx
│   │   ├── tempCode.txt
│   │   └── todo.txt
│   ├── components.json
│   ├── dist
│   ├── index.html
│   ├── index.jsx
│   ├── jsconfig.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── src
│   │   ├── shadcn ui components & hooks & utils
│   ├── styles.css
│   ├── tailwind.config.js
│   └── vite.config.js
└── Readme.md
```


## Getting Started

1. Clone the repository:

```
git clone [https://github.com/yourusername/actfour-fitness.git](https://github.com/yourusername/actfour-fitness.git)

cd actfour-fitness
```
2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and visit `http://localhost:5173` to see the app running.

## Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `dist/` directory.

This project is build for the Upgrad FSD Hackathon 
