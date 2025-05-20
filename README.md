# Minesweeper

Minesweeper built with React. Features a difficulty selector, share codes, undo, timer, mine counter, and help/GitHub links. <br />
**Share codes** with friends to play the same puzzles as them to see who's the best!

## Try it out [here!](https://wizhe.github.io/minesweeper/)
![image](https://github.com/user-attachments/assets/81403214-4d83-4f80-ae84-4523a881099c)


---

## Table of Contents

* [Usage](#usage)
* [Features](#features)
* [Add to Home Screen (IOS)](#add-to-home-screen-ios)
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

## Add to Home Screen (IOS)
To add to home screen as an app:
1. In Safari, go to [**https://wizhe.github.io/minesweeper/**](https://wizhe.github.io/minesweeper/)
2. Tap on the Share icon
  > <img src="https://github.com/user-attachments/assets/4687a594-6652-42ad-bdd1-490458e77fe1" width="293px" height="98px">
3. Tap on **Add to Home Screen**
  > <img src="https://github.com/user-attachments/assets/be1ec5af-e862-4734-8b49-75fc36a50abf" width="293px" height="194px">

Now on you home screen, you'll have a new app, 'Minesweeper'! 
> <img src="https://github.com/user-attachments/assets/b5620c0d-5c04-45b7-a37f-966ce94100a2" width="293px" height="597px">
> <img src="https://github.com/user-attachments/assets/bc68a308-f8aa-4cff-b07c-56279a5a1c74" width="293px" height="597px">




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
