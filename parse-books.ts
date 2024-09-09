import fs from "node:fs";

// Read the JSON file
const rawData = fs.readFileSync("bookdata.json", "utf-8");
const data = JSON.parse(rawData);

// Function to extract author-title pairs
function extractAuthorTitlePairs(data) {
  const pairs: { author: string; title: string; affiliateUrl?: string }[] = [];

  data.features.forEach((feature) => {
    const title = feature.properties.title;
    const authors = feature.properties.authors;

    authors.forEach((author: string) => {
      pairs.push({ author, title, affiliateUrl: "" });
    });
  });

  return pairs;
}

// Extract the pairs
const authorTitlePairs = extractAuthorTitlePairs(data).sort((a, b) => a.title.localeCompare(b.title));

// Generate markdown table
let markdownTable = "| Author | Title | URL |\n|--------|-------|-----|\n";
authorTitlePairs.forEach((pair) => {
  const url = pair.affiliateUrl || "N/A";
  markdownTable += `| ${pair.author} | ${pair.title} | ${url} |\n`;
});

// Write markdown table to file
fs.writeFileSync("hacker-news-favorite-books.md", markdownTable);

console.log("Author-title pairs have been extracted and saved to author_title_pairs.md as a markdown table with URL");

// Print the results
console.log(JSON.stringify(authorTitlePairs, null, 2));

// Optionally, write the results to a file
fs.writeFileSync("author_title_pairs.json", JSON.stringify(authorTitlePairs, null, 2));

console.log("Author-title pairs have been extracted and saved to author_title_pairs.json");
