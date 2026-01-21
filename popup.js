document.getElementById('inject').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tags = document.getElementById('tags').value;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pasteTags,
    args: [tags]
  });
});

function pasteTags(tags) {
  const tagList = tags.split(',').map(t => t.trim()).filter(t => t);
  const tagInput = document.querySelector('input[placeholder="Add tag"]');

  if (!tagInput) {
    alert("Couldn't find tag input field. Please check if you're on the correct page.");
    return;
  }

  tagInput.focus();

  let index = 0;
  const simulate = () => {
    if (index >= tagList.length) return;
    tagInput.value = tagList[index];
    tagInput.dispatchEvent(new Event('input', { bubbles: true }));
    tagInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    index++;
    setTimeout(simulate, 700); // delay to mimic typing
  };
  simulate();
}
