# Minesweeper

Minesweeper built with React. Features a difficulty selector, share codes, undo, timer, mine counter, and help/GitHub links. <br />
**Share codes** with friends to play the same puzzles as them to see who's the best!

## Try it out [here!](https://wizhe.github.io/minesweeper/)
![image](https://github.com/user-attachments/assets/81403214-4d83-4f80-ae84-4523a881099c)


---

## Table of Contents

* [Usage](#usage)
* [Features](#features)
* [Getting Started](#getting-started)

---


## Usage

1. **Select Difficulty**: click to change difficulty, randomize, or try out the Daily Challenge!
2. **Play**: left-click/tap a cell to reveal it, right-click/hold a cell to flag it
3. **Undo**: don't worry, if you reveal a mine, you can undo it! (Adds 10 seconds to the timer though)
4. **Share**: copy a share code from the share box to challenge your friends!
5. **Load**: paste a share code and click "Load" to play the same puzzle!
6. **New Game**: click to generate a new game (with the same dimensions and mine count)


---

## Features

* **Difficulty Selector** (Easy, Medium, Hard, Extra Hard)
* **Random** game button
* **Daily** Challenge with statistics (number of clears, average clear time, perfect clear percentage, no-flag clear percentage)
* **Share/Load Code**: generate and paste codes to reproduce games
* **Undo Move** with penalty (adds 10 seconds to timer)
* **Timer, Win/Lose Banner, & Bomb Counter**
* **Floating Help & GitHub Links** always visible


---

## Getting Started

### Deployed Version
You can visit the deployed verion at [**https://wizhe.github.io/minesweeper/**](https://wizhe.github.io/minesweeper/) !

### Local Version
### Prerequisites

- **Node.js** v14 or later  
- **npm** v6+ (or **Yarn**)  
- **Git**

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/wizhe/minesweeper.git
   cd minesweepeer
   ```
2. Install dependencies
3. From the project root (uses npm workspaces for engine + web):
   ```bash
   npm install
   # or
   yarn install
   ```
   
### Running the App

1. Start the development server
   ```bash
   cd web
   
   npm start
   # or
   yarn start
   ```

2. Open in your browser
   Navigate to http://localhost:3000.

---


## License

This project is licensed under the [MIT License](LICENSE).
Feel free to use and adapt it.
