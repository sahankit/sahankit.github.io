/** SEO metadata for batch 34 tools. */

export const batch34PageSeo = {
  "internet-speed-test.html": {
    metaTitle: "Internet Speed Test — Check Your Wi-Fi & Broadband Speed",
    metaDescription:
      "Free internet speed test: check download and upload speed in Mbps, ping and jitter for Wi-Fi, broadband, 4G and 5G. One click, no app, results in about 20 seconds.",
    keywords:
      "internet speed test, speed test, wifi speed test, broadband speed test, check internet speed, net speed test, mbps test, ping test, upload speed test",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "What your results mean",
        list: [
          "<strong>Download (Mbps)</strong> — how fast data reaches you: streaming, browsing, downloads. Most plans are sold by this number.",
          "<strong>Upload (Mbps)</strong> — how fast you send data: video calls, uploading files, live streaming.",
          "<strong>Ping (ms)</strong> — the delay for a round trip to the server. Under 30 ms feels instant; under 60 ms is fine for gaming.",
          "<strong>Jitter (ms)</strong> — how much ping varies. Low jitter (under 10 ms) means smooth calls and games.",
        ],
      },
      {
        h2: "How much speed do you need?",
        list: [
          "Browsing and email: 3–5 Mbps",
          "HD video (1080p) and video calls: 5–10 Mbps per device",
          "4K streaming: 25 Mbps per stream",
          "Working from home with a family: 50–100 Mbps or more",
          "Online gaming: speed matters less than low ping and jitter",
        ],
        paragraphs: [
          "The test downloads and uploads data over several connections for about eight seconds each, ignoring the first moments while the connection speeds up. For the most accurate result, use a cable or sit near the router, and pause other downloads and streaming.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my speed lower than my plan?", a: "Wi-Fi distance and walls, other devices using the connection, older routers and VPNs all reduce speed. Test with a cable next to the router to see your line’s real speed." },
      { q: "What is the difference between Mbps and MB/s?", a: "Internet speed is measured in megabits per second (Mbps). Divide by 8 to get megabytes per second: 100 Mbps ≈ 12.5 MB/s." },
      { q: "How much data does the test use?", a: "It depends on your speed: around 20–50 MB on a typical connection and up to a few hundred MB on gigabit fibre." },
    ],
    related: [
      { href: "/mbps-to-mbs/", label: "Mbps to MB/s" },
      { href: "/download-time-calculator/", label: "Download time calculator" },
      { href: "/what-is-my-ip/", label: "What is my IP" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "compress-pdf.html": {
    metaTitle: "Compress PDF Online Free — Reduce PDF Size (No Upload)",
    metaDescription:
      "Compress PDF files to a smaller size for email and form uploads. Choose strong, recommended or lossless compression—processed in your browser, never uploaded.",
    keywords:
      "compress pdf, reduce pdf size, pdf compressor, compress pdf online, shrink pdf, pdf size reducer, compress pdf to 200kb, compress pdf to 1mb, make pdf smaller",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Which compression level should I choose?",
        list: [
          "<strong>Recommended</strong> — the best balance for most scanned documents, certificates and forms. Text stays sharp on screen and when printed at normal size.",
          "<strong>Strong</strong> — the smallest file, for strict upload limits (for example 100–300 KB on government and exam portals).",
          "<strong>Light</strong> — higher quality for documents with small print or detailed images.",
          "<strong>Lossless</strong> — keeps text selectable, links and form fields; it only optimises the file structure, so savings are smaller.",
        ],
      },
      {
        h2: "How it works and why it’s private",
        paragraphs: [
          "Strong, Recommended and Light redraw each page and save it as a compressed JPEG image inside a new PDF. This shrinks scanned PDFs dramatically, but the text becomes part of the image and can’t be selected or searched. Lossless mode rewrites the PDF with compact object streams and keeps everything else unchanged.",
          "Everything runs on your device using open-source PDF libraries, so confidential documents like ID proofs, bank statements and certificates never leave your computer or phone.",
        ],
      },
    ],
    faqs: [
      { q: "How can I compress a PDF to under 200 KB?", a: "Choose Strong. If it is still too big, split the PDF and upload only the required pages, or reduce the number of pages scanned." },
      { q: "Why did my PDF not get smaller?", a: "PDFs that are mostly text are already compact; turning them into images can make them bigger. Use Lossless mode, or keep the original." },
      { q: "Is there a file size or page limit?", a: "There’s no fixed limit, but very large PDFs (hundreds of pages) need more memory and time on phones." },
    ],
    related: [
      { href: "/pdf-merge/", label: "Merge PDF" },
      { href: "/split-pdf/", label: "Split PDF" },
      { href: "/pdf-to-jpg/", label: "PDF to JPG" },
      { href: "/reduce-image-size-in-kb/", label: "Reduce image size in KB" },
    ],
  },
  "pdf-to-jpg.html": {
    metaTitle: "PDF to JPG Converter — Free, High Quality, No Upload",
    metaDescription:
      "Convert PDF to JPG online for free. Turn every page—or just the pages you pick—into JPG, PNG or WebP images up to 300 dpi, then download all as a ZIP.",
    keywords:
      "pdf to jpg, pdf to image, convert pdf to jpg, pdf to png, pdf to jpeg converter, pdf page to image, pdf to jpg high quality, save pdf as image",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to convert PDF to JPG",
        list: [
          "Choose your PDF file.",
          "Pick JPG for small files, PNG for sharp text and diagrams, or WebP for the smallest modern format.",
          "Choose 150 dpi for screens and sharing, or 300 dpi for printing.",
          "Optionally enter pages such as <code>1-3, 5</code>, then press <strong>Convert to images</strong>.",
          "Download pages one by one or all together as a ZIP file.",
        ],
      },
      {
        h2: "Private and fast",
        paragraphs: [
          "Pages are rendered with Mozilla’s PDF.js engine inside your browser, so your PDF is never uploaded. That makes it safe for certificates, marksheets, invoices and ID documents, and it works offline once loaded.",
        ],
      },
    ],
    faqs: [
      { q: "What resolution should I choose?", a: "150 dpi is ideal for WhatsApp, email and websites. Choose 300 dpi if you plan to print the images." },
      { q: "Can I convert only one page?", a: "Yes. Type the page number in the Pages box, for example 2." },
      { q: "Does it work for scanned PDFs?", a: "Yes. Each page is saved exactly as it looks, whether it contains text or scanned images." },
    ],
    related: [
      { href: "/jpg-to-pdf/", label: "JPG to PDF" },
      { href: "/compress-pdf/", label: "Compress PDF" },
      { href: "/pdf-to-word/", label: "PDF to Word" },
      { href: "/image-compress/", label: "Compress image" },
    ],
  },
  "reduce-image-size-in-kb.html": {
    metaTitle: "Reduce Image Size in KB — Compress Photo to 20KB, 50KB",
    metaDescription:
      "Compress a photo or signature to an exact size in KB—20 KB, 50 KB, 100 KB or any target—for SSC, UPSC, bank, passport and job form uploads. Free, private, instant.",
    keywords:
      "reduce image size in kb, compress image to 20kb, compress image to 50kb, photo size reducer, resize image in kb, compress jpeg to 100kb, reduce photo size, image size reducer",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Perfect for online application forms",
        paragraphs: [
          "Exam, job and government portals often limit uploads—for example a photo of 20–50 KB and a signature of 10–20 KB, sometimes at a fixed pixel size such as 200 × 230 px. Choose your image, type the KB limit, optionally enter the required width and height, and press <strong>Reduce size</strong>.",
          "The tool searches for the highest JPEG quality that fits under your target. If even low quality is too big, it gently scales the image down until it fits—so you get the best-looking photo that meets the limit.",
        ],
      },
      {
        h2: "Tips for a clear result",
        list: [
          "Crop to the face or signature first—fewer pixels means better quality at the same size.",
          "Use JPG for photos; most forms accept only JPG/JPEG.",
          "If a form needs a minimum size too (e.g. 10–20 KB), set the target near the top of the range.",
          "Check the pixel size the form asks for and enter it under “exact size in pixels”.",
        ],
      },
    ],
    faqs: [
      { q: "Will my photo be uploaded?", a: "No. Compression happens in your browser; the photo never leaves your device." },
      { q: "Why can’t it reach my target?", a: "Very small targets combined with a large fixed pixel size may be impossible. Increase the KB target or reduce the width and height." },
      { q: "Can I convert PNG to JPG at the same time?", a: "Yes. Any image you choose is saved as JPG (or WebP), with transparent areas filled white." },
    ],
    related: [
      { href: "/image-cropper/", label: "Crop image" },
      { href: "/image-resizer/", label: "Image resizer" },
      { href: "/passport-size-photo/", label: "Passport size photo" },
      { href: "/signature-maker/", label: "Signature maker" },
    ],
  },
  "passport-size-photo.html": {
    metaTitle: "Passport Size Photo Maker Online — 35×45 mm & 2×2 inch",
    metaDescription:
      "Make passport size photos online: India 35×45 mm, US 2×2 inch, PAN card and visa sizes. Align your face with a guide, then get a 300 dpi photo or print sheet.",
    keywords:
      "passport size photo, passport photo maker, passport size photo online, 35x45 mm photo, 2x2 photo, passport photo maker india, pan card photo size, passport photo print sheet",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Common passport photo sizes",
        list: [
          "<strong>India passport:</strong> 35 × 45 mm (3.5 × 4.5 cm), white background, face covering most of the frame",
          "<strong>US passport and visa, India visa/OCI:</strong> 2 × 2 inches (51 × 51 mm)",
          "<strong>UK, Schengen/EU, Australia:</strong> 35 × 45 mm",
          "<strong>PAN card / stamp size:</strong> 25 × 35 mm (2.5 × 3.5 cm)",
          "<strong>Canada passport:</strong> 50 × 70 mm",
        ],
        paragraphs: [
          "Rules change and vary by application, so always check the latest official guidelines before submitting.",
        ],
      },
      {
        h2: "How to make and print your photo",
        list: [
          "Take a photo facing the camera in good light against a plain white or light wall.",
          "Upload it, drag to centre your face and use Zoom so the head fits between the guide lines.",
          "Download the single photo (saved at 300 dpi) for online applications.",
          "Or download a print sheet—up to 8 photos on 4 × 6 inch paper—and print it at any photo shop at 100% size.",
        ],
      },
    ],
    faqs: [
      { q: "Can it change my background to white?", a: "No. Use a plain light background when taking the photo; the tool crops, resizes and lays out the photo but does not remove backgrounds." },
      { q: "How do I print at the right size?", a: "Print the sheet on 4 × 6 inch photo paper at 100% / actual size. Do not choose “fit to page”." },
      { q: "Is my photo uploaded anywhere?", a: "No. All editing happens in your browser." },
    ],
    related: [
      { href: "/reduce-image-size-in-kb/", label: "Reduce image size in KB" },
      { href: "/image-cropper/", label: "Crop image" },
      { href: "/signature-maker/", label: "Signature maker" },
      { href: "/image-resizer/", label: "Image resizer" },
    ],
  },
  "signature-maker.html": {
    metaTitle: "Signature Maker — Create Online Signature (Transparent PNG)",
    metaDescription:
      "Create your digital signature online: draw it with mouse or finger, or type it in handwriting fonts. Download a transparent PNG to sign PDFs, documents and forms.",
    keywords:
      "signature maker, online signature, create signature, digital signature generator, draw signature, signature generator, e signature, transparent signature png, handwritten signature",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Draw or type your signature",
        paragraphs: [
          "<strong>Draw</strong> with a mouse, trackpad, stylus or your finger on a phone—strokes are smoothed so they look natural. Use Undo to remove the last stroke. <strong>Type</strong> your name and pick from six handwriting fonts for a neat typed signature.",
          "Download a <strong>transparent PNG</strong> to place over documents in Word, Google Docs or PDF editors, or a <strong>JPG with a white background</strong> for forms that require JPG. The image is trimmed to your signature and saved at high resolution.",
        ],
      },
      {
        h2: "Using your signature on forms",
        list: [
          "Exam and job portals often want a JPG signature of 10–20 KB—use the Reduce image size tool after downloading.",
          "Blue or black ink is accepted almost everywhere.",
          "An image of a signature is not the same as a certificate-based digital signature (DSC) used for official e-filing.",
        ],
      },
    ],
    faqs: [
      { q: "Is the signature saved or uploaded?", a: "No. It exists only in your browser until you download it." },
      { q: "Is an image signature legally valid?", a: "Many organisations accept scanned or drawn signatures for everyday documents, but legal requirements vary. Check with the receiving party for contracts and official filings." },
      { q: "Why does the typed font look plain at first?", a: "Handwriting fonts load from Google Fonts the first time you open Type mode; give it a second on slow connections." },
    ],
    related: [
      { href: "/reduce-image-size-in-kb/", label: "Reduce image size in KB" },
      { href: "/passport-size-photo/", label: "Passport size photo" },
      { href: "/pdf-merge/", label: "Merge PDF" },
      { href: "/image-converter/", label: "Image converter" },
    ],
  },
  "meme-generator.html": {
    metaTitle: "Meme Generator — Make Memes Online Free, No Watermark",
    metaDescription:
      "Make a meme in seconds: upload or paste any image, add bold top and bottom text, adjust size and colour, and download as JPG or PNG. Free, no watermark, no sign-up.",
    keywords:
      "meme generator, meme maker, make a meme, create meme online, meme template, add text to image, impact font meme, meme creator free",
    sections: [
      {
        h2: "How to make a meme",
        list: [
          "Upload an image—or paste a screenshot with Ctrl+V. No image? Use the blank background.",
          "Type the top and bottom captions. Long lines wrap automatically.",
          "Adjust text size and colour; ALL CAPS gives the classic look.",
          "Download as JPG for sharing or PNG for the best quality.",
        ],
      },
      {
        h2: "Classic meme style",
        paragraphs: [
          "Memes traditionally use Impact, a heavy condensed font, in white with a thick black outline so text stays readable on any picture. This tool uses Impact where available and falls back to similar bold fonts on other devices. Images stay on your device and the result has no watermark.",
        ],
      },
    ],
    faqs: [
      { q: "Does the meme have a watermark?", a: "No. You get a clean image at your photo’s resolution (up to 1200 px)." },
      { q: "Can I use it on my phone?", a: "Yes. Pick a photo from your gallery, type the text and download the meme." },
      { q: "Are my images uploaded?", a: "No. Everything happens in your browser." },
    ],
    related: [
      { href: "/image-cropper/", label: "Crop image" },
      { href: "/fancy-text-generator/", label: "Fancy text generator" },
      { href: "/image-resizer/", label: "Image resizer" },
      { href: "/image-compress/", label: "Compress image" },
    ],
  },
  "image-color-picker.html": {
    metaTitle: "Image Color Picker — Get HEX Code from Image Online",
    metaDescription:
      "Find the exact colour in any image: upload or paste a picture, click to get HEX, RGB and HSL codes, and extract the main colour palette. Free, works on phones.",
    keywords:
      "image color picker, color picker from image, get color from image, hex color from image, eyedropper online, color code from picture, extract colors from image, palette from image",
    sections: [
      {
        h2: "Pick any colour from a photo or screenshot",
        paragraphs: [
          "Upload an image or paste a screenshot, then hover to see a magnified view and click the exact pixel you want. You get the colour in HEX (for CSS and design tools), RGB and HSL—click any value to copy it. Every colour you pick is kept in a history row.",
          "In Chrome and Edge you can also use <strong>Pick from anywhere on screen</strong> to grab a colour from outside the browser, such as another app.",
        ],
      },
      {
        h2: "Automatic colour palette",
        paragraphs: [
          "The tool also finds the eight most common distinct colours in your image—handy for building a brand palette from a logo, matching a website to a photo, or choosing paint colours. Click a swatch to copy its HEX code.",
        ],
      },
    ],
    faqs: [
      { q: "Is the colour exact?", a: "Yes—it reads the actual pixel. Very large images are scaled to 2000 px, which can blend neighbouring pixels slightly." },
      { q: "Can I paste a screenshot?", a: "Yes. Press Ctrl+V (Cmd+V on Mac) anywhere on the page." },
      { q: "Is my image uploaded?", a: "No. It is processed only in your browser." },
    ],
    related: [
      { href: "/color-picker/", label: "Color picker" },
      { href: "/rgb-hex-converter/", label: "RGB to HEX" },
      { href: "/color-contrast-checker/", label: "Contrast checker" },
      { href: "/gradient-generator/", label: "Gradient generator" },
    ],
  },
  "favicon-generator.html": {
    metaTitle: "Favicon Generator — favicon.ico from Text, Emoji or Image",
    metaDescription:
      "Create a website favicon from letters, an emoji or an image. Download favicon.ico, PNGs from 16 to 512 px, an Apple touch icon, web manifest and HTML tags.",
    keywords:
      "favicon generator, favicon maker, create favicon, favicon ico generator, png to ico, emoji favicon, apple touch icon generator, website icon generator",
    sections: [
      {
        h2: "What’s in the favicon package",
        list: [
          "<strong>favicon.ico</strong> — contains 16, 32 and 48 px icons for every browser",
          "<strong>favicon-16x16.png</strong> and <strong>favicon-32x32.png</strong> — modern PNG favicons",
          "<strong>apple-touch-icon.png</strong> (180 px) — iPhone and iPad home screen",
          "<strong>android-chrome-192x192.png</strong> and <strong>512x512.png</strong> — Android and installable web apps",
          "<strong>site.webmanifest</strong> and the HTML tags to paste into your page",
        ],
      },
      {
        h2: "Tips for a great favicon",
        paragraphs: [
          "Favicons are tiny—often 16 pixels—so keep them simple: one or two letters, a single emoji, or a bold logo mark with strong contrast. Preview the browser-tab mockup to check it’s readable. Upload the files to your site’s root folder, add the tags to every page’s &lt;head&gt;, and clear your browser cache to see the new icon.",
        ],
      },
    ],
    faqs: [
      { q: "Do I still need favicon.ico?", a: "It’s still the most compatible option, and some tools request /favicon.ico automatically. Include both the ICO and PNG files." },
      { q: "Can I convert a PNG to ICO?", a: "Yes. Choose Image, upload your PNG, then download favicon.ico." },
      { q: "Why doesn’t my new favicon show?", a: "Browsers cache favicons aggressively. Hard-refresh, open the favicon URL directly, or test in a private window." },
    ],
    related: [
      { href: "/meta-tag-generator/", label: "Meta tag generator" },
      { href: "/open-graph-tag-generator/", label: "Open Graph tags" },
      { href: "/image-converter/", label: "Image converter" },
      { href: "/html-formatter/", label: "HTML formatter" },
    ],
  },
  "speech-to-text.html": {
    metaTitle: "Speech to Text Online — Free Voice Typing in Hindi & English",
    metaDescription:
      "Type with your voice for free: speech to text in English, Hindi, Tamil, Telugu, Bengali, Marathi and more. Live transcript, spoken punctuation, copy or download.",
    keywords:
      "speech to text, voice typing, voice to text, dictation online, hindi voice typing, speech recognition online, talk to text, voice typing in english, audio to text live",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to use voice typing",
        list: [
          "Choose your language—English (India, US or UK), Hindi or another Indian or world language.",
          "Press <strong>Start dictation</strong> and allow microphone access.",
          "Speak naturally. Grey text shows what’s being recognised; it becomes final when you pause.",
          "In English, say “comma”, “full stop”, “question mark” or “new line” to add punctuation.",
          "Edit the transcript, then copy it or download it as a .txt file.",
        ],
      },
      {
        h2: "Browser support and privacy",
        paragraphs: [
          "Voice typing uses your browser’s built-in speech recognition: Google Chrome and Microsoft Edge on computers and Android, and Safari on iPhone and iPad. Firefox doesn’t support it yet. In Chrome, audio is sent to Google’s speech service to be transcribed; your transcript stays in this page until you copy or download it.",
        ],
      },
    ],
    faqs: [
      { q: "Does it work in Hindi?", a: "Yes. Choose हिन्दी Hindi from the language list and speak; the text appears in Devanagari." },
      { q: "Why does it stop listening?", a: "Browsers end recognition after silence. The tool restarts automatically while dictation is on; press Stop when you’re done." },
      { q: "Can I transcribe an audio file?", a: "Not directly—this tool listens to your microphone in real time." },
    ],
    related: [
      { href: "/text-to-speech/", label: "Text to speech" },
      { href: "/online-notepad/", label: "Online notepad" },
      { href: "/word-counter/", label: "Word counter" },
      { href: "/mic-test/", label: "Mic test" },
    ],
  },
  "voice-recorder.html": {
    metaTitle: "Online Voice Recorder — Record Audio Free, Download WAV",
    metaDescription:
      "Record audio online with your microphone. Live level meter, pause and resume, instant playback, and download as WebM or WAV. Free, unlimited and private.",
    keywords:
      "voice recorder, online voice recorder, audio recorder online, record audio, record voice online, mic recorder, sound recorder, record audio wav",
    sections: [
      {
        h2: "Record in three clicks",
        paragraphs: [
          "Press <strong>Start recording</strong>, allow microphone access and speak—the level bar shows your input volume. Pause and resume as often as you like, then press <strong>Stop</strong>. Each recording appears in a list where you can play it back, download it, or delete it.",
          "Recordings are saved in your browser’s native format (WebM/Opus in Chrome, Edge and Firefox; M4A in Safari). Choose <strong>Download WAV</strong> for an uncompressed file that opens in any audio editor or media player.",
        ],
      },
      {
        h2: "Tips for clear recordings",
        list: [
          "Pick a headset or USB microphone from the list for better sound than a laptop mic.",
          "Keep the level bar mostly in the green; red means too loud.",
          "Record in a quiet room with soft furnishings to reduce echo.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a time limit?", a: "No fixed limit. Long recordings use more memory, so download them before closing the tab." },
      { q: "Can I download MP3?", a: "Browsers can’t encode MP3 natively. Download WAV and convert it if you need MP3." },
      { q: "Are recordings uploaded?", a: "No. They stay in this browser tab and are discarded when you close it." },
    ],
    related: [
      { href: "/mic-test/", label: "Mic test" },
      { href: "/screen-recorder/", label: "Screen recorder" },
      { href: "/speech-to-text/", label: "Speech to text" },
      { href: "/video-to-mp3/", label: "Video to MP3" },
    ],
  },
  "screen-recorder.html": {
    metaTitle: "Free Online Screen Recorder — With Audio, No Watermark",
    metaDescription:
      "Record your screen online for free: full screen, a window or a browser tab, with system audio and microphone. No download, no watermark, no time limit.",
    keywords:
      "screen recorder, online screen recorder, record screen, free screen recorder, screen recording with audio, record browser tab, screen capture video, no watermark screen recorder",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to record your screen",
        list: [
          "Tick whether to include tab/system audio and your microphone.",
          "Press <strong>Start recording</strong> and choose the entire screen, a window or a browser tab.",
          "Do what you want to capture—a tutorial, presentation, bug report or game clip.",
          "Press <strong>Stop recording</strong> (or “Stop sharing” in the browser bar), preview the video and download it.",
        ],
      },
      {
        h2: "Audio, formats and support",
        paragraphs: [
          "Chrome and Edge can capture audio from a browser tab, and on Windows from the whole system; macOS only allows tab audio. Add your microphone to narrate. Videos are saved as WebM (or MP4 where the browser supports it), which plays in Chrome, Edge, Firefox and VLC and uploads directly to YouTube.",
          "Screen recording requires a desktop browser—mobile browsers don’t allow websites to capture the screen.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a watermark or time limit?", a: "Neither. Recording length is limited only by your device’s memory." },
      { q: "Why is there no sound?", a: "Make sure you ticked “Share tab audio” or “Share system audio” in the browser’s sharing dialog. macOS only supports tab audio." },
      { q: "Is my recording uploaded?", a: "No. The video is created and stored in your browser until you download it." },
    ],
    related: [
      { href: "/voice-recorder/", label: "Voice recorder" },
      { href: "/webcam-test/", label: "Webcam test" },
      { href: "/video-to-mp3/", label: "Video to MP3" },
      { href: "/mic-test/", label: "Mic test" },
    ],
  },
  "guitar-tuner.html": {
    metaTitle: "Online Guitar Tuner — Free Mic Tuner (Standard EADGBE)",
    metaDescription:
      "Tune your guitar online with your microphone: standard EADGBE, drop D, bass, ukulele, violin or chromatic mode. Accurate needle display and reference tones.",
    keywords:
      "guitar tuner, online guitar tuner, tune guitar, guitar tuner microphone, chromatic tuner, bass tuner, ukulele tuner, violin tuner, eadgbe tuner",
    sections: [
      {
        h2: "How to tune your guitar",
        list: [
          "Choose your instrument and tuning, press <strong>Start tuner</strong> and allow the microphone.",
          "Pluck one string and let it ring. The tuner finds the nearest string and shows the note.",
          "If the needle is left (too low), tighten the string; if it is right (too high), loosen it.",
          "When the display turns green (within ±5 cents), move to the next string.",
        ],
        paragraphs: [
          "Standard guitar tuning from thickest to thinnest string is E2 (82.41 Hz), A2 (110 Hz), D3 (146.83 Hz), G3 (196 Hz), B3 (246.94 Hz) and E4 (329.63 Hz).",
        ],
      },
      {
        h2: "Tuning tips",
        list: [
          "Tune up to the note rather than down—strings hold pitch better.",
          "Tune in a quiet room and keep the phone or laptop mic close to the sound hole.",
          "Tap a string button to hear a reference tone and tune by ear.",
          "Change A4 from 440 Hz only if your band or recording uses a different reference.",
        ],
      },
    ],
    faqs: [
      { q: "Does it work on my phone?", a: "Yes—in Chrome, Safari and other modern mobile browsers. Allow microphone access when asked." },
      { q: "What is a cent?", a: "One hundredth of a semitone. Most people can’t hear differences under about 5 cents." },
      { q: "Is my audio recorded?", a: "No. Sound is analysed live in your browser and never stored or uploaded." },
    ],
    related: [
      { href: "/metronome/", label: "Metronome" },
      { href: "/mic-test/", label: "Mic test" },
      { href: "/voice-recorder/", label: "Voice recorder" },
      { href: "/countdown-timer/", label: "Countdown timer" },
    ],
  },
  "metronome.html": {
    metaTitle: "Online Metronome — Free, Accurate, with Tap Tempo",
    metaDescription:
      "Free online metronome from 30 to 300 BPM with tap tempo, time signatures, accented downbeat and eighth, triplet and sixteenth subdivisions. Works on any device.",
    keywords:
      "metronome, online metronome, free metronome, metronome bpm, tap tempo, click track, metronome 120 bpm, practice metronome, drum metronome",
    sections: [
      {
        h2: "Rock-steady timing",
        paragraphs: [
          "Clicks are scheduled ahead of time with the Web Audio API, so the beat stays precise even if your device is busy. Choose 30–300 BPM with the slider or +/− buttons, or tap the tempo of a song with <strong>Tap tempo</strong>. Set beats per bar for 3/4, 4/4, 6/8 and odd meters, add subdivisions, and accent the first beat.",
        ],
      },
      {
        h2: "Tempo markings",
        list: [
          "Largo: 40–60 BPM",
          "Adagio: 66–76 BPM",
          "Andante: 76–108 BPM (walking pace)",
          "Moderato: 108–120 BPM",
          "Allegro: 120–168 BPM",
          "Presto: 168–200 BPM",
        ],
        paragraphs: [
          "Practice tip: start slowly enough to play cleanly, then raise the tempo 2–5 BPM at a time.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use keyboard shortcuts?", a: "Yes: Space to start or stop, T to tap the tempo, and the left and right arrows to change BPM." },
      { q: "Why can’t I hear anything on iPhone?", a: "Turn off silent mode with the side switch and raise the volume; iOS mutes web audio in silent mode." },
      { q: "Does it keep running in the background?", a: "Usually yes, but some phones pause audio when the screen locks. Keep the screen on during practice." },
    ],
    related: [
      { href: "/guitar-tuner/", label: "Guitar tuner" },
      { href: "/stopwatch/", label: "Stopwatch" },
      { href: "/pomodoro-timer/", label: "Pomodoro timer" },
      { href: "/countdown-timer/", label: "Countdown timer" },
    ],
  },
  "online-alarm-clock.html": {
    metaTitle: "Online Alarm Clock — Set an Alarm Free (with Snooze)",
    metaDescription:
      "Set an online alarm clock in seconds: large live clock, multiple alarms with labels, four sounds, snooze and optional desktop notifications. Free, no app needed.",
    keywords:
      "online alarm clock, alarm clock, set alarm, alarm online, wake me up, online alarm with sound, alarm clock with snooze, set an alarm for",
    sections: [
      {
        h2: "How to set an alarm",
        list: [
          "Choose the alarm time and a sound, and add a label if you like.",
          "Press <strong>Set alarm</strong>. The list shows how long until it rings.",
          "Leave this tab open. When it rings, choose Snooze (5 minutes) or Stop alarm.",
        ],
        paragraphs: [
          "Press Test sound first to check your volume. Turn on notifications to also get a pop-up when the alarm rings while you’re in another app.",
        ],
      },
      {
        h2: "Make sure it rings",
        list: [
          "Keep the tab open—closing it or the browser cancels alarms.",
          "Stop your computer from sleeping, or tick “Keep the screen awake”.",
          "Check the device isn’t muted; the alarm plays at system volume.",
          "Alarms are saved, so if you reload the page they’re still set—just click the page once to allow sound.",
        ],
      },
    ],
    faqs: [
      { q: "Will the alarm ring if my laptop sleeps?", a: "No. Browsers can’t wake a sleeping device. Keep it awake and plugged in." },
      { q: "Can I set more than one alarm?", a: "Yes, up to 20. Toggle each on or off, or delete it." },
      { q: "Does the alarm repeat daily?", a: "Each alarm rings once at its next occurrence; switch it back on to use it again." },
    ],
    related: [
      { href: "/countdown-timer/", label: "Countdown timer" },
      { href: "/stopwatch/", label: "Stopwatch" },
      { href: "/world-clock/", label: "World clock" },
      { href: "/pomodoro-timer/", label: "Pomodoro timer" },
    ],
  },
  "attendance-calculator.html": {
    metaTitle: "Attendance Calculator — Classes to Attend or Bunk for 75%",
    metaDescription:
      "Calculate your attendance percentage and find out how many classes you can bunk, or how many you must attend in a row to reach 75% (or any requirement). Free.",
    keywords:
      "attendance calculator, 75 attendance calculator, bunk calculator, how many classes can i bunk, attendance percentage calculator, class attendance calculator, college attendance",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How the attendance formula works",
        paragraphs: [
          "Attendance % = classes attended ÷ classes held × 100. For example, 28 of 40 classes is 70%.",
          "To reach a required percentage <em>r</em>, you need to attend <em>x</em> more classes in a row so that (attended + x) ÷ (held + x) ≥ r, which gives x = (r × held − attended) ÷ (1 − r), rounded up. With 28 of 40 and a 75% rule, you need 8 more classes: 36 ÷ 48 = 75%.",
          "If you’re above the requirement, you can miss y classes while attended ÷ (held + y) ≥ r, so y = attended ÷ r − held, rounded down.",
        ],
      },
      {
        h2: "Why 75% matters",
        paragraphs: [
          "Many Indian universities and colleges, including those following UGC and AICTE norms, require at least 75% attendance to sit end-semester exams, with limited condonation for medical reasons. Rules vary by institution—check your college’s handbook.",
        ],
      },
    ],
    faqs: [
      { q: "Does it count labs and lectures separately?", a: "Enter whichever your college counts. If labs and theory are tracked separately, calculate each one." },
      { q: "Is 74.5% rounded to 75%?", a: "That depends on your institution. To be safe, aim to stay at or above the exact requirement." },
      { q: "Can I plan future classes?", a: "Yes—open “Plan ahead” and enter upcoming classes and how many you’ll attend." },
    ],
    related: [
      { href: "/cgpa-calculator/", label: "CGPA calculator" },
      { href: "/percentage-calculator/", label: "Percentage calculator" },
      { href: "/gpa-calculator/", label: "GPA calculator" },
      { href: "/grade-calculator/", label: "Grade calculator" },
    ],
  },
  "love-calculator.html": {
    metaTitle: "Love Calculator — Love Percentage & FLAMES Test (Fun)",
    metaDescription:
      "Enter your name and your crush’s name to get a love percentage and your FLAMES result—Friends, Lovers, Affection, Marriage, Enemies or Siblings. Just for fun!",
    keywords:
      "love calculator, love percentage, flames calculator, flames game, love test, love meter, compatibility test by name, crush calculator",
    sections: [
      {
        h2: "How the FLAMES game works",
        list: [
          "Write both names and cross out letters they have in common, one for one.",
          "Count the letters that are left.",
          "Count through the word F-L-A-M-E-S using that number, crossing out the letter you land on.",
          "Start counting again from the next letter, repeating until one letter remains.",
          "F = Friends, L = Lovers, A = Affection, M = Marriage, E = Enemies, S = Siblings.",
        ],
      },
      {
        h2: "Just for fun",
        paragraphs: [
          "The love percentage is calculated from the letters in both names, so the same pair always gets the same score, whichever order you type them. It isn’t science—real compatibility is about respect, communication and shared values. Names are never stored or sent anywhere.",
        ],
      },
    ],
    faqs: [
      { q: "Does the order of names matter?", a: "No. Swapping the names gives the same percentage and FLAMES result." },
      { q: "Are the names saved?", a: "No. Everything happens in your browser." },
      { q: "Why is my FLAMES result “Same name”?", a: "If every letter cancels out, there are no letters left to count." },
    ],
    related: [
      { href: "/spin-the-wheel/", label: "Spin the wheel" },
      { href: "/age-calculator/", label: "Age calculator" },
      { href: "/fancy-text-generator/", label: "Fancy text generator" },
      { href: "/coin-flip/", label: "Coin flip" },
    ],
  },
  "text-repeater.html": {
    metaTitle: "Text Repeater — Repeat Text & Emoji (Copy for WhatsApp)",
    metaDescription:
      "Repeat any word, sentence or emoji up to 10,000 times with new lines, spaces, commas or a custom separator. Number lines, then copy or share on WhatsApp instantly.",
    keywords:
      "text repeater, repeat text, word repeater, emoji repeater, text repeater for whatsapp, repeat text 1000 times, copy paste text multiple times, message repeater",
    sections: [
      {
        h2: "How to repeat text",
        list: [
          "Type or paste your text or emoji.",
          "Enter how many times to repeat it (up to 10,000).",
          "Choose a separator: new line, space, comma, nothing or your own.",
          "Optionally number each line, then copy the result or send it on WhatsApp.",
        ],
      },
      {
        h2: "Popular uses",
        paragraphs: [
          "Fill birthday wishes and greetings, make emoji walls for chats, create test data for forms and spreadsheets, or generate placeholder lines for design mock-ups. The result updates instantly as you type and is capped at one million characters so your browser stays responsive.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a limit?", a: "Up to 10,000 repetitions or 1,000,000 characters, whichever comes first." },
      { q: "Why is the WhatsApp button hidden?", a: "Very long messages don’t fit in a share link. Copy the text and paste it into WhatsApp instead." },
      { q: "Please don’t spam", a: "Sending huge repeated messages can get accounts restricted on messaging apps. Use it responsibly." },
    ],
    related: [
      { href: "/fancy-text-generator/", label: "Fancy text generator" },
      { href: "/whatsapp-link/", label: "WhatsApp link generator" },
      { href: "/case-converter/", label: "Case converter" },
      { href: "/character-counter/", label: "Character counter" },
    ],
  },
  "html-formatter.html": {
    metaTitle: "HTML Formatter & Beautifier Online — CSS & JS Too",
    metaDescription:
      "Beautify messy or minified HTML, CSS and JavaScript with proper indentation, or minify HTML, CSS and JSON. Auto-detects the language; runs privately in your browser.",
    keywords:
      "html formatter, html beautifier, format html online, html pretty print, css beautifier, javascript beautifier, js formatter, minify html, code formatter online",
    sections: [
      {
        h2: "Beautify, then read and debug",
        paragraphs: [
          "Paste minified or badly indented code and press <strong>Beautify</strong>. The formatter (powered by the open-source js-beautify library) re-indents nested tags, CSS rules and JavaScript blocks, and also formats CSS and scripts embedded in HTML. Choose 2 spaces, 4 spaces or tabs to match your project.",
        ],
      },
      {
        h2: "Minify for production",
        list: [
          "<strong>HTML</strong> — removes comments and indentation whitespace while keeping &lt;pre&gt;, &lt;textarea&gt; and &lt;script&gt; content intact.",
          "<strong>CSS</strong> — strips comments, spaces and the last semicolon in each rule.",
          "<strong>JSON</strong> — removes all whitespace.",
          "<strong>JavaScript</strong> — use a build tool such as Terser or esbuild; safe JS minification needs a full parser.",
        ],
      },
    ],
    faqs: [
      { q: "Does formatting change how my page works?", a: "Beautifying only changes whitespace. Minifying HTML collapses extra spaces, which almost never changes rendering." },
      { q: "Is my code sent to a server?", a: "No. Formatting happens in your browser; only the formatter library is downloaded." },
      { q: "Can it fix broken HTML?", a: "It indents what you give it but doesn’t repair missing tags. Validate with the W3C validator if needed." },
    ],
    related: [
      { href: "/json-formatter/", label: "JSON formatter" },
      { href: "/minify-css/", label: "Minify CSS" },
      { href: "/xml-formatter/", label: "XML formatter" },
      { href: "/sql-formatter/", label: "SQL formatter" },
    ],
  },
  "dead-pixel-test.html": {
    metaTitle: "Dead Pixel Test — Find Dead & Stuck Pixels on Any Screen",
    metaDescription:
      "Test your monitor, laptop, TV or phone for dead and stuck pixels. Full-screen solid colours—black, white, red, green, blue and more—with simple keyboard controls.",
    keywords:
      "dead pixel test, stuck pixel test, monitor test, screen test, dead pixel checker, lcd test, pixel test online, new monitor test, backlight bleed test",
    sections: [
      {
        h2: "Dead pixels vs stuck pixels",
        list: [
          "<strong>Dead pixel</strong> — always black, most visible on the white screen. Usually permanent.",
          "<strong>Stuck pixel</strong> — stays red, green, blue or white; most visible on black or contrasting colours. Sometimes recovers on its own.",
          "<strong>Backlight bleed</strong> — light leaking at the edges on the black screen in a dark room.",
          "<strong>Dust</strong> — a spot that moves or disappears when you wipe the screen isn’t a pixel fault.",
        ],
      },
      {
        h2: "How to test a new monitor or laptop",
        paragraphs: [
          "Wipe the screen with a microfibre cloth, set brightness high and start the test. Look at each colour from a normal viewing distance, then up close, scanning section by section. Do it within your return or warranty window—manufacturers’ dead-pixel policies often require a minimum number of faulty pixels.",
        ],
      },
    ],
    faqs: [
      { q: "Does it work on phones and TVs?", a: "Yes. Open the page on the device and tap to change colours. Smart-TV browsers may not allow true full screen." },
      { q: "Can a stuck pixel be fixed?", a: "Sometimes. Gently massaging the spot with a soft cloth while the screen is on, or leaving the display off for a while, can help. Dead pixels usually can’t be fixed." },
      { q: "How many dead pixels are acceptable?", a: "It depends on the manufacturer’s policy (often based on ISO 9241-307 classes). Check your warranty terms." },
    ],
    related: [
      { href: "/refresh-rate-test/", label: "Refresh rate test" },
      { href: "/screen-resolution/", label: "Screen resolution" },
      { href: "/keyboard-tester/", label: "Keyboard tester" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "refresh-rate-test.html": {
    metaTitle: "Refresh Rate Test — What Hz Is My Monitor? (Online)",
    metaDescription:
      "Find your monitor’s refresh rate in Hz instantly. Check 60, 120, 144 or 240 Hz with live FPS, frame time and dropped frames, plus a smooth-motion test.",
    keywords:
      "refresh rate test, monitor refresh rate, what hz is my monitor, hz test, 144hz test, fps test, frame rate test, check refresh rate, ufo test",
    sections: [
      {
        h2: "How the test measures Hz",
        paragraphs: [
          "Browsers draw animation frames in sync with your display. The test times hundreds of frames and takes the median gap: about 16.7 ms is 60 Hz, 8.3 ms is 120 Hz, 6.9 ms is 144 Hz and 4.2 ms is 240 Hz. Dropped frames show when your device couldn’t keep up.",
          "The moving square leaves a trail of frame markers—at higher refresh rates the markers sit closer together and motion looks smoother.",
        ],
      },
      {
        h2: "Seeing 60 Hz on a 144 Hz monitor?",
        list: [
          "Set the refresh rate in Windows (Settings → Display → Advanced display) or macOS (System Settings → Displays).",
          "Use a DisplayPort or HDMI 2.0+ cable that supports high refresh rates.",
          "Turn off battery saver; laptops often cap at 60 Hz on battery.",
          "Move the browser window to the high-refresh screen if you use several monitors.",
        ],
      },
    ],
    faqs: [
      { q: "Is the result accurate?", a: "Yes for most setups—it reports what the browser is actually displaying. Variable refresh (G-Sync/FreeSync) and power saving can cause small fluctuations." },
      { q: "Why does it say 30 Hz?", a: "Some browsers throttle background tabs or low-power modes. Keep the tab in front and plug in your laptop." },
      { q: "Does it work on phones?", a: "Yes. It detects 90 and 120 Hz phone displays when the phone isn’t in battery-saver mode." },
    ],
    related: [
      { href: "/dead-pixel-test/", label: "Dead pixel test" },
      { href: "/screen-resolution/", label: "Screen resolution" },
      { href: "/click-speed-test/", label: "Click speed test" },
      { href: "/reaction-time-test/", label: "Reaction time test" },
    ],
  },
};
