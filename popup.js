document.getElementById("findPhotos").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("facebook.com")) {
    alert("This extension only works on Facebook pages.");
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"],
    },
    (results) => {
      const photos = results[0].result;
      const photoList = document.getElementById("photoList");
      photoList.innerHTML = "";

      if (photos.length === 0) {
        photoList.textContent = "No relevant photos found.";
        return;
      }

      photos.forEach((photo) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = photo.src;
        img.style.width = "60px";
        img.style.cursor = "pointer";
        img.alt = `Image: ${photo.width}x${photo.height}`;
        img.title = `Image: ${photo.width}x${photo.height}`;

        img.addEventListener("click", () => {
          window.open(photo.src, "_blank");
        });

        li.appendChild(img);
        photoList.appendChild(li);
      });
    }
  );
});
