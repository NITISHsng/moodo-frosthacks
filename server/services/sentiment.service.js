/**
 * Simple VADER-style sentiment analysis
 * Returns sentiment score from -1 (negative) to +1 (positive)
 */

const POSITIVE_WORDS = {
  excellent: 0.9,
  great: 0.8,
  good: 0.7,
  happy: 0.8,
  love: 0.9,
  wonderful: 0.9,
  amazing: 0.9,
  fantastic: 0.9,
  awesome: 0.8,
  perfect: 0.9,
  beautiful: 0.8,
  brilliant: 0.8,
  wonderful: 0.9,
  delighted: 0.9,
  pleased: 0.7,
  glad: 0.7,
  cheerful: 0.8,
  optimistic: 0.7,
};

const NEGATIVE_WORDS = {
  terrible: -0.9,
  awful: -0.9,
  horrible: -0.9,
  bad: -0.7,
  sad: -0.8,
  hate: -0.9,
  angry: -0.8,
  frustrated: -0.7,
  disappointed: -0.7,
  depressed: -0.9,
  anxious: -0.7,
  worried: -0.6,
  stressed: -0.7,
  miserable: -0.9,
  disgusted: -0.8,
  furious: -0.9,
  devastated: -0.9,
  hopeless: -0.9,
};

const INTENSIFIERS = {
  very: 1.3,
  extremely: 1.5,
  incredibly: 1.4,
  absolutely: 1.3,
  really: 1.2,
  so: 1.2,
  quite: 1.1,
};

const NEGATIONS = ["not", "no", "never", "neither", "nobody", "nothing"];

/**
 * Analyze sentiment of text
 * @param {string} text - Input text to analyze
 * @returns {object} { sentimentScore: number, label: string, confidence: number }
 */
export const analyzeSentiment = (text) => {
  if (!text || typeof text !== "string") {
    return { sentimentScore: 0, label: "neutral", confidence: 0 };
  }

  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let wordCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[^\w]/g, "");
    let wordScore = 0;

    // Check for negation in previous word
    const isNegated = i > 0 && NEGATIONS.includes(words[i - 1].replace(/[^\w]/g, ""));

    // Check for intensifier in previous word
    let intensifier = 1;
    if (i > 0) {
      const prevWord = words[i - 1].replace(/[^\w]/g, "");
      intensifier = INTENSIFIERS[prevWord] || 1;
    }

    // Get word sentiment
    if (POSITIVE_WORDS[word]) {
      wordScore = POSITIVE_WORDS[word];
    } else if (NEGATIVE_WORDS[word]) {
      wordScore = NEGATIVE_WORDS[word];
    }

    // Apply negation and intensifier
    if (wordScore !== 0) {
      if (isNegated) {
        wordScore = -wordScore * 0.5; // Reduce intensity of negation
      } else {
        wordScore *= intensifier;
      }
      score += wordScore;
      wordCount++;
    }
  }

  // Normalize score to [-1, 1]
  let sentimentScore = 0;
  if (wordCount > 0) {
    sentimentScore = Math.max(-1, Math.min(1, score / wordCount));
  }

  // Determine label
  let label = "neutral";
  if (sentimentScore > 0.1) label = "positive";
  else if (sentimentScore < -0.1) label = "negative";

  // Calculate confidence based on word count
  const confidence = Math.min(1, wordCount / 10);

  return {
    sentimentScore: Math.round(sentimentScore * 100) / 100,
    label,
    confidence: Math.round(confidence * 100) / 100,
  };
};

/**
 * Combine sentiment score with mood score
 * @param {number} moodScore - Mood score (1-10)
 * @param {number} sentimentScore - Sentiment score (-1 to 1)
 * @returns {number} Combined score (1-10)
 */
export const combineSentimentWithMood = (moodScore, sentimentScore) => {
  // Normalize sentiment to 0-10 scale
  const sentimentNormalized = ((sentimentScore + 1) / 2) * 10;

  // Weight: 70% mood, 30% sentiment
  return Math.round((moodScore * 0.7 + sentimentNormalized * 0.3) * 10) / 10;
};
