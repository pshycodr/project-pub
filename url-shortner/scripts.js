function shortenUrl() {
    const longUrl = document.getElementById("long-url").value;
    // Implement your URL shortening logic here
    const shortUrl = `https://example.com/${generateShortCode()}`;
    document.getElementById("short-url").textContent = shortUrl;
  }

  function generateShortCode() {
    // Implement your short code generation logic here
    return Math.random().toString(36).substring(2, 8);
  }