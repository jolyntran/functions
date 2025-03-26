const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      window.location.href = "index.html"; 
    } else {
      document.body.innerHTML = "Authorization failed. Try again.";
    }

