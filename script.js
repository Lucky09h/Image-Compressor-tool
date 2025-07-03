function countWords() {
  let text = document.getElementById("wordInput").value;
  let words = text.trim().split(/\s+/).filter(Boolean);
  document.getElementById("wordCount").innerText = words.length;
}

function countChars() {
  let text = document.getElementById("charInput").value;
  document.getElementById("charCount").innerText = text.length;
}

function estimateReadingTime() {
  let text = document.getElementById("readInput").value;
  let words = text.trim().split(/\s+/).filter(Boolean).length;
  let time = Math.ceil(words / 200); // 200 wpm
  document.getElementById("readingTime").innerText = time;
}

function checkDensity() {
  let text = document.getElementById("densityInput").value.toLowerCase();
  let words = text.trim().split(/\s+/).filter(Boolean);
  let wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  let output = '';
  for (let word in wordCount) {
    let percent = ((wordCount[word] / words.length) * 100).toFixed(2);
    output += `${word}: ${percent}% (${wordCount[word]} times)\n`;
  }
  document.getElementById("densityOutput").innerText = output;
}

function generateHashtags() {
  let input = document.getElementById("hashtagInput").value;
  let words = input.trim().split(/\s+/).filter(Boolean);
  let hashtags = words.map(w => `#${w.replace(/[^a-zA-Z0-9]/g, '')}`).join(' ');
  document.getElementById("hashtagOutput").innerText = hashtags;
}

function convertCase(type) {
  let text = document.getElementById("caseInput").value;
  if (type === 'upper') {
    document.getElementById("caseInput").value = text.toUpperCase();
  } else {
    document.getElementById("caseInput").value = text.toLowerCase();
  }
}

function countLines() {
  let text = document.getElementById("lineInput").value;
  let lines = text.split('\n').filter(Boolean).length;
  document.getElementById("lineCount").innerText = lines;
}

function removeSpaces() {
  let text = document.getElementById("spaceInput").value;
  let cleaned = text.replace(/\s+/g, ' ').trim();
  document.getElementById("cleanOutput").innerText = cleaned;
}

function generateMetaTags() {
  let title = document.getElementById("metaTitle").value;
  let desc = document.getElementById("metaDesc").value;

  let result = `<meta name="title" content="${title}">\n<meta name="description" content="${desc}">`;
  document.getElementById("metaOutput").innerText = result;
}

function generatePrivacy() {
  let name = document.getElementById("siteName").value;
  let email = document.getElementById("contactEmail").value;

  let policy = `Privacy Policy for ${name}\n\nWe respect your privacy... For questions, contact us at ${email}.`;
  document.getElementById("privacyOutput").innerText = policy;
}
