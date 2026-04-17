export type PersonalityKey = "Golden Hour" | "Plot Twist" | "Smooth Talker" | "After Hours";

export type QuizAnswer = {
  text: string;
  personality: PersonalityKey;
};

export type QuizQuestion = {
  prompt: string;
  answers: QuizAnswer[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    prompt: "Pick the photo dump that feels the most like you.",
    answers: [
      { text: "golden light, matcha glass, oversized blazer, film grain", personality: "Golden Hour" },
      { text: "blurry concert pic, random one-way ticket, three tabs open at once", personality: "Plot Twist" },
      { text: "espresso in a heavy ceramic cup, perfect trench coat, unread texts handled calmly", personality: "Smooth Talker" },
      { text: "city lights at 1 a.m., candle wax, boots by the door, last call energy", personality: "After Hours" },
    ],
  },
  {
    prompt: "It's Sunday morning. What is your ideal plan?",
    answers: [
      { text: "farmer's market, playlist on low, fresh flowers in the kitchen", personality: "Golden Hour" },
      { text: "no plan, just vibes, maybe a spontaneous road trip by noon", personality: "Plot Twist" },
      { text: "your usual cafe, same corner seat, one elite outfit, one strong opinion", personality: "Smooth Talker" },
      { text: "sleeping in late, slow start, late brunch, then somehow staying out all night", personality: "After Hours" },
    ],
  },
  {
    prompt: "Which trend are you secretly most drawn to?",
    answers: [
      { text: "soft glowy clean-girl-but-better energy", personality: "Golden Hour" },
      { text: "chaotic niche-core that nobody fully understands yet", personality: "Plot Twist" },
      { text: "timeless staples that always look expensive", personality: "Smooth Talker" },
      { text: "dark, cinematic, after-hours aesthetic with a little mystery", personality: "After Hours" },
    ],
  },
  {
    prompt: "Pick the caption you'd actually post.",
    answers: [
      { text: "caught the light right", personality: "Golden Hour" },
      { text: "this was not on the itinerary", personality: "Plot Twist" },
      { text: "nothing crazy, just good taste", personality: "Smooth Talker" },
      { text: "don't ask what time I got home", personality: "After Hours" },
    ],
  },
  {
    prompt: "Which space feels most like your brain?",
    answers: [
      { text: "warm neutrals, linen curtains, sun coming through the window", personality: "Golden Hour" },
      { text: "mood board wall, half-packed bag, beautiful chaos", personality: "Plot Twist" },
      { text: "polished table, good lamp, everything exactly where it belongs", personality: "Smooth Talker" },
      { text: "dim lighting, deep colors, one perfect speaker playing something low", personality: "After Hours" },
    ],
  },
  {
    prompt: "What kind of main character energy do you have?",
    answers: [
      { text: "soft, magnetic, impossible not to romanticize", personality: "Golden Hour" },
      { text: "unpredictable, sharp, always one choice away from a plot twist", personality: "Plot Twist" },
      { text: "charming, composed, and low-key impossible to forget", personality: "Smooth Talker" },
      { text: "intense, mysterious, and better after dark", personality: "After Hours" },
    ],
  },
  {
    prompt: "If your coffee order were a personal brand statement, what would it say?",
    answers: [
      { text: "sweet, bright, effortless, but still specific", personality: "Golden Hour" },
      { text: "surprise me, but make it interesting", personality: "Plot Twist" },
      { text: "classic, smooth, and exactly right every time", personality: "Smooth Talker" },
      { text: "bold, smoky, and not here to be subtle", personality: "After Hours" },
    ],
  },
];

export const resultsByPersonality: Record<
  PersonalityKey,
  {
    description: string;
    coffee: string;
    coffeeDescription: string;
    moodBoard: { title: string; description: string }[];
  }
> = {
  "Golden Hour": {
    description:
      "You are warm, luminous, and naturally magnetic. Your taste leans bright, sweet, and effortlessly elevated. You want a coffee that feels like fresh light coming through the window.",
    coffee: "Golden Hour",
    coffeeDescription:
      "A light-medium roast with honeyed sweetness and a smooth finish. Soft glow energy, but specific enough to feel intentional.",
    moodBoard: [
      { title: "Morning light", description: "Film grain, undone hair, cream knitwear, and sunlight on the kitchen floor." },
      { title: "Soft luxury", description: "Glass table, peaches, gold jewelry, and a playlist that sounds expensive without trying." },
      { title: "Weekend ritual", description: "Farmer's market flowers, linen, warm neutrals, and iced coffee in a perfect glass." },
      { title: "Social energy", description: "Romantic rooftop glow, camera roll full of candids, and effortless main-character softness." },
    ],
  },
  "Plot Twist": {
    description:
      "You are instinctive, curious, and impossible to predict. You do not want the obvious pick. You want something with edge, surprise, and a little story behind it.",
    coffee: "Off the Map",
    coffeeDescription:
      "An experimental micro-lot with unexpected notes and a rotating profile. This one is for people who love a surprise with real taste behind it.",
    moodBoard: [
      { title: "Unexpected itinerary", description: "Airport gate screenshot, silver accessories, messy notes app, and one dramatic outfit change." },
      { title: "Interesting taste", description: "Fashion week energy, niche perfume, a bag packed in under ten minutes, and zero interest in routine." },
      { title: "Beautiful chaos", description: "Layered textures, odd little objects, blurry city photos, and a camera roll that feels cinematic." },
      { title: "Edge", description: "You like the thing nobody else picked yet, but by next month everyone will copy it." },
    ],
  },
  "Smooth Talker": {
    description:
      "You are polished, charming, and classic in a way that still feels current. You like quality that speaks quietly but lands hard. Nothing forced, nothing messy.",
    coffee: "Sunday Paper",
    coffeeDescription:
      "A medium-roast comfort blend with hazelnut and vanilla notes. Smooth, reliable, and elegant without ever feeling boring.",
    moodBoard: [
      { title: "Quiet confidence", description: "Tailored coat, clean nails, perfectly lit corner booth, and one very specific order." },
      { title: "Timeless taste", description: "Glossy magazine, leather loafers, polished playlists, and good lighting in every room." },
      { title: "Easy charm", description: "Classic silhouettes, neutral palette, and the kind of taste that makes everything feel elevated." },
      { title: "Soft power", description: "You never have to do too much. The details already say enough." },
    ],
  },
  "After Hours": {
    description:
      "You are bold, moody, and built for later in the day. Your taste is deeper, stronger, and a little dramatic. You want coffee with presence.",
    coffee: "Campfire Stories",
    coffeeDescription:
      "A dark roast with smoky richness and toasted sweetness. Think s'mores vibes, city nights, and low lighting done right.",
    moodBoard: [
      { title: "Night energy", description: "Black coat, glossy boots, dimly lit tables, and a city that only gets better after midnight." },
      { title: "Heat", description: "Candles, dark wood, espresso after dinner, and the confidence to order the boldest thing on the menu." },
      { title: "Atmosphere", description: "Deep colors, velvet textures, late texts, and a playlist with bass you can feel." },
      { title: "Presence", description: "You do not want subtle. You want a drink with actual point of view." },
    ],
  },
};