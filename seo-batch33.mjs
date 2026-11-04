/** SEO metadata for batch 33 tools. */

export const batch33PageSeo = {
  "scientific-calculator.html": {
    metaTitle: "Scientific Calculator Online — Free, with Trig, Log & History",
    metaDescription:
      "Free online scientific calculator: sin, cos, tan, log, ln, square roots, powers, factorials, π and e, degree/radian mode and calculation history. Keyboard friendly.",
    keywords:
      "scientific calculator, online calculator, calculator, free scientific calculator, sin cos tan calculator, log calculator, exponent calculator, square root calculator",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "What this calculator can do",
        list: [
          "<strong>Trigonometry</strong> — sin, cos and tan in degrees or radians (tap DEG/RAD). Type asin, acos or atan for inverse functions.",
          "<strong>Logs and roots</strong> — log (base 10), ln (natural log), √ square root and cbrt for cube roots.",
          "<strong>Powers</strong> — x² and xʸ, scientific notation with EXP (for example 6.02E23).",
          "<strong>Factorials and percent</strong> — 5! = 120, and 50% is read as 0.5.",
          "<strong>Constants and memory</strong> — π, e and Ans (the last result), plus a history of your last 10 calculations.",
        ],
      },
      {
        h2: "Order of operations",
        paragraphs: [
          "Expressions follow standard precedence: brackets first, then powers, then multiplication and division, then addition and subtraction. Powers are right-associative, so 2^3^2 = 2^9 = 512, and −2^2 = −4. Implied multiplication works too: 2π, 3(4+1) and 2sin(30) are all valid. Missing closing brackets are added automatically.",
          "On a computer you can type the whole expression and press Enter. Use * or x for multiply and / for divide.",
        ],
      },
    ],
    faqs: [
      { q: "Why does sin(30) give 0.5 but sin(π/6) gives something else?", a: "The calculator starts in degree mode, so sin(30) means 30°. Tap DEG to switch to RAD before using radians such as π/6." },
      { q: "How do I enter scientific notation?", a: "Use the EXP key or type a capital E, for example 3.2E-5 for 3.2 × 10⁻⁵." },
      { q: "Is my history saved?", a: "History is kept only while the page is open. Nothing is sent to a server." },
    ],
    related: [
      { href: "/percentage-calculator/", label: "Percentage calculator" },
      { href: "/fraction-calculator/", label: "Fraction calculator" },
      { href: "/quadratic-solver/", label: "Quadratic solver" },
      { href: "/standard-deviation/", label: "Standard deviation" },
    ],
  },
  "spin-the-wheel.html": {
    metaTitle: "Spin the Wheel — Free Random Name Picker Wheel",
    metaDescription:
      "Spin the wheel to pick a random name, winner or choice. Add your own entries, remove winners after each spin, shuffle the list, and it saves automatically.",
    keywords:
      "spin the wheel, wheel of names, random name picker, wheel spinner, random picker wheel, decision wheel, spin wheel online, giveaway picker",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to use the wheel",
        paragraphs: [
          "Type or paste entries into the box, one per line—names for a classroom, prizes for a giveaway, places to eat, or chores. The wheel redraws as you type. Press <strong>Spin</strong> (or tap the centre) and the pointer at the top picks the winner.",
          "Tick <em>Remove the winner after each spin</em> to draw several unique winners in a row, like picking teams or raffle prizes. Your list is saved in this browser so it is still there next time.",
        ],
      },
      {
        h2: "Is it really random?",
        paragraphs: [
          "Each spin uses your browser’s cryptographic random number generator (crypto.getRandomValues) to choose the spin strength and stopping angle, so every entry has an equal chance. The animation is only for show—the result is decided fairly.",
        ],
      },
    ],
    faqs: [
      { q: "How many entries can I add?", a: "Up to 300. Long names are shortened on the wheel but shown in full when they win." },
      { q: "Can I give one option a bigger chance?", a: "Yes—add it on more than one line. Each line is one equal slice of the wheel." },
      { q: "Can I use it for a giveaway?", a: "Yes. Paste the participant list, enable remove-winner, and spin once per prize. Screen-record the spin for transparency." },
    ],
    related: [
      { href: "/random-picker/", label: "Random picker" },
      { href: "/coin-flip/", label: "Coin flip" },
      { href: "/dice-roller/", label: "Dice roller" },
      { href: "/random-number/", label: "Random number generator" },
    ],
  },
  "click-speed-test.html": {
    metaTitle: "Click Speed Test (CPS Test) — Clicks per Second Checker",
    metaDescription:
      "Test your click speed: count clicks per second in 1, 5, 10, 30 or 60 seconds. See your CPS rating and personal best. Free CPS test for gamers—no download.",
    keywords:
      "cps test, click speed test, clicks per second, click test, cps checker, jitter click test, butterfly click test, 10 second click test",
    sections: [
      {
        h2: "What is a good CPS score?",
        list: [
          "<strong>Under 4.5 CPS</strong> — casual clicking",
          "<strong>4.5 to 6.5 CPS</strong> — average for most people",
          "<strong>6.5 to 8 CPS</strong> — above average",
          "<strong>8 to 10 CPS</strong> — excellent; common with jitter clicking",
          "<strong>10+ CPS</strong> — very fast; usually butterfly or drag clicking",
        ],
        paragraphs: [
          "Shorter tests (1–5 seconds) measure burst speed; 30 and 60 second tests measure endurance. Your best score for each length is saved in this browser.",
        ],
      },
      {
        h2: "Tips to click faster",
        paragraphs: [
          "Rest your wrist, tense your forearm slightly for jitter clicking, or use two fingers alternately (butterfly clicking). A lightweight mouse with a crisp switch helps. On phones and tablets, tap with two thumbs.",
        ],
      },
    ],
    faqs: [
      { q: "How is CPS calculated?", a: "Total clicks divided by the test length in seconds. The timer starts on your first click." },
      { q: "Does it work on mobile?", a: "Yes. Taps are counted the same way as mouse clicks." },
      { q: "Why did my score reset?", a: "Changing the test length starts a fresh run. Best scores are stored separately for each length." },
    ],
    related: [
      { href: "/reaction-time-test/", label: "Reaction time test" },
      { href: "/typing-test/", label: "Typing test" },
      { href: "/keyboard-tester/", label: "Keyboard tester" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "reaction-time-test.html": {
    metaTitle: "Reaction Time Test — Check Your Reflexes in Milliseconds",
    metaDescription:
      "Free reaction time test: wait for green, click fast, and see your reaction speed in milliseconds. Get a 5-try average, your best time, and how you compare.",
    keywords:
      "reaction time test, reflex test, reaction speed test, human benchmark reaction time, average reaction time, click reaction test",
    sections: [
      {
        h2: "Average human reaction time",
        paragraphs: [
          "Most people react to a visual cue in about <strong>200–300 milliseconds</strong>, with a typical average near 250 ms. Under 200 ms is exceptional. Results also include the delay of your mouse, screen and browser, so a high-refresh monitor and wired mouse give slightly faster readings.",
        ],
      },
      {
        h2: "How the test works",
        paragraphs: [
          "Click the box to start. It turns red and waits a random 1–4.5 seconds, then turns green. Click as soon as you see green. Clicking early counts as “too soon” and is not scored. After five valid tries you get your average.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use the keyboard?", a: "Yes. Focus the box and press Space or Enter instead of clicking." },
      { q: "Why are my results slower on a phone?", a: "Touchscreens and phone browsers add some input latency. Compare scores on the same device." },
      { q: "Does sleep or caffeine affect reaction time?", a: "Yes. Fatigue slows reactions noticeably; caffeine can improve them slightly. Test at different times to see." },
    ],
    related: [
      { href: "/click-speed-test/", label: "Click speed test" },
      { href: "/typing-test/", label: "Typing test" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "keyboard-tester.html": {
    metaTitle: "Keyboard Tester — Online Keyboard Test for Every Key",
    metaDescription:
      "Test your keyboard online: press each key and watch it light up. Find dead or stuck keys, check key codes, and test laptop and mechanical keyboards. Free.",
    keywords:
      "keyboard tester, keyboard test, key test online, test keyboard keys, laptop keyboard test, mechanical keyboard tester, keycode checker",
    sections: [
      {
        h2: "How to find broken keys",
        paragraphs: [
          "Press every key one by one. Working keys turn green and stay marked, so any key that never lights up is not registering. If a key stays purple after you let go, it may be sticking. The counter shows how many different keys you have tested.",
          "The panel also shows <code>event.key</code>, <code>event.code</code> and <code>keyCode</code>—useful for developers and for checking a keyboard layout.",
        ],
      },
      {
        h2: "Limits of browser keyboard tests",
        paragraphs: [
          "Some keys are reserved by the operating system or browser and never reach web pages—for example Fn, Print Screen on some systems, and shortcuts like Ctrl+W or Cmd+Q. Media keys vary by device.",
        ],
      },
    ],
    faqs: [
      { q: "Can it test key rollover (NKRO)?", a: "Hold several keys at once—each held key lights up. If some stop lighting, you have reached your keyboard’s rollover limit." },
      { q: "Why doesn’t the Fn key show?", a: "Fn is handled inside the keyboard hardware and is not reported to the browser." },
      { q: "Does it record what I type?", a: "No. Key presses are only shown on this page and never sent anywhere." },
    ],
    related: [
      { href: "/typing-test/", label: "Typing test" },
      { href: "/click-speed-test/", label: "Click speed test" },
      { href: "/mic-test/", label: "Mic test" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "webcam-test.html": {
    metaTitle: "Webcam Test — Check Camera Online (Resolution & FPS)",
    metaDescription:
      "Test your webcam online in one click. See if the camera works, check resolution, frame rate and megapixels, switch cameras and take a snapshot. Private—no upload.",
    keywords:
      "webcam test, camera test, test my camera, webcam check, online camera test, webcam resolution test, camera fps test, check webcam",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to test your webcam",
        paragraphs: [
          "Press <strong>Test my webcam</strong> and allow camera access when your browser asks. If the preview appears, your camera works. The tool then shows the resolution it is streaming (for example 1280 × 720 or 1920 × 1080), the measured frame rate, aspect ratio and megapixels.",
          "Have more than one camera? Pick it from the list. Use <em>Take snapshot</em> to save a still image to check focus and lighting before a video call.",
        ],
      },
      {
        h2: "Webcam not working? Try this",
        list: [
          "Allow camera permission for this site from the camera icon in the address bar.",
          "Close Zoom, Teams, Meet or other apps that may be using the camera.",
          "On Windows, check Settings → Privacy → Camera. On macOS, check System Settings → Privacy & Security → Camera.",
          "Check for a physical privacy shutter or a camera function key on laptops.",
        ],
      },
    ],
    faqs: [
      { q: "Is my video recorded or uploaded?", a: "No. The video stays on your device. Snapshots are created locally and only saved if you download them." },
      { q: "Why is the resolution lower than my camera’s spec?", a: "Browsers may choose a lower mode for performance, and some USB ports or apps limit it. The value shown is what your camera is actually streaming." },
      { q: "Does it work on phones?", a: "Yes, on modern mobile browsers. Use the camera list to switch between front and back cameras." },
    ],
    related: [
      { href: "/mic-test/", label: "Mic test" },
      { href: "/screen-resolution/", label: "Screen resolution" },
      { href: "/qr-code-scanner/", label: "QR code scanner" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "mic-test.html": {
    metaTitle: "Mic Test — Test Your Microphone Online with Live Meter",
    metaDescription:
      "Check your microphone online: live volume meter and waveform, choose input device, and record 5 seconds to play back. Fix mic problems before calls. Free, private.",
    keywords:
      "mic test, microphone test, test my mic, online mic test, microphone check, mic tester, headset mic test, check microphone",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to test your microphone",
        paragraphs: [
          "Press <strong>Test my microphone</strong> and allow access. Speak normally—the level bar and waveform should move. A level around −30 to −10 dBFS while talking is healthy; constantly near 0 means the input is too loud and may distort.",
          "Press <em>Record 5 seconds</em> to capture a short clip and play it back to hear how you sound on calls. Echo cancellation and noise suppression are turned off so you hear the raw microphone.",
        ],
      },
      {
        h2: "Microphone not detected?",
        list: [
          "Choose the correct device from the Microphone list (headset vs. built-in).",
          "Check mute switches on headsets and the system input volume.",
          "Allow microphone permission for this site in the address bar.",
          "Close other apps that may be holding the microphone, then retry.",
        ],
      },
    ],
    faqs: [
      { q: "Is my voice uploaded?", a: "No. Audio is analysed and recorded only in your browser and is discarded when you leave the page." },
      { q: "What does dBFS mean?", a: "Decibels relative to full scale. 0 dBFS is the loudest possible signal; quieter sounds are negative numbers." },
      { q: "Can I test AirPods or Bluetooth headsets?", a: "Yes. Connect them first, then select them in the Microphone list after granting permission." },
    ],
    related: [
      { href: "/webcam-test/", label: "Webcam test" },
      { href: "/text-to-speech/", label: "Text to speech" },
      { href: "/keyboard-tester/", label: "Keyboard tester" },
      { href: "/online-tests/", label: "All online tests" },
    ],
  },
  "screen-resolution.html": {
    metaTitle: "What Is My Screen Resolution? — Screen Size & Viewport",
    metaDescription:
      "See your screen resolution instantly: CSS and physical pixels, browser viewport size, device pixel ratio, colour depth and orientation. Updates live as you resize.",
    keywords:
      "what is my screen resolution, screen resolution, my screen size, viewport size, device pixel ratio, display resolution checker, screen resolution test",
    sections: [
      {
        h2: "Screen resolution vs. viewport",
        paragraphs: [
          "<strong>Screen resolution</strong> is the size of your whole display. Browsers report it in CSS pixels; multiply by the <strong>device pixel ratio</strong> to get physical pixels. A 4K monitor at 150% scaling, for example, reports 2560 × 1440 CSS pixels with a ratio of 1.5 (3840 × 2160 physical).",
          "The <strong>viewport</strong> is the visible area of the web page inside the browser window. Web designers use it to test responsive layouts.",
        ],
      },
      {
        h2: "Common resolutions",
        list: [
          "1920 × 1080 (Full HD, 16:9) — the most common desktop size",
          "1366 × 768 — many budget laptops",
          "2560 × 1440 (QHD) and 3840 × 2160 (4K UHD)",
          "390 × 844 and 412 × 915 — common phone viewports in CSS pixels",
        ],
      },
    ],
    faqs: [
      { q: "Why is my resolution lower than my monitor’s spec?", a: "Display scaling in Windows or macOS makes the browser report a smaller CSS size. Physical pixels shows the real panel resolution." },
      { q: "What is device pixel ratio?", a: "The number of physical pixels per CSS pixel. Retina and high-DPI screens are usually 2 or 3." },
      { q: "Is any data collected?", a: "No. Values are read from your browser and shown only to you." },
    ],
    related: [
      { href: "/aspect-ratio/", label: "Aspect ratio calculator" },
      { href: "/px-to-rem-converter/", label: "PX to REM" },
      { href: "/user-agent/", label: "What is my user agent" },
      { href: "/what-is-my-ip/", label: "What is my IP" },
    ],
  },
  "online-notepad.html": {
    metaTitle: "Online Notepad — Free Notes That Autosave, No Login",
    metaDescription:
      "Free online notepad that saves automatically in your browser. Write notes, to-do lists and drafts, see word count, then copy or download as .txt. No sign-up.",
    keywords:
      "online notepad, notepad online, free notepad, online notes, autosave notepad, text editor online, notepad no login, write notes online",
    sections: [
      {
        h2: "A simple notepad that remembers",
        paragraphs: [
          "Start typing and your note is saved to this browser’s local storage within a second. Close the tab, come back later, and it is still there. Word and character counts update as you write.",
          "Use <em>Download .txt</em> to keep a copy on your device, or <em>Copy all</em> to paste into email, chat or a document.",
        ],
      },
      {
        h2: "Privacy",
        paragraphs: [
          "Notes never leave your device—there is no account and no server copy. That also means notes do not sync between devices, and clearing your browser data deletes them, so download anything important.",
        ],
      },
    ],
    faqs: [
      { q: "Where is my note stored?", a: "In your browser’s localStorage on this device only." },
      { q: "Will it work offline?", a: "Once the page has loaded, you can keep typing and saving without a connection." },
      { q: "Can I open it in two tabs?", a: "Yes. Changes made in one tab are picked up by the other." },
    ],
    related: [
      { href: "/word-counter/", label: "Word counter" },
      { href: "/text-diff/", label: "Text diff" },
      { href: "/markdown-preview/", label: "Markdown preview" },
      { href: "/pomodoro-timer/", label: "Pomodoro timer" },
    ],
  },
  "fancy-text-generator.html": {
    metaTitle: "Fancy Text Generator — Cool Fonts to Copy and Paste",
    metaDescription:
      "Turn text into 20+ fancy fonts—bold, italic, cursive script, gothic, bubble, small caps, upside down—and copy-paste them into Instagram, WhatsApp, Discord or bios.",
    keywords:
      "fancy text generator, fancy fonts, cool fonts copy and paste, instagram fonts, font generator, cursive font generator, bold text generator, stylish text, small caps generator",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How fancy text works",
        paragraphs: [
          "These are not real fonts—they are special Unicode characters that look like styled letters. Because they are characters, you can paste them anywhere that accepts text: Instagram and TikTok bios, WhatsApp messages, Discord names, X posts, YouTube comments and game nicknames.",
          "Type once and every style updates instantly. Tap <strong>Copy</strong> next to a style and paste it where you need it.",
        ],
      },
      {
        h2: "Tips and limitations",
        list: [
          "Screen readers may read styled letters awkwardly—avoid them for important information.",
          "Some older phones show boxes for rare characters; bold and italic styles are the most widely supported.",
          "Search engines and some apps treat these characters differently from normal letters, so keep your real name in plain text too.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use these fonts on Instagram?", a: "Yes. Copy any style and paste it into your bio, captions or comments." },
      { q: "Why do some letters look different in a style?", a: "Unicode only defines some letters for certain styles, so a few use the closest available symbol." },
      { q: "Do numbers and symbols change?", a: "Numbers change in bold, double-struck, sans, monospace and bubble styles. Most symbols stay as they are." },
    ],
    related: [
      { href: "/case-converter/", label: "Case converter" },
      { href: "/instagram-caption-counter/", label: "Instagram caption counter" },
      { href: "/hashtag-generator/", label: "Hashtag generator" },
      { href: "/reverse-text/", label: "Reverse text" },
    ],
  },
  "text-to-speech.html": {
    metaTitle: "Text to Speech Online — Free Read Aloud with Natural Voices",
    metaDescription:
      "Free text to speech reader: paste text and listen in English, Hindi and more using your device’s voices. Change voice, speed and pitch; pause and resume anytime.",
    keywords:
      "text to speech, tts online, read aloud, text to voice, free text to speech, text reader, hindi text to speech, speak text online",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Listen to any text",
        paragraphs: [
          "Paste an article, notes or an email and press <strong>Speak</strong>. Choose a voice to change the accent or language—Hindi, English (India, US, UK) and many other voices are available depending on your device. Slow the speed down for learning or speed it up to skim.",
          "Long text is split into sentences so it keeps playing smoothly. Use Pause, Resume and Stop at any time.",
        ],
      },
      {
        h2: "Which voices will I see?",
        paragraphs: [
          "The tool uses the Web Speech API, which plays voices installed on your device or provided by your browser. Chrome and Edge include extra online voices; Safari uses Apple system voices; Windows and Android voices can be added in system settings.",
        ],
      },
    ],
    faqs: [
      { q: "Can I download the speech as MP3?", a: "Not with this tool—browsers do not allow saving Web Speech output. You can record it with screen or audio recording software." },
      { q: "Does it support Hindi?", a: "Yes, if a Hindi voice is available on your device. Look for “hi-IN” in the voice list." },
      { q: "Is my text sent to a server?", a: "Text is processed by your browser’s speech engine. Some browser-provided online voices may send text to that browser’s speech service." },
    ],
    related: [
      { href: "/mic-test/", label: "Mic test" },
      { href: "/speaking-time-calculator/", label: "Speaking time calculator" },
      { href: "/ai-translator/", label: "AI translator" },
      { href: "/word-counter/", label: "Word counter" },
    ],
  },
  "image-cropper.html": {
    metaTitle: "Crop Image Online — Free Photo Cropper (Square, 16:9, 4:5)",
    metaDescription:
      "Crop images online for free. Drag to select, lock to 1:1, 16:9, 4:5 or 9:16, and download as PNG, JPG or WebP at full resolution. Photos stay on your device.",
    keywords:
      "crop image, image cropper, crop photo online, crop picture, crop image to square, instagram crop 4:5, crop jpg, crop png, free image cropper",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to crop an image",
        list: [
          "Choose a photo (JPG, PNG, WebP or GIF).",
          "Pick an aspect ratio—Free, 1:1 square, 16:9 for YouTube thumbnails, 4:5 for Instagram portrait, or 9:16 for stories and reels.",
          "Drag inside the box to move it and drag a corner to resize. Arrow keys nudge it (hold Shift for bigger steps).",
          "Choose PNG, JPG or WebP and press <strong>Download cropped image</strong>.",
        ],
      },
      {
        h2: "Full quality, completely private",
        paragraphs: [
          "Cropping happens at the image’s original resolution, so you do not lose detail. The crop size in pixels is shown as you drag. The file is processed in your browser and never uploaded.",
        ],
      },
    ],
    faqs: [
      { q: "Which ratio should I use for Instagram?", a: "1:1 for square posts, 4:5 for portrait posts (the largest feed size), and 9:16 for stories and reels." },
      { q: "Will cropping reduce quality?", a: "No. PNG is lossless; JPG and WebP are saved at high quality (92%)." },
      { q: "Can I crop on my phone?", a: "Yes. Drag with your finger to move or resize the crop box." },
    ],
    related: [
      { href: "/image-resizer/", label: "Image resizer" },
      { href: "/image-compress/", label: "Compress image" },
      { href: "/image-converter/", label: "Image converter" },
      { href: "/aspect-ratio/", label: "Aspect ratio calculator" },
    ],
  },
  "image-to-text.html": {
    metaTitle: "Image to Text Converter — Free OCR Online (JPG, PNG)",
    metaDescription:
      "Extract text from images with free OCR. Upload or paste a photo, screenshot or scan and copy the text—English, Hindi and 13 more languages. Runs in your browser.",
    keywords:
      "image to text, ocr online, image to text converter, extract text from image, photo to text, jpg to text, screenshot to text, hindi ocr, picture to text",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to convert an image to text",
        paragraphs: [
          "Choose an image or paste a screenshot with Ctrl+V (Cmd+V on Mac), select the language of the text, and press <strong>Extract text</strong>. The first run downloads the OCR engine and language data (a few MB); later runs are faster.",
          "When it finishes, copy the text or download it as a .txt file. Recognition uses Tesseract, the open-source OCR engine, running entirely in your browser.",
        ],
      },
      {
        h2: "Tips for accurate OCR",
        list: [
          "Use a sharp, well-lit image with dark text on a light background.",
          "Crop to just the text area and straighten tilted photos first.",
          "Pick the correct language—use English + Hindi for mixed documents.",
          "Printed text works best; handwriting accuracy is limited.",
        ],
      },
    ],
    faqs: [
      { q: "Are my images uploaded?", a: "No. The OCR engine is downloaded to your browser and the image is processed on your device." },
      { q: "Can it read Hindi?", a: "Yes. Choose Hindi or English + Hindi from the language list." },
      { q: "Can it convert a PDF?", a: "Take a screenshot of the page or export it as an image first, then use this tool. For text-based PDFs, the PDF to Word tool is faster." },
    ],
    related: [
      { href: "/image-cropper/", label: "Crop image" },
      { href: "/pdf-to-word/", label: "PDF to Word" },
      { href: "/qr-code-scanner/", label: "QR code scanner" },
      { href: "/word-counter/", label: "Word counter" },
    ],
  },
  "qr-code-scanner.html": {
    metaTitle: "QR Code Scanner Online — Scan from Camera or Image",
    metaDescription:
      "Scan QR codes online with your camera or by uploading a screenshot or photo. Copy the result or open links safely. Free QR reader that works on phone and PC.",
    keywords:
      "qr code scanner, scan qr code online, qr scanner, qr code reader, scan qr from image, qr code scanner from screenshot, qr scanner for pc",
    sections: [
      {
        h2: "Two ways to scan",
        paragraphs: [
          "<strong>Camera:</strong> press Scan with camera and point it at the QR code. On phones the rear camera is used. The code is read automatically and the camera stops.",
          "<strong>Image:</strong> upload a screenshot or photo that contains a QR code—handy for codes received on WhatsApp or email, or when you are on a laptop without a camera.",
        ],
      },
      {
        h2: "Scan safely",
        paragraphs: [
          "Links are never opened automatically. Check the decoded address before tapping <em>Open link</em>, and be careful with QR codes that ask for UPI payments or login details.",
        ],
      },
    ],
    faqs: [
      { q: "Can I scan a QR code from a screenshot?", a: "Yes. Upload the screenshot using the file picker." },
      { q: "Does it read UPI QR codes?", a: "Yes, it shows the UPI payment link text so you can verify the payee before paying in your UPI app." },
      { q: "Is anything uploaded?", a: "No. Decoding happens in your browser." },
    ],
    related: [
      { href: "/qr-code-generator/", label: "QR code generator" },
      { href: "/wifi-qr-generator/", label: "WiFi QR generator" },
      { href: "/barcode-generator/", label: "Barcode generator" },
      { href: "/image-to-text/", label: "Image to text (OCR)" },
    ],
  },
  "color-contrast-checker.html": {
    metaTitle: "Color Contrast Checker — WCAG AA/AAA Ratio Tool",
    metaDescription:
      "Check colour contrast for accessibility. Get the WCAG contrast ratio and AA/AAA pass or fail for normal text, large text and UI components, with a live preview.",
    keywords:
      "color contrast checker, contrast ratio checker, wcag contrast checker, accessibility color checker, aa contrast, aaa contrast, text background contrast",
    sections: [
      {
        h2: "WCAG contrast requirements",
        list: [
          "<strong>AA normal text:</strong> at least 4.5:1",
          "<strong>AA large text</strong> (24px, or 18.66px bold): at least 3:1",
          "<strong>AAA normal text:</strong> at least 7:1; <strong>AAA large text:</strong> 4.5:1",
          "<strong>UI components and icons</strong> (WCAG 2.1): at least 3:1 against adjacent colours",
        ],
      },
      {
        h2: "How the ratio is calculated",
        paragraphs: [
          "Each colour’s relative luminance is computed from its sRGB values, then the ratio is (lighter + 0.05) ÷ (darker + 0.05). Ratios range from 1:1 (same colour) to 21:1 (black on white). The displayed value is rounded down so a pass is never overstated.",
        ],
      },
    ],
    faqs: [
      { q: "What contrast ratio do I need?", a: "Aim for 4.5:1 for body text to meet WCAG AA, which most accessibility laws reference." },
      { q: "Can I enter short hex codes?", a: "Yes. #333 is read as #333333." },
      { q: "Does it check gradients or images?", a: "No. Check the lightest and darkest parts of the background separately." },
    ],
    related: [
      { href: "/color-picker/", label: "Color picker" },
      { href: "/rgb-hex-converter/", label: "RGB to HEX" },
      { href: "/gradient-generator/", label: "Gradient generator" },
      { href: "/design/", label: "Design hub" },
    ],
  },
  "sukanya-samriddhi-calculator.html": {
    metaTitle: "Sukanya Samriddhi Yojana Calculator — SSY Maturity 2025",
    metaDescription:
      "Calculate Sukanya Samriddhi Yojana maturity: enter yearly deposit, SSY interest rate and girl’s age to see total deposit, interest earned and year-wise balance.",
    keywords:
      "sukanya samriddhi yojana calculator, ssy calculator, sukanya samriddhi calculator, ssy maturity amount, sukanya yojana interest rate, ssy interest calculator",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How Sukanya Samriddhi Yojana works",
        list: [
          "Open for a girl child aged up to 10, at a post office or authorised bank.",
          "Deposit between ₹250 and ₹1,50,000 each financial year for <strong>15 years</strong>.",
          "The account matures <strong>21 years</strong> after opening; interest keeps compounding after deposits stop.",
          "Up to 50% can be withdrawn after the girl turns 18 for higher education.",
          "Deposits qualify for Section 80C (old regime), and interest and maturity are tax-free (EEE).",
        ],
      },
      {
        h2: "How the maturity value is calculated",
        paragraphs: [
          "This calculator assumes the full yearly deposit is made at the start of each year and interest is compounded annually at the rate you enter. Example: ₹1,50,000 a year at 8.2% gives total deposits of ₹22,50,000 and a maturity value of about ₹71.8 lakh after 21 years.",
          "In the actual scheme, interest is calculated monthly on the lowest balance between the 5th and the end of the month, so deposit before the 5th of April each year to earn the most.",
        ],
      },
    ],
    faqs: [
      { q: "What is the current SSY interest rate?", a: "The government sets it quarterly; it has been 8.2% per year in recent quarters. Enter the latest rate in the calculator." },
      { q: "Is the SSY maturity amount taxable?", a: "No. SSY has EEE status: deposits (under 80C, old regime), interest and maturity are all tax-free." },
      { q: "What if I miss a yearly deposit?", a: "The account becomes inactive. It can be revived by paying the minimum ₹250 for each missed year plus a ₹50 penalty per year." },
    ],
    related: [
      { href: "/ppf-calculator/", label: "PPF calculator" },
      { href: "/section-80c-calculator/", label: "Section 80C calculator" },
      { href: "/fd-calculator/", label: "FD calculator" },
      { href: "/sip-calculator/", label: "SIP calculator" },
    ],
  },
  "home-loan-prepayment-calculator.html": {
    metaTitle: "Home Loan Prepayment Calculator — Interest Saved",
    metaDescription:
      "See how much a home loan part-payment saves. Compare reducing tenure vs reducing EMI for one-time or yearly prepayments, with interest saved and new tenure.",
    keywords:
      "home loan prepayment calculator, loan prepayment calculator, part payment calculator, home loan part payment, reduce tenure or emi, prepayment savings calculator",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "Reduce tenure or reduce EMI?",
        paragraphs: [
          "When you prepay, most banks let you either keep the EMI and finish the loan sooner (<strong>reduce tenure</strong>) or keep the end date and pay a smaller EMI (<strong>reduce EMI</strong>). Reducing tenure almost always saves far more interest, because the lower balance stops accruing interest for the remaining years.",
          "Example: on a ₹30 lakh loan at 8.5% for 20 years, (EMI about ₹26,035), a single ₹2 lakh prepayment after 12 months saves about ₹6.9 lakh in interest and ends the loan 34 months early if you keep the EMI.",
        ],
      },
      {
        h2: "When prepayment makes sense",
        list: [
          "Prepay early—the first years of a loan are mostly interest.",
          "Floating-rate home loans taken by individuals have no prepayment penalty under RBI rules.",
          "Keep an emergency fund before prepaying, and compare with investing if your expected returns beat the loan rate after tax.",
          "Remember the tax deduction on home loan interest (Section 24b) falls as you prepay.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a penalty for prepaying a home loan?", a: "Not for floating-rate home loans to individuals. Fixed-rate loans may charge a fee—check your loan agreement." },
      { q: "How is interest saved calculated?", a: "The tool simulates every monthly instalment with and without prepayment and compares total interest paid." },
      { q: "Can I model a yearly bonus prepayment?", a: "Yes. Set frequency to Every year and choose the month of the first prepayment." },
    ],
    related: [
      { href: "/emi-calculator/", label: "EMI calculator" },
      { href: "/home-loan-calculator/", label: "Home loan EMI" },
      { href: "/amortization-schedule/", label: "Amortization schedule" },
      { href: "/rent-vs-buy-calculator/", label: "Rent vs buy" },
    ],
  },
  "xirr-calculator.html": {
    metaTitle: "XIRR Calculator — Annualised Return for SIP & Investments",
    metaDescription:
      "Calculate XIRR online: enter dates and amounts of investments and withdrawals to get the annualised return for SIPs, mutual funds or stocks. Matches Excel XIRR.",
    keywords:
      "xirr calculator, xirr calculator online, sip xirr calculator, mutual fund xirr, annualised return calculator, xirr vs cagr, irr for irregular cash flows",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "What is XIRR?",
        paragraphs: [
          "XIRR (extended internal rate of return) is the annualised return of a series of cash flows that happen on different dates. It is the right way to measure SIP or mutual fund returns, because each instalment is invested for a different length of time. CAGR only works for a single lump-sum investment.",
          "Mathematically, XIRR is the rate r that makes Σ amount ÷ (1 + r)<sup>(days ÷ 365)</sup> equal to zero—the same definition Excel and Google Sheets use.",
        ],
      },
      {
        h2: "How to enter cash flows",
        list: [
          "Each SIP instalment or purchase: the date and a <strong>negative</strong> amount, e.g. −10000.",
          "Each redemption or dividend received: a <strong>positive</strong> amount.",
          "For current holdings, add today’s date with the current value as a positive amount.",
        ],
      },
    ],
    faqs: [
      { q: "Why is XIRR different from absolute return?", a: "Absolute return ignores time. XIRR annualises the gain based on how long each rupee was invested." },
      { q: "Is a negative XIRR possible?", a: "Yes. If the current value is below what you invested, XIRR is negative." },
      { q: "Does it match Excel?", a: "Yes. It uses the same 365-day convention as Excel’s XIRR function." },
    ],
    related: [
      { href: "/sip-calculator/", label: "SIP calculator" },
      { href: "/cagr-calculator/", label: "CAGR calculator" },
      { href: "/mutual-fund-returns-calculator/", label: "Mutual fund returns" },
      { href: "/irr-calculator/", label: "IRR calculator" },
    ],
  },
  "time-zone-converter.html": {
    metaTitle: "Time Zone Converter — IST to EST, PST, GMT & World Clock",
    metaDescription:
      "Convert time between IST, EST, PST, GMT, CET and every world time zone. Daylight saving is handled automatically. Compare several cities and plan meetings.",
    keywords:
      "time zone converter, ist to est, ist to pst, est to ist, gmt to ist, time converter, world time zone converter, meeting time zones",
    sitemapPriority: "0.9",
    sections: [
      {
        h2: "How to convert time zones",
        paragraphs: [
          "Pick a date and time, choose the time zone it is in (your local zone is selected automatically), and see the matching time in every zone in your list. Add cities with <em>+ Add</em> and remove them with ×. Your list is saved for next time.",
          "Daylight saving time is applied automatically for the selected date, so conversions to New York, London or Sydney stay correct all year.",
        ],
      },
      {
        h2: "Popular conversions from India (IST, UTC+05:30)",
        list: [
          "IST is 10 h 30 min ahead of New York in winter (EST) and 9 h 30 min ahead in summer (EDT).",
          "IST is 13 h 30 min ahead of California in winter (PST) and 12 h 30 min ahead in summer (PDT).",
          "IST is 5 h 30 min ahead of London in winter (GMT) and 4 h 30 min ahead in summer (BST).",
          "IST is 3 h 30 min behind Japan (JST) and 2 h 30 min behind Singapore (SGT).",
        ],
      },
    ],
    faqs: [
      { q: "Does it handle daylight saving time?", a: "Yes. It uses your browser’s time zone database, which includes current and historic daylight saving rules." },
      { q: "What is IST in UTC?", a: "Indian Standard Time is UTC+05:30 all year; India does not use daylight saving." },
      { q: "Can I convert a future date?", a: "Yes. Pick any date—the offsets for that date are used." },
    ],
    related: [
      { href: "/world-clock/", label: "World clock" },
      { href: "/meeting-planner/", label: "Meeting planner" },
      { href: "/time-difference/", label: "Time difference" },
      { href: "/military-time-converter/", label: "Military time" },
    ],
  },
};
