// Create context menu item for translation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translate-selection",
      title: "Translate Selection",
      contexts: ["selection"]
    });
  });
  
  // Handle context menu clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate-selection") {
      chrome.storage.sync.get("targetLanguage", ({ targetLanguage }) => {
        // Default to English if not set
        const language = targetLanguage || "Spanish";
        
        // Send message to content script with selected text
        chrome.tabs.sendMessage(tab.id, {
          action: "translate",
          text: info.selectionText,
          targetLanguage: language
        });
      });
    }
  });