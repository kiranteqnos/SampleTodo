 
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=3af37215cce748569ac15a29681ebb6d";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}