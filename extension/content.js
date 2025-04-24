// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
      translateSelectedText(request.text, request.targetLanguage);
    }
  });
  
  // Function to translate text using the Python backend and replace it directly
  function translateSelectedText(text, targetLanguage) {
    // Store the current selection and range
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Store original text for potential restoration feature
    const originalText = text;
    
    // Call the translation API
    fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        target_language: targetLanguage
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.translated_text) {
        // Simply delete the selected content and insert the translated text
        range.deleteContents();
        const textNode = document.createTextNode(data.translated_text);
        range.insertNode(textNode);
        
        // Clear the selection
        selection.removeAllRanges();
      } else {
        console.error("Translation error:", data.error);
        alert("Translation failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Connection to translation server failed. Make sure the backend is running.");
    });
  }
  
  // Keep the original showTranslation function for potential future use
  function showTranslation(originalText, translatedText) {
    // Get the current selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "ai-translator-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.backgroundColor = "#f9f9f9";
    tooltip.style.border = "1px solid #ddd";
    tooltip.style.borderRadius = "4px";
    tooltip.style.padding = "10px";
    tooltip.style.zIndex = "10000";
    tooltip.style.maxWidth = "300px";
    tooltip.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    
    tooltip.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">Translation:</div>
      <div>${translatedText}</div>
      <div style="text-align: right; margin-top: 8px;">
        <button class="close-tooltip" style="padding: 3px 8px;">Close</button>
      </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Add event listener to close button
    tooltip.querySelector(".close-tooltip").addEventListener("click", () => {
      document.body.removeChild(tooltip);
    });
    
    // Close tooltip when clicking elsewhere
    document.addEventListener("click", function closeTooltip(e) {
      if (!tooltip.contains(e.target)) {
        if (document.body.contains(tooltip)) {
          document.body.removeChild(tooltip);
        }
        document.removeEventListener("click", closeTooltip);
      }
    });
  }