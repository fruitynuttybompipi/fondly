export const QUOTES = [
  'Happiness is made of little moments.',
  "You are allowed to enjoy the life you're building.",
  'Collect moments, not perfection.',
  'There is beauty in the ordinary.',
  'You did enough today. Be proud of yourself.',
  'The more you notice the good, the more good you will find.',
  'Small joys still count. They might count the most.',
  'Today left you a few sweet things. You kept them.',
  'Soft days are good days too.',
  'Your heart did a lovely job of noticing today.',
  'Tiny moments, gently held, become a life you love.',
  'Rest now. Tomorrow has more little things waiting.',
  'You made room for gladness today. That matters.',
  'Ordinary days are where the magic hides.',
];

export const PROMPTS = [
  'Something that made me smile today…',
  "Someone I'm thankful for…",
  'A little moment I wish I could pause…',
  'Something beautiful I noticed…',
  "Something I'm proud of myself for…",
];

export const AFFIRMATIONS = [
  'I am allowed to take up space and take it slow.',
  'Good things are growing, even when I can’t see them yet.',
  'I am doing better than I think I am.',
  'My kindness counts, especially the kindness I give myself.',
  'I can hold today gently.',
  'There is enough light for the next small step.',
  'I deserve the same patience I give everyone else.',
  'Joy is allowed to be small.',
  'I am learning, and that is enough.',
  'Today I will notice one lovely thing.',
];

export const REMINDERS = [
  'Drink a glass of water and unclench your jaw.',
  'Text someone you miss. Just a hello is fine.',
  'Look out a window for a whole minute.',
  'Your shoulders are probably up by your ears. Let them drop.',
  'Step outside, even for five breaths.',
  'Eat something colourful today.',
  'Put on a song you loved at sixteen.',
  'Tidy one tiny corner. Just one.',
  'Say thank you to someone who won’t expect it.',
  'You don’t have to finish everything today.',
];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
/** Same pick all day, a new one tomorrow. */
export const dailyPick = (list, date, salt = '') => list[hash(date + salt) % list.length];

export function greeting(hour) {
  if (hour < 5) return { text: 'Still up, night owl?', art: 'sparkle' };
  if (hour < 18) return { text: 'Hello, sunshine!', art: 'sun' };
  return { text: 'Good evening, moonbeam', art: 'sparkle' };
}

export const EMPTY_OTD = "Your little memories are still growing. One day, you'll look back and smile at the beautiful moments you've collected. ♡";
