export const batch20PageSeo = {
  "video-to-mp3.html": {
    metaTitle: "Video to MP3 Converter — Free Online (Browser, No Upload)",
    metaDescription:
      "Convert video to MP3 locally in your browser. Upload MP4, WebM, or MOV from your device—WebAssembly ffmpeg, private, no server upload.",
    keywords:
      "video to mp3 converter, convert video to mp3 online free, extract audio from video browser, mp4 to mp3 no upload",
    howTo: {
      name: "Convert a video file to MP3 in the browser",
      description: "Use ffmpeg.wasm on your device to extract an MP3 track from a local video.",
      steps: [
        { name: "Choose a video file", text: "Select MP4, WebM, MOV, or another video saved on your phone or computer." },
        { name: "Pick MP3 quality", text: "192 kbps is a good default; use 128 kbps for smaller files or 320 kbps for music." },
        { name: "Convert and download", text: "Wait for the encoder to load once, then save the MP3. The file never leaves your browser." },
      ],
    },
    sections: [
      {
        h2: "Private video to MP3 conversion",
        paragraphs: [
          "This tool is for files you already have on your device. ffmpeg runs as WebAssembly inside Chrome, Edge, or Firefox—Sahankit does not receive your video.",
          "It does not download from YouTube, Instagram, or TikTok URLs. Use platform-approved methods to obtain video first, then convert here if you have the rights.",
        ],
      },
    ],
    faqs: [
      { q: "Is my video uploaded?", a: "No. Encoding happens locally after you pick a file." },
      { q: "Why is the first conversion slow?", a: "The browser downloads the ffmpeg WASM bundle once (about 25 MB)." },
      { q: "Can I convert YouTube to MP3?", a: "Not here. Paste links do not work—only local files from the file picker." },
    ],
    related: [
      { href: "/image-converter/", label: "Image converter" },
      { href: "/pdf-merge/", label: "Merge PDF" },
    ],
  },
};
