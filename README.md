# Minesweeper

Minesweeper built with React. Features a difficulty selector, share codes, undo, timer, mine counter, and help/GitHub links. <br />
**Share codes** with friends to play the same puzzles as them to see who's the best!

## Try it out [here!](https://wizhe.github.io/minesweeper/)
> ![image](https://github.com/user-attachments/assets/aa0322e7-605d-41f2-9996-93eb396bc952)

---

## Table of Contents

* [Features](#features)
* [Usage](#usage)
* [Getting Started](#getting-started)
* [License](#license)

---

## Features

* **Difficulty Selector** (Easy, Medium, Hard, Extra Hard)
* **Random New Game** button
* **Share/Load Code**: generate and paste codes to reproduce games
* **Undo Move** with configurable penalty (by default adds 5s to timer)
* **Timer & Bomb Counter** (Status Bar)
* **Win/Lose Banner** displays upon game end
* **Floating Help & GitHub Links** always visible

---


## Usage

1. **Select Difficulty**: click to change difficulty or randomize.
2. **Play**: click cells to reveal, right-click to flag.
3. **Undo**: revert mine reveal (adds 5s to the timer).
4. **Share**: copy code from the share box.
5. **Load**: paste a code and click "Load" to play.
6. **New Game**: click to generate a new game with the same dimensions and mine count.


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