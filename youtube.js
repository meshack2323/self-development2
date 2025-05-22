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

function searchYouTube() {
  const query = document.getElementById("youtubeSearch").value;
  const apiKey = 'AIzaSyBU2hW3Cv10f-8fh0y2VptbNSM9PvvHmkY'; // replace with your key
  const maxResults = 5;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=${maxResults}&type=video`)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById("videoResults");
      resultsDiv.innerHTML = "";

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = "100%";
        iframe.height = "315";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        resultsDiv.appendChild(iframe);
      });
    })
    .catch(error => console.error("YouTube API error:", error));
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
