/** SEO metadata for batch 38 games. */

const gameRelated = [
  { href: "/games/", label: "Free online games" },
  { href: "/coin-flip/", label: "Coin flip" },
  { href: "/spin-the-wheel/", label: "Spin the wheel" },
];

export const batch38PageSeo = {
  "connect-four.html": {
    metaTitle: "Connect Four — Play Connect 4 Online",
    metaDescription: "Drop red discs and get four in a row before the computer. Free Connect Four game in your browser.",
    keywords: "connect four, connect 4 online, play connect four, four in a row game, connect four unblocked",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How do I drop a disc?", a: "Click the arrow above a column. The disc falls to the lowest free row in that column." },
      { q: "Who goes first?", a: "You play red and move first. The computer plays yellow." },
    ],
    related: [{ href: "/tic-tac-toe/", label: "Tic tac toe" }, { href: "/rock-paper-scissors-game/", label: "Rock paper scissors" }, ...gameRelated],
  },
  "rock-paper-scissors-game.html": {
    metaTitle: "Rock Paper Scissors — Play RPS Online",
    metaDescription: "Play rock paper scissors against the computer and track wins, losses, and draws.",
    keywords: "rock paper scissors, rock paper scissors online, rps game, play rock paper scissors",
    sitemapPriority: "0.8",
    faqs: [
      { q: "Is it truly random?", a: "The computer picks rock, paper, or scissors with equal chance each round." },
      { q: "What beats what?", a: "Rock beats scissors, scissors beat paper, paper beats rock." },
    ],
    related: [{ href: "/coin-flip/", label: "Coin flip" }, { href: "/dice-roller/", label: "Dice roller" }, ...gameRelated],
  },
  "whack-a-mole.html": {
    metaTitle: "Whack-a-Mole Game — 30 Second Arcade",
    metaDescription: "Click moles as they pop up for 30 seconds. Free whack-a-mole style browser game.",
    keywords: "whack a mole game, whack a mole online, mole game, arcade click game",
    sitemapPriority: "0.8",
    faqs: [
      { q: "How long is a round?", a: "30 seconds from when you press Start." },
      { q: "Can I play on mobile?", a: "Yes. Tap the cell where the mole appears." },
    ],
    related: [{ href: "/reaction-time-test/", label: "Reaction time test" }, { href: "/click-speed-test/", label: "Click speed test" }, ...gameRelated],
  },
  "simon-game.html": {
    metaTitle: "Simon Game — Simon Says Memory Online",
    metaDescription: "Watch the colour pattern and repeat it. Each round adds one step in this Simon memory game.",
    keywords: "simon game, simon says game, simon memory game, color memory game, simon online",
    sitemapPriority: "0.8",
    faqs: [
      { q: "How does difficulty increase?", a: "Every correct full sequence adds one random colour to the pattern." },
      { q: "Can I replay the pattern?", a: "Press Start again to begin a new sequence from level one." },
    ],
    related: [{ href: "/memory-game/", label: "Memory match" }, { href: "/reaction-time-test/", label: "Reaction time" }, ...gameRelated],
  },
  "number-guessing-game.html": {
    metaTitle: "Number Guessing Game — 1 to 100",
    metaDescription: "Guess the secret number from 1 to 100. The game says higher or lower until you find it.",
    keywords: "number guessing game, guess the number, higher or lower game, 1 to 100 game",
    sitemapPriority: "0.75",
    faqs: [
      { q: "Is the number always the same?", a: "No. New number picks a fresh random integer from 1 to 100." },
      { q: "What is a good score?", a: "Binary search usually finds it in about seven guesses or fewer." },
    ],
    related: [{ href: "/random-number/", label: "Random number" }, { href: "/yes-or-no/", label: "Yes or no" }, ...gameRelated],
  },
  "pong-game.html": {
    metaTitle: "Pong Game — Play Pong Online Free",
    metaDescription: "Classic pong arcade game in the browser. Move your paddle with the mouse or touch and score against the CPU.",
    keywords: "pong game, pong online, play pong, classic pong, arcade pong game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How do I move the paddle?", a: "Move the mouse over the canvas or drag your finger on touch screens." },
      { q: "Does speed increase?", a: "The ball speeds up slightly after each paddle hit." },
    ],
    related: [{ href: "/brick-breaker-game/", label: "Brick breaker" }, { href: "/flappy-bird-game/", label: "Flappy Bird" }, ...gameRelated],
  },
  "brick-breaker-game.html": {
    metaTitle: "Brick Breaker Game — Breakout Online",
    metaDescription: "Break all the bricks with the bouncing ball. Mouse or touch controls for this free breakout game.",
    keywords: "brick breaker game, breakout game, breakout online, brick breaker unblocked, arkanoid online",
    sitemapPriority: "0.85",
    faqs: [
      { q: "How do I launch the ball?", a: "Click or tap the canvas when the ball is sitting on the paddle." },
      { q: "What if I miss the ball?", a: "The round ends. Press New level to try again." },
    ],
    related: [{ href: "/pong-game/", label: "Pong" }, { href: "/snake-game/", label: "Snake" }, ...gameRelated],
  },
  "flappy-bird-game.html": {
    metaTitle: "Flappy Bird Game — Tap to Fly Online",
    metaDescription: "Tap or press space to dodge pipes in this Flappy Bird-style arcade game. Free and unblocked in your browser.",
    keywords: "flappy bird game, flappy bird online, flappy bird unblocked, tap bird game, fly bird game",
    sitemapPriority: "0.85",
    faqs: [
      { q: "What counts as a point?", a: "You score when you pass through a pipe gap without hitting the green columns." },
      { q: "Is this the original app?", a: "No. It is an original browser game inspired by the classic flap-and-dodge mechanic." },
    ],
    related: [{ href: "/snake-game/", label: "Snake" }, { href: "/whack-a-mole/", label: "Whack-a-mole" }, ...gameRelated],
  },
};