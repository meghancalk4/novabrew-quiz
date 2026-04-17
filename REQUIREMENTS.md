# NovaBrew Coffee Taste Profile Quiz - Requirements

## Overview
A web-based personality quiz that matches coffee subscribers to their coffee personality and recommends specific NovaBrew coffees based on their results. The quiz should feel playful, trendy, and shareable, with a cool it-girl aesthetic that still feels polished enough for a premium brand.

## Personality Types
### Golden Hour
Warm, bright, soft, and effortlessly magnetic. Golden Hour is the subscriber who gravitates toward glow, sweetness, and easy elegance.

### Plot Twist
Unexpected, curious, and impossible to predict. Plot Twist is for the person who wants surprise, edge, and something a little more interesting than the obvious choice.

### Smooth Talker
Polished, charming, and timeless. Smooth Talker is the subscriber with refined taste who likes things classic, elevated, and consistently good.

### After Hours
Bold, moody, and intense. After Hours is for the subscriber who loves deeper flavors, stronger energy, and a little mystery.

## Coffee Pairings
- Golden Hour -> Golden Hour: light-medium roast, sweet and smooth, honey-processed warmth
- Plot Twist -> Off the Map: experimental micro-lot, surprising flavor notes, unexpected and adventurous
- Smooth Talker -> Sunday Paper: medium roast comfort with hazelnut and vanilla, polished and easy to love
- After Hours -> Campfire Stories: dark roast with s'mores vibes, rich, smoky, and dramatic

## Quiz Questions
### Question 1: Pick the photo dump that feels the most like you.
- A) golden light, matcha glass, oversized blazer, film grain -> Golden Hour
- B) blurry concert pic, random one-way ticket, three tabs open at once -> Plot Twist
- C) espresso in a heavy ceramic cup, perfect trench coat, unread texts handled calmly -> Smooth Talker
- D) city lights at 1 a.m., candle wax, boots by the door, last call energy -> After Hours

### Question 2: It's Sunday morning. What is your ideal plan?
- A) farmer's market, playlist on low, fresh flowers in the kitchen -> Golden Hour
- B) no plan, just vibes, maybe a spontaneous road trip by noon -> Plot Twist
- C) your usual cafe, same corner seat, one elite outfit, one strong opinion -> Smooth Talker
- D) sleeping in late, slow start, late brunch, then somehow staying out all night -> After Hours

### Question 3: Which trend are you secretly most drawn to?
- A) soft glowy clean-girl-but-better energy -> Golden Hour
- B) chaotic niche-core that nobody fully understands yet -> Plot Twist
- C) timeless staples that always look expensive -> Smooth Talker
- D) dark, cinematic, after-hours aesthetic with a little mystery -> After Hours

### Question 4: Pick the caption you'd actually post.
- A) caught the light right -> Golden Hour
- B) this was not on the itinerary -> Plot Twist
- C) nothing crazy, just good taste -> Smooth Talker
- D) don't ask what time I got home -> After Hours

### Question 5: Which space feels most like your brain?
- A) warm neutrals, linen curtains, sun coming through the window -> Golden Hour
- B) mood board wall, half-packed bag, beautiful chaos -> Plot Twist
- C) polished table, good lamp, everything exactly where it belongs -> Smooth Talker
- D) dim lighting, deep colors, one perfect speaker playing something low -> After Hours

### Question 6: What kind of main character energy do you have?
- A) soft, magnetic, impossible not to romanticize -> Golden Hour
- B) unpredictable, sharp, always one choice away from a plot twist -> Plot Twist
- C) charming, composed, and low-key impossible to forget -> Smooth Talker
- D) intense, mysterious, and better after dark -> After Hours

### Question 7: If your coffee order were a personal brand statement, what would it say?
- A) sweet, bright, effortless, but still specific -> Golden Hour
- B) surprise me, but make it interesting -> Plot Twist
- C) classic, smooth, and exactly right every time -> Smooth Talker
- D) bold, smoky, and not here to be subtle -> After Hours

## Quiz Logic
- Each answer maps to one personality type.
- Track a running tally across all questions.
- Show all four personalities as percentages at the end.
- The dominant percentage should be presented as the lead result.
- The results should still acknowledge the blend of traits so the outcome feels nuanced and personal.

## Visual Style
The quiz should feel playful, trendy, and cool in an it-girl way. It should lean mood-board-forward, lifestyle-driven, and current without feeling childish or meme-heavy.

Visual direction:
- warm, stylish, internet-native energy
- soft rounded buttons and gentle shapes
- polished but playful layout
- fashion-editorial mood board feel
- premium enough for a coffee brand, but fun enough to feel shareable

## Extra Features
- Images: yes, each result should include mood-board-style imagery or picture direction that visually describes the personality
- Icons or emoji in answer options: no
- Results should feel shareable and visually satisfying

## Technical Notes
- Built with Next.js + Tailwind CSS
- Single-page app with smooth transitions between questions
- Mobile-responsive
- Results page should be shareable