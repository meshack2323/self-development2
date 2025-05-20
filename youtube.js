// Replace with your actual YouTube Data API v3 key
const API_KEY = "AIzaSyBU2hW3Cv10f-8fh0y2VptbNSM9PvvHmkY";

// Get references to elements
const searchForm = document.getElementById("youtube-search-form");
const searchInput = document.getElementById("youtube-search-input");
const resultsContainer = document.getElementById("youtube-results");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== "") {
    searchYouTube(query);
  }
});

function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.items);
    })
    .catch(error => {
      console.error("YouTube API error:", error);
      resultsContainer.innerHTML = "<p>Failed to fetch results. Check your API key or connection.</p>";
    });
}

function displayResults(videos) {
  resultsContainer.innerHTML = "";

  if (videos.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  videos.forEach(video => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;

    const videoElement = document.createElement("div");
    videoElement.classList.add("video-result");

    videoElement.innerHTML = `
      <h3>${title}</h3>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" 
              title="${title}" frameborder="0" allowfullscreen></iframe>
    `;

    resultsContainer.appendChild(videoElement);
  });
}
