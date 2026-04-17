"use client";

import { useMemo, useState } from "react";
import { quizQuestions, resultsByPersonality, type PersonalityKey } from "./quiz-data";

type Stage = "intro" | "quiz" | "result";

type Scores = Record<PersonalityKey, number>;

const personalities = Object.keys(resultsByPersonality) as PersonalityKey[];

const emptyScores = (): Scores => ({
  "Golden Hour": 0,
  "Plot Twist": 0,
  "Smooth Talker": 0,
  "After Hours": 0,
});

const totalQuestions = quizQuestions.length;

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>(emptyScores);

  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const percentages = useMemo(() => {
    const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
    if (!total) {
      return personalities.map((personality) => ({ personality, percentage: 0 }));
    }

    const raw = personalities.map((personality) => ({
      personality,
      percentage: Math.round((scores[personality] / total) * 100),
    }));

    const roundedTotal = raw.reduce((sum, item) => sum + item.percentage, 0);
    if (roundedTotal !== 100) {
      raw[0].percentage += 100 - roundedTotal;
    }

    return raw.sort((a, b) => b.percentage - a.percentage);
  }, [scores]);

  const leadResult = percentages[0]?.personality ?? "Golden Hour";

  const startQuiz = () => {
    setStage("quiz");
    setCurrentQuestion(0);
    setScores(emptyScores());
  };

  const handleAnswer = (personality: PersonalityKey) => {
    setScores((previous) => ({
      ...previous,
      [personality]: previous[personality] + 1,
    }));

    if (currentQuestion === totalQuestions - 1) {
      setStage("result");
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
  };

  const resetQuiz = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setScores(emptyScores());
  };

  const shareResult = async () => {
    const topTwo = percentages.slice(0, 2);
    const shareText = `I got ${topTwo[0].percentage}% ${topTwo[0].personality} and ${topTwo[1].percentage}% ${topTwo[1].personality} on the NovaBrew Coffee Taste Profile Quiz.`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "My NovaBrew Coffee Taste Profile",
          text: shareText,
        });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied. Paste it anywhere you want to share it.");
    }
  };

  if (stage === "intro") {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,244,228,0.95),_rgba(248,181,173,0.92)_35%,_rgba(246,160,152,0.9)_68%,_rgba(242,141,138,0.92)_100%)] px-5 py-8 text-stone-900 sm:px-8 lg:px-10">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/45 bg-white/70 shadow-[0_30px_120px_rgba(166,84,82,0.18)] backdrop-blur">
          <div className="grid flex-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-[#f5b9a6] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#b36053]">
                  NovaBrew Taste Profile Quiz
                </p>
                <h1 className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#3f241d] sm:text-6xl">
                  Find the coffee personality that actually fits your energy.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#72554f] sm:text-xl">
                  This quiz blends mood-board energy, lifestyle instincts, and taste preferences to match you with the NovaBrew coffee that feels like you. Think less survey, more beautifully curated self-discovery.
                </p>
                <p className="mt-4 inline-flex w-fit rounded-full border border-[#f1c7bc] bg-white/72 px-4 py-2 text-sm font-medium text-[#9a5a50] shadow-[0_10px_24px_rgba(171,96,91,0.08)]">
                  Now live online and ready to share.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <ValueCard title="7 curated prompts" description="One-question-at-a-time flow with soft transitions and a shareable finish." />
                <ValueCard title="4 trend-forward personas" description="Golden Hour, Plot Twist, Smooth Talker, and After Hours." />
                <ValueCard title="Percentage-based results" description="Because your taste has layers, not just one label." />
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="inline-flex min-h-[68px] items-center justify-center rounded-full bg-[#43231d] px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(67,35,29,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2f1612] sm:text-xl"
                >
                  Start the quiz
                </button>
                <p className="text-sm text-[#8a6c64]">
                  Designed to feel shareable, stylish, and personal from the very first click.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0.18))] p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,186,147,0.38),transparent_28%)]" />
              <div className="relative flex h-full flex-col gap-5 rounded-[1.8rem] border border-white/60 bg-[#fff7f4]/80 p-5 shadow-[0_20px_60px_rgba(156,74,71,0.12)]">
                <div className="grid grid-cols-2 gap-4">
                  <MoodTile tone="gold" title="Golden Hour" subtitle="sun-washed, sweet, magnetic" />
                  <MoodTile tone="rose" title="Plot Twist" subtitle="unexpected, instinctive, impossible to predict" />
                  <MoodTile tone="stone" title="Smooth Talker" subtitle="polished, classic, expensive without trying" />
                  <MoodTile tone="night" title="After Hours" subtitle="moody, intense, bold after dark" />
                </div>
                <div className="rounded-[1.6rem] border border-white/70 bg-white/85 p-5">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-[#af7a6f]">
                    <span>Sample result mix</span>
                    <span>100%</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    <ResultRow label="Golden Hour" value={52} color="bg-[#f5bc6b]" />
                    <ResultRow label="Smooth Talker" value={24} color="bg-[#d5b79f]" />
                    <ResultRow label="Plot Twist" value={16} color="bg-[#f08b8f]" />
                    <ResultRow label="After Hours" value={8} color="bg-[#6c4b46]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (stage === "result") {
    const lead = resultsByPersonality[leadResult];

    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#fff7f0_0%,#f6d2cb_52%,#f1b7a8_100%)] px-5 py-8 sm:px-8">
        <section className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/50 bg-white/75 shadow-[0_25px_100px_rgba(163,77,74,0.2)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
            <div className="border-b border-white/55 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b46356]">Your result</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#3f241d] sm:text-6xl">{leadResult}</h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#765852]">{lead.description}</p>

              <div className="mt-8 rounded-[1.6rem] border border-white/70 bg-[#fff7f4]/90 p-5 shadow-[0_18px_40px_rgba(160,81,78,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a46b61]">Matched coffee</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#41211b]">{lead.coffee}</h2>
                <p className="mt-3 text-base leading-7 text-[#785851]">{lead.coffeeDescription}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={shareResult}
                  className="rounded-full bg-[#43231d] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f1612]"
                >
                  Share my result
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-full border border-[#d9b8af] bg-white px-6 py-3.5 text-sm font-semibold text-[#55312a] transition hover:border-[#c69082] hover:bg-[#fff6f3]"
                >
                  Retake quiz
                </button>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="grid gap-4 sm:grid-cols-2">
                {lead.moodBoard.map((item, index) => (
                  <div
                    key={item.title}
                    className={`rounded-[1.6rem] p-5 shadow-[0_18px_40px_rgba(149,74,71,0.12)] ${moodClasses[index % moodClasses.length]}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6a3d36]/70">{item.title}</p>
                    <p className="mt-2 text-base leading-7 text-[#41231d]">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.8rem] border border-white/65 bg-white/75 p-6 shadow-[0_20px_50px_rgba(153,76,73,0.12)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#43231d]">Your full profile</h3>
                  <p className="text-sm text-[#8a6d66]">Percent-based blend</p>
                </div>
                <div className="mt-5 space-y-4">
                  {percentages.map((item) => (
                    <div key={item.personality}>
                      <div className="mb-2 flex items-center justify-between text-sm text-[#6d5149]">
                        <span className="font-medium">{item.personality}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/80">
                        <div
                          className={`h-full rounded-full ${barColors[item.personality]}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isPhotoDumpQuestion = currentQuestion === 0;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff7f1_0%,#f7d7d0_52%,#f3bbb0_100%)] px-4 py-5 sm:px-8 sm:py-8">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-4xl flex-col rounded-[2rem] border border-white/55 bg-white/72 p-5 shadow-[0_25px_100px_rgba(166,84,82,0.2)] backdrop-blur sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#b76457]">NovaBrew Quiz</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#41241d] sm:text-4xl">{question.prompt}</h1>
          </div>
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#7a5a52] shadow-sm">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/75">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ffb989,#ff8b7f,#c46b61)] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className={`mt-8 grid gap-4 ${isPhotoDumpQuestion ? "lg:grid-cols-2" : ""}`}>
          {question.answers.map((answer) => (
            <button
              key={answer.text}
              type="button"
              onClick={() => handleAnswer(answer.personality)}
              className={`group text-left shadow-[0_16px_40px_rgba(159,79,76,0.08)] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0a592] ${
                isPhotoDumpQuestion
                  ? "overflow-hidden rounded-[1.9rem] border border-white/75 bg-white/88 hover:-translate-y-1 hover:border-[#e6b4a9] hover:bg-[#fff9f7]"
                  : "rounded-[1.7rem] border border-white/70 bg-white/85 px-5 py-5 hover:-translate-y-0.5 hover:border-[#e6b4a9] hover:bg-[#fff9f7] sm:px-6"
              }`}
            >
              {isPhotoDumpQuestion ? (
                <PhotoDumpCard personality={answer.personality} description={answer.text} />
              ) : (
                <>
                  <span className="block text-lg font-medium leading-7 text-[#41231d] sm:text-[1.15rem]">{answer.text}</span>
                  <span className="mt-2 block text-sm text-[#8a6b63] opacity-0 transition group-hover:opacity-100">
                    tap to lock in this energy
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/65 bg-white/78 p-5 shadow-[0_16px_35px_rgba(159,79,76,0.08)]">
      <h2 className="text-base font-semibold text-[#40231d]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#7d6159]">{description}</p>
    </div>
  );
}

function MoodTile({ tone, title, subtitle }: { tone: "gold" | "rose" | "stone" | "night"; title: string; subtitle: string }) {
  const palette = {
    gold: "bg-[linear-gradient(160deg,#f8d9a9,#f3b977)]",
    rose: "bg-[linear-gradient(160deg,#f8c3c8,#f0908f)]",
    stone: "bg-[linear-gradient(160deg,#f3e2d6,#d7b7a2)]",
    night: "bg-[linear-gradient(160deg,#7f635b,#4a312c)] text-white",
  };

  return (
    <div className={`rounded-[1.6rem] p-5 shadow-[0_15px_35px_rgba(145,73,71,0.12)] ${palette[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Mood</p>
      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-2 text-sm leading-6 opacity-80">{subtitle}</p>
    </div>
  );
}

function PhotoDumpCard({ personality, description }: { personality: PersonalityKey; description: string }) {
  const presets: Record<
    PersonalityKey,
    {
      label: string;
      vibe: string;
      border: string;
      panel: string;
      tiles: { title: string; tint: string; image: string; position?: string }[];
    }
  > = {
    "Golden Hour": {
      label: "golden hour",
      vibe: "sun-washed, sweet, softly iconic",
      border: "from-[#f7daab] to-[#f1b36d]",
      panel: "bg-[linear-gradient(180deg,#fff8ef_0%,#ffe8c9_100%)]",
      tiles: [
        { title: "film glow", tint: "from-[#f8ddb3] to-[#f3b76b]", image: "https://images.pexels.com/photos/29561948/pexels-photo-29561948.jpeg?cs=srgb&dl=pexels-te-lensfix-3809940-29561948.jpg&fm=jpg", position: "center" },
        { title: "matcha run", tint: "from-[#f7d39a] to-[#f0b665]", image: "https://images.pexels.com/photos/29636965/pexels-photo-29636965.jpeg?cs=srgb&dl=pexels-matvalina-29636965.jpg&fm=jpg", position: "center" },
        { title: "blazer fit", tint: "from-[#f7e7cf] to-[#e9c79a]", image: "https://images.pexels.com/photos/4456710/pexels-photo-4456710.jpeg?cs=srgb&dl=pexels-n-voitkevich-4456710.jpg&fm=jpg", position: "center" },
        { title: "soft light", tint: "from-[#f0c98a] to-[#e6a85e]", image: "https://images.pexels.com/photos/4019921/pexels-photo-4019921.jpeg?cs=srgb&dl=pexels-wiljosan-au-1396839-4019921.jpg&fm=jpg", position: "center" },
      ],
    },
    "Plot Twist": {
      label: "plot twist",
      vibe: "chaotic, sharp, impossible to predict",
      border: "from-[#f6c8ce] to-[#ea7f86]",
      panel: "bg-[linear-gradient(180deg,#fff4f6_0%,#ffd6dd_100%)]",
      tiles: [
        { title: "concert blur", tint: "from-[#f2bcc7] to-[#e37f8a]", image: "https://images.pexels.com/photos/30328452/pexels-photo-30328452.jpeg?cs=srgb&dl=pexels-kha-ruxury-853562944-30328452.jpg&fm=jpg", position: "center" },
        { title: "gate 12", tint: "from-[#f5b2ba] to-[#da6f7d]", image: "https://images.pexels.com/photos/12063990/pexels-photo-12063990.jpeg?cs=srgb&dl=pexels-molochkomolochko-134950729-12063990.jpg&fm=jpg", position: "center" },
        { title: "3 tabs open", tint: "from-[#ffdce3] to-[#f2a3af]", image: "https://images.pexels.com/photos/14882254/pexels-photo-14882254.jpeg?cs=srgb&dl=pexels-alyona-antonenko-364775202-14882254.jpg&fm=jpg", position: "center" },
        { title: "late text", tint: "from-[#f7bec4] to-[#e58591]", image: "https://images.pexels.com/photos/35005200/pexels-photo-35005200.jpeg?cs=srgb&dl=pexels-liathyrax-1375501465-35005200.jpg&fm=jpg", position: "center" },
      ],
    },
    "Smooth Talker": {
      label: "smooth talker",
      vibe: "polished taste with zero effort showing",
      border: "from-[#e5d3c4] to-[#c7957a]",
      panel: "bg-[linear-gradient(180deg,#fff9f5_0%,#efe0d3_100%)]",
      tiles: [
        { title: "espresso shot", tint: "from-[#dfc7b3] to-[#c89876]", image: "https://images.pexels.com/photos/32207502/pexels-photo-32207502.jpeg?cs=srgb&dl=pexels-ron-lach-32207502.jpg&fm=jpg", position: "center" },
        { title: "trench coat", tint: "from-[#d9b79f] to-[#bb8869]", image: "https://images.pexels.com/photos/4456710/pexels-photo-4456710.jpeg?cs=srgb&dl=pexels-n-voitkevich-4456710.jpg&fm=jpg", position: "center" },
        { title: "corner table", tint: "from-[#f4e9df] to-[#ddc0a9]", image: "https://images.pexels.com/photos/29636965/pexels-photo-29636965.jpeg?cs=srgb&dl=pexels-matvalina-29636965.jpg&fm=jpg", position: "center" },
        { title: "good taste", tint: "from-[#dcc0ab] to-[#c18d6c]", image: "https://images.pexels.com/photos/29561948/pexels-photo-29561948.jpeg?cs=srgb&dl=pexels-te-lensfix-3809940-29561948.jpg&fm=jpg", position: "center" },
      ],
    },
    "After Hours": {
      label: "after hours",
      vibe: "late-night, bold, cinematic",
      border: "from-[#83625c] to-[#442723]",
      panel: "bg-[linear-gradient(180deg,#6b4d49_0%,#341c19_100%)] text-white",
      tiles: [
        { title: "city lights", tint: "from-[#7f6059] to-[#4a2f2b]", image: "https://images.pexels.com/photos/32037704/pexels-photo-32037704.jpeg?cs=srgb&dl=pexels-esteban-arango-709085-32037704.jpg&fm=jpg", position: "center" },
        { title: "boots by door", tint: "from-[#6a4a44] to-[#2f1a18]", image: "https://images.pexels.com/photos/30127943/pexels-photo-30127943.jpeg?cs=srgb&dl=pexels-ahmed-akeri-801514718-30127943.jpg&fm=jpg", position: "center" },
        { title: "candle wax", tint: "from-[#9b7b75] to-[#5a3a35]", image: "https://images.pexels.com/photos/35005200/pexels-photo-35005200.jpeg?cs=srgb&dl=pexels-liathyrax-1375501465-35005200.jpg&fm=jpg", position: "center" },
        { title: "1 a.m.", tint: "from-[#4a312d] to-[#1f100f]", image: "https://images.pexels.com/photos/14882254/pexels-photo-14882254.jpeg?cs=srgb&dl=pexels-alyona-antonenko-364775202-14882254.jpg&fm=jpg", position: "center" },
      ],
    },
  };

  const preset = presets[personality];

  return (
    <div className={`h-full p-4 sm:p-5 ${preset.panel}`}>
      <div className={`rounded-[1.5rem] bg-gradient-to-br p-[1px] ${preset.border}`}>
        <div className="rounded-[calc(1.5rem-1px)] bg-white/78 p-4 backdrop-blur">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6a60]">{preset.label}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#41231d]">{personality}</h3>
            </div>
            <div className="rounded-full bg-white/75 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8c6d65]">
              photodump
            </div>
          </div>

          <div className="grid auto-rows-[72px] grid-cols-5 gap-3 pb-2">
            {preset.tiles.map((tile, index) => {
              const collageClasses = [
                "col-span-3 row-span-3 rotate-[-3deg]",
                "col-span-2 row-span-2 translate-y-2 rotate-[2.5deg]",
                "col-span-2 row-span-2 -translate-y-2 rotate-[1.8deg]",
                "col-span-3 row-span-2 translate-x-2 rotate-[-2deg]",
              ];

              return (
                <div key={tile.title} className={`relative transition-transform duration-200 group-hover:scale-[1.01] ${collageClasses[index]}`}>
                  <div className="absolute left-4 top-3 z-20 h-3 w-3 rounded-full border border-white/75 bg-[#f9f2eb]/90 shadow-[0_4px_10px_rgba(80,43,38,0.18)]" />
                  <div className="h-full rounded-[1.35rem] bg-white/92 p-2 shadow-[0_14px_32px_rgba(103,55,52,0.16)]">
                    <div
                      className="relative h-full overflow-hidden rounded-[1rem] border border-white/70"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.34)), url(${tile.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: tile.position ?? "center",
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${tile.tint} opacity-10`} />
                      <div className="relative flex h-full items-end p-3">
                        <span className="rounded-full border border-white/45 bg-black/22 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                          {tile.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-sm leading-6 text-[#73564f]">{preset.vibe}</p>
          <p className="mt-2 text-xs leading-5 text-[#94756d]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm text-[#6d524a]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/80">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const moodClasses = [
  "bg-[linear-gradient(160deg,#f7d8a3,#f2bb7a)]",
  "bg-[linear-gradient(160deg,#f8cad1,#f19da0)]",
  "bg-[linear-gradient(160deg,#f2e3d8,#d8b9a4)]",
  "bg-[linear-gradient(160deg,#d1b4c6,#f0d0d8)]",
];

const barColors: Record<PersonalityKey, string> = {
  "Golden Hour": "bg-[linear-gradient(90deg,#f8d071,#f3ae62)]",
  "Plot Twist": "bg-[linear-gradient(90deg,#f28a92,#dd627a)]",
  "Smooth Talker": "bg-[linear-gradient(90deg,#d8bea7,#c89b80)]",
  "After Hours": "bg-[linear-gradient(90deg,#72534d,#3d2420)]",
};
