/** SEO metadata for batch 37 games. */

const gameRelated = [
  { href: "/games/", label: "Free online games" },
  { href: "/2048-game/", label: "2048" },
  { href: "/snake-game/", label: "Snake" },
];

export const batch37PageSeo = {
  "2048-game.html": {
    metaTitle: "2048 Game — Play 2048 Online Free",
    metaDescription: "Play 2048 in your browser. Use arrow keys or swipe to merge tiles and reach 2048. No download or signup.",
    keywords: "2048 game, play 2048 online, 2048 free, 2048 unblocked, number puzzle game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How do I move tiles?", a: "Use arrow keys on desktop or swipe on a phone. Tiles slide until they hit a wall or another tile." },
      { q: "Does this save my score?", a: "No. Scores stay in this tab until you refresh or start a new game." },
    ],
    related: [{ href: "/sudoku-game/", label: "Sudoku" }, { href: "/wordle-game/", label: "Wordle" }, ...gameRelated],
  },
  "snake-game.html": {
    metaTitle: "Snake Game — Play Classic Snake Online",
    metaDescription: "Free snake game in your browser. Eat food, grow longer, and avoid walls and your own tail.",
    keywords: "snake game, snake game online, play snake, google snake, classic snake game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "What controls does snake use?", a: "Arrow keys on a keyboard or the on-screen direction buttons on mobile." },
      { q: "Can I play on my phone?", a: "Yes. The board scales to your screen and touch buttons work in portrait mode." },
    ],
    related: [{ href: "/flappy-bird-game/", label: "Flappy Bird" }, { href: "/pong-game/", label: "Pong" }, ...gameRelated],
  },
  "tic-tac-toe.html": {
    metaTitle: "Tic Tac Toe — Play Online vs Computer",
    metaDescription: "Play tic tac toe against the computer. You are X and go first in this free X and O game.",
    keywords: "tic tac toe, tic tac toe online, play tic tac toe, noughts and crosses, x and o game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "Do I play first?", a: "Yes. You are X and tap a square on the 3×3 board before the computer plays O." },
      { q: "Is the computer unbeatable?", a: "It blocks immediate wins but is not perfect. You can win with good moves." },
    ],
    related: [{ href: "/connect-four/", label: "Connect Four" }, { href: "/rock-paper-scissors-game/", label: "Rock paper scissors" }, ...gameRelated],
  },
  "sudoku-game.html": {
    metaTitle: "Sudoku Game — Play Easy Sudoku Online",
    metaDescription: "Fill the Sudoku grid so each row, column, and 3×3 box has digits 1–9 once. Check your answers in the browser.",
    keywords: "sudoku game, play sudoku online, sudoku free, easy sudoku, sudoku puzzle online",
    sitemapPriority: "0.85",
    faqs: [
      { q: "Does it generate new puzzles?", a: "New puzzle reloads the same easy starter grid today. Use New puzzle to clear your entries and try again." },
      { q: "What does Check do?", a: "It compares your filled cells to the solution and tells you if anything is wrong or incomplete." },
    ],
    related: [{ href: "/2048-game/", label: "2048" }, { href: "/wordle-game/", label: "Wordle" }, ...gameRelated],
  },
  "wordle-game.html": {
    metaTitle: "Wordle Game — Guess the 5-Letter Word",
    metaDescription: "Wordle-style word game with six guesses. Green is the right letter in the right spot. Yellow is the right letter elsewhere.",
    keywords: "wordle game, wordle online, wordle free, wordle unlimited, 5 letter word game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "Is this the official Wordle?", a: "No. It is an original word-guess game with similar colour rules, played only on this page." },
      { q: "How many guesses do I get?", a: "Six. Each guess must be five letters. Use New word for another random answer." },
    ],
    related: [{ href: "/hangman-game/", label: "Hangman" }, { href: "/word-counter/", label: "Word counter" }, ...gameRelated],
  },
  "memory-game.html": {
    metaTitle: "Memory Game — Match Pairs Card Game Online",
    metaDescription: "Flip cards and match pairs in this free concentration memory game. Beat your move count on the 4×4 board.",
    keywords: "memory game, memory card game, concentration game, match pairs game, memory match online",
    sitemapPriority: "0.8",
    faqs: [
      { q: "How do I win?", a: "Flip two cards at a time. When both show the same emoji, they stay face up. Clear the whole board." },
      { q: "Does it track my best score?", a: "Only for this session. Refresh starts a new shuffle." },
    ],
    related: [{ href: "/simon-game/", label: "Simon game" }, { href: "/whack-a-mole/", label: "Whack-a-mole" }, ...gameRelated],
  },
  "hangman-game.html": {
    metaTitle: "Hangman Game — Guess the Word Online",
    metaDescription: "Free hangman: guess letters before you run out of lives. Random English words with on-screen keyboard.",
    keywords: "hangman game, hangman online, play hangman, word guessing game, hangman free",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How many wrong guesses?", a: "Six lives. Each wrong letter costs one life." },
      { q: "Are words suitable for kids?", a: "Words are general English nouns with no adult themes, but difficulty varies." },
    ],
    related: [{ href: "/wordle-game/", label: "Wordle" }, { href: "/word-counter/", label: "Word counter" }, ...gameRelated],
  },
  "minesweeper-game.html": {
    metaTitle: "Minesweeper Game — Play Beginner Minesweeper",
    metaDescription: "9×9 minesweeper with 10 mines. Left-click to reveal, right-click or long-press to flag. Runs in your browser.",
    keywords: "minesweeper game, minesweeper online, play minesweeper, minesweeper beginner, free minesweeper",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How do I flag a mine?", a: "Right-click on desktop or long-press a cell on touch screens." },
      { q: "Is the first click safe?", a: "Yes. Mines are placed after your first reveal so the opening click is never a mine." },
    ],
    related: [{ href: "/sudoku-game/", label: "Sudoku" }, { href: "/2048-game/", label: "2048" }, ...gameRelated],
  },
};