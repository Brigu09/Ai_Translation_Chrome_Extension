// Save settings when dropdown changes
document.getElementById('targetLanguage').addEventListener('change', function() {
    const targetLanguage = this.value;
    chrome.storage.sync.set({ targetLanguage }, () => {
      console.log(`Target language set to ${targetLanguage}`);
    });
  });
  
  // Load saved settings when popup opens
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get("targetLanguage", ({ targetLanguage }) => {
      if (targetLanguage) {
        document.getElementById('targetLanguage').value = targetLanguage;
      }
    });
  });