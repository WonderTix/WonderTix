/**
 * Shortens a description to the max length provided. Function will also shorten
 * the description so it does not cut off in the middle of a word. Also adds ...
 * to the end if cut off.
 *
 * @param {string} desc
 * @param {number} maxLength
 * @returns {string}
 */
export const trimDescription = (desc: string | null, maxLength: number): string => {
  const defaultDescription = 'No description available.';

  if (!desc) {
    return defaultDescription;
  }

  const trimmedDesc = desc.trimStart().trimEnd();
  if (trimmedDesc.length <= maxLength) {
    // If length of description is already fewer than max length, we're good
    return trimmedDesc;
  }

  const shorterDesc = trimmedDesc.substring(0, maxLength - 3);
  if (!isAlpha(trimmedDesc[maxLength - 3])) {
    // If we trimmed the description at the end of a word, return it
    return `${shorterDesc.trimEnd()}...`;
  }

  // Otherwise find the next start to a word to break the description at.
  // This avoids stopping the description in the middle of a word, or at punctuation/spaces
  const nonAlphaIndex = lastIndexOfLastFullWord(shorterDesc);
  if (nonAlphaIndex >= 0) {
    return `${shorterDesc.substring(0, nonAlphaIndex + 1)}...`;
  } else {
    return 'No description available.';
  }
};

/**
 * Finds the last index of the last full word.
 *
 * @param {string} str - string to test
 * @returns {number} index of last character of last word
 */
const lastIndexOfLastFullWord = (str: string): number => {
  if (!str.length) {
    return -1;
  }

  let searchingForNonAlpha = true;
  for (let i = str.length - 1; i >= 0; --i) {
    const currChar = str[i];

    if (searchingForNonAlpha) {
      searchingForNonAlpha = isAlpha(currChar);
    } else {
      if (isAlpha(currChar)) {
        return i;
      }
    }
  }

  return -1;
};

const isAlpha = (char: string) => {
  return /^[A-Z]$/i.test(char);
};
