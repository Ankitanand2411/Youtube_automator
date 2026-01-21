document.getElementById('tags').nextElementSibling.onclick = () => {
  const tags = document.getElementById('your-textarea-id').value.split(',').map(t => t.trim());

  const tagInput = Array.from(document.querySelectorAll('input'))
    .find(el => el.placeholder && el.placeholder.toLowerCase() === 'add tag');

  if (!tagInput) {
    alert("Tag input field not found. Make sure you're on the tag section.");
    return;
  }

  let i = 0;

  const enterTag = () => {
    if (i >= tags.length) return;

    tagInput.focus();
    tagInput.value = tags[i];

    tagInput.dispatchEvent(new Event('input', { bubbles: true }));
    tagInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    tagInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));

    i++;
    setTimeout(enterTag, 800); // Delay to ensure each tag registers
  };

  enterTag();
};

