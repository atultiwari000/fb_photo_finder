document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const images = document.querySelectorAll('img');

        const coverPhoto = Array.from(images).find(img => {
          const isFacebookImage = img.src.includes('scontent') && img.src.includes('fna.fbcdn.net');
          const isHighResolution = img.naturalWidth > 500; // yo chai change garna parla
          return isFacebookImage && isHighResolution;
        });
        if (coverPhoto) {
          return coverPhoto.src; 
        } else {
          return null; 
        }
      },
    },
    ([result]) => {
      const coverPhotoUrl = result.result;

      const coverPhotoElement = document.getElementById('cover-photo');
      const noPhotoMessage = document.getElementById('no-photo-message');

      if (coverPhotoUrl) {
        coverPhotoElement.src = coverPhotoUrl;
        coverPhotoElement.style.display = 'block';
        noPhotoMessage.style.display = 'none';

        coverPhotoElement.addEventListener('click', () => {
          chrome.tabs.create({ url: coverPhotoUrl });
        });
      } else {
        noPhotoMessage.style.display = 'block';
        coverPhotoElement.style.display = 'none';
      }
    }
  );
});
