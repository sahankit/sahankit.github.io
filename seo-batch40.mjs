/** SEO metadata for batch 40 games. */

const gameRelated = [
  { href: "/games/", label: "Free online games" },
  { href: "/sudoku-game/", label: "Sudoku" },
  { href: "/2048-game/", label: "2048" },
];

export const batch40PageSeo = {
  "chess-game.html": {
    metaTitle: "Chess Game — Play Chess Online Free",
    metaDescription:
      "Play chess in your browser with standard rules: castling, en passant, promotion, check and checkmate. Two players or vs computer. No download.",
    keywords: "chess game, play chess online, free chess, chess online unblocked, chess vs computer, browser chess",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to play",
        paragraphs: [
          "Tap or click a piece to see legal moves, then tap a highlighted square to move. White moves first. Use Flip board if you prefer black at the bottom.",
          "In vs computer mode you play White. The computer plays a simple heuristic — good for casual games, not a master.",
        ],
      },
    ],
    faqs: [
      { q: "Does this follow real chess rules?", a: "Yes: legal moves only, castling, en passant, pawn promotion to queen, check, checkmate, and stalemate." },
      { q: "Can two people play on one phone?", a: "Choose Two players (same screen) in the mode menu." },
      { q: "Is there a clock or rating?", a: "No timer or Elo rating. It is a casual board for practice and fun." },
    ],
    related: [
      { href: "/tic-tac-toe/", label: "Tic tac toe" },
      { href: "/connect-four/", label: "Connect four" },
      ...gameRelated,
    ],
  },
};