/*
 * Habit catalog for the tracker.
 *
 * To add a new habit, copy this template into the HABITS array below
 * and fill it in:
 *
 *   {
 *     id: "unique_id",            // lowercase, no spaces — used as a key everywhere
 *     name: "Display name",
 *     icon: "iconKey",            // one of the keys in ICON_PATHS below, or add a new one
 *     freq: "how often",          // shown under the name, e.g. "1x / day", "3x / week"
 *     fact: "The science-backed fact — what the research shows, in plain language.",
 *     mechanism: "Why it works — the underlying mechanism, in one or two sentences.",
 *     citation: "Source — author/journal/year, kept short.",
 *     tips: ["A practical tip.", "A second practical tip."],
 *     week: [1,0,1,1,1,0,1],      // demo data for the Stats tab: 7 days, oldest first, 1 = done
 *     time: "9:00 AM"             // default reminder time shown on the Reminders tab
 *   }
 *
 * If you use a new `icon` key, add its outline path to ICON_PATHS too —
 * paths are drawn in a 24x24 viewBox with a 1.6px stroke (see app.js `icon()`).
 * Search thenounproject.com or Phosphor Icons (phosphoricons.com) for a simple
 * outline glyph and trace its `d` path, or ask an SVG icon generator for a
 * 24x24 outline icon and paste the path here.
 */

const ICON_PATHS = {
  water: "M12 2.5C12 2.5 5.5 11 5.5 15.5a6.5 6.5 0 0 0 13 0C18.5 11 12 2.5 12 2.5Z",
  teeth: "M8.5 4c-1.8 0-3 2-3 5.2 0 2.8.7 5.3 1.2 7.6.3 1.3.9 2.2 1.6 2.2.7 0 1-.7 1.3-2 .4-1.9 1-3.5 1.9-3.5.9 0 1.5 1.6 1.9 3.5.3 1.3.6 2 1.3 2 .7 0 1.3-.9 1.6-2.2.5-2.3 1.2-4.8 1.2-7.6 0-3.2-1.2-5.2-3-5.2-1 0-1.9.6-2.6 1.4C10.4 4.6 9.5 4 8.5 4Z",
  floss: "M4 6c4.5 4.5 4.5 7.5 8 7.5S16.5 10.5 21 6M4 18c4.5-4.5 4.5-7.5 8-7.5S16.5 13.5 21 18",
  dumbbell: "M4 9v6M20 9v6M6.5 6.5v11M17.5 6.5v11M6.5 12h11",
  book: "M3 5.2C5.2 4 8.3 3.8 12 5v14c-3.7-1.2-6.8-1-9-.2ZM21 5.2C18.8 4 15.7 3.8 12 5v14c3.7-1.2 6.8-1 9-.2Z",
  leaf: "M4.5 19.5C4.5 11 9.5 5 20 3c1 9-3.5 15.5-11 16.5-1.7.2-3.3.1-4.5 0Z",
  pencil: "M4 20l0.9-3.8L15.6 5.4l3 3L7.9 19.1 4 20Z M13.5 7.4l3 3",
  moon: "M20 14.2A8.3 8.3 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2Z",
  stretch: "M12 3.5v3.7M8.7 6.2l3.3 2 3.3-2M5 9.7l7 3.6 7-3.6M5 20l7-9 7 9M8.7 20h6.6",
  phoneSlash: "M6.5 3.5h9a2 2 0 0 1 2 2v3M17.5 16.5v3a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-15a2 2 0 0 1 1.2-1.83M3 3l18 18M10.5 17h2",
  // Add new icon keys here as "key: 'svg path data'".
  // A generic fallback (a simple dot) is used automatically if a habit
  // references a key that isn't defined.
};

const HABITS = [
  { id: "water", name: "Drink water", icon: "water", freq: "8x / day",
    fact: "Even 1–2% fluid loss measurably impairs attention, working memory and mood.",
    mechanism: "The brain is roughly 75% water; mild dehydration lowers blood volume, reducing oxygen and glucose delivery to neural tissue.",
    citation: "J. Nutr., 2012",
    tips: ["Keep a bottle in sight — visibility beats willpower.", "Pair a glass with an existing habit, like each meal."],
    week: [1,1,0,1,1,1,1], time: "9:00 AM" },
  { id: "teeth", name: "Brush teeth", icon: "teeth", freq: "3x / day",
    fact: "Brushing roughly every 8 hours resets the plaque biofilm before it matures and turns acidic.",
    mechanism: "Plaque bacteria start producing enamel-eroding acid within minutes of eating; frequent brushing disrupts the colony before it thickens.",
    citation: "J. Clin. Periodontol.",
    tips: ["Brush right after breakfast, lunch and before bed.", "Leave the brush somewhere you'll see it each time."],
    week: [1,1,1,1,1,0,1], time: "7:30 AM" },
  { id: "floss", name: "Floss", icon: "floss", freq: "1x / day",
    fact: "Floss reaches the roughly 40% of tooth surface bristles can't touch, cutting gum inflammation within two weeks.",
    mechanism: "Interdental plaque left undisturbed hardens into tartar that brushing alone can't remove.",
    citation: "Cochrane Oral Health Review",
    tips: ["Pre-cut floss picks remove the setup step.", "Do it right before brushing, not after."],
    week: [1,0,0,1,0,1,0], time: "9:30 PM" },
  { id: "gym", name: "Gym", icon: "dumbbell", freq: "4x / week",
    fact: "Regular training raises BDNF, a protein that supports new neuron growth and mood regulation.",
    mechanism: "Contracting muscle releases signaling proteins (myokines) that cross the blood-brain barrier.",
    citation: "Neurosci. Biobehav. Rev.",
    tips: ["Schedule it like a meeting, not a maybe.", "Lay out gym clothes the night before."],
    week: [1,0,1,0,1,0,0], time: "6:00 PM" },
  { id: "reading", name: "Reading", icon: "book", freq: "20 min / day",
    fact: "Deep reading builds cortical connectivity that measurably persists for days afterward.",
    mechanism: "Sustained narrative attention appears to leave a short-term 'echo' in language and somatosensory regions.",
    citation: "Berns et al., Brain Connectivity, 2013",
    tips: ["Keep the book more visible than your phone.", "Start with 10 minutes — consistency beats duration."],
    week: [1,1,1,0,1,1,1], time: "9:00 PM" },
  { id: "mindfulness", name: "Mindfulness", icon: "leaf", freq: "10 min / day",
    fact: "Eight weeks of practice is enough to increase grey-matter density in the hippocampus and shrink amygdala reactivity.",
    mechanism: "A calmer amygdala means a lower baseline stress response to the same trigger.",
    citation: "Hölzel et al., Psychiatry Research, 2011",
    tips: ["Same time, same spot, every day.", "Start at 3 minutes; extend once it's automatic."],
    week: [0,1,1,1,1,1,1], time: "7:00 AM" },
  { id: "journaling", name: "Journaling", icon: "pencil", freq: "1x / day",
    fact: "Writing about stressors reduces intrusive thoughts and blunts cortisol response to them.",
    mechanism: "Turning raw emotion into language recruits the prefrontal cortex, which helps regulate the amygdala's alarm signal.",
    citation: "Pennebaker & Beall",
    tips: ["Write before checking your phone, not after.", "One line still counts as a streak."],
    week: [1,1,0,1,1,0,1], time: "10:00 PM" },
  { id: "sleep", name: "Sleep on time", icon: "moon", freq: "Nightly",
    fact: "A fixed sleep time predicts better glucose control and cognition than sleep duration alone.",
    mechanism: "The suprachiasmatic nucleus times hormone release to a stable clock; shifting bedtimes blunts that signal.",
    citation: "Sleep Health cohort research",
    tips: ["Set a bedtime alarm, not just a wake alarm.", "Keep the same time on weekends too."],
    week: [1,1,1,1,0,0,1], time: "10:30 PM" },
  { id: "stretch", name: "Stretching", icon: "stretch", freq: "1x / day",
    fact: "Regular stretching adds sarcomeres to muscle fibers, permanently increasing flexible range.",
    mechanism: "Sustained tension signals muscle to grow in series, not just to lengthen under load.",
    citation: "J. Appl. Physiol.",
    tips: ["Stretch right after a shower — muscles are warmer.", "Hold each position 30 seconds, no bouncing."],
    week: [0,1,1,0,1,1,0], time: "7:15 AM" },
  { id: "nophone", name: "No phone before bed", icon: "phoneSlash", freq: "Nightly",
    fact: "Screen light in the hour before bed delays melatonin release and pushes sleep onset later.",
    mechanism: "Blue wavelengths stimulate melanopsin cells in the retina that tell the brain's clock it's still daytime.",
    citation: "Chang et al., PNAS, 2015",
    tips: ["Charge your phone outside the bedroom.", "Swap in a book or dim lamp as the wind-down cue."],
    week: [1,0,1,1,0,1,1], time: "10:00 PM" }

  // Add new habits below, following the template at the top of this file.
];
