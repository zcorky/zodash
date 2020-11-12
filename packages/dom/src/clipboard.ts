export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    return await fallbackCopyTextToClipboard(text);
  }

  try {
    return await navigator.clipboard.writeText(text)
  } catch (error) {
    throw new Error('Copy Failed');
  }  
}

async function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    // var msg = successful ? 'successful' : 'unsuccessful';
    // console.log('Fallback: Copying text command was ' + msg);
    if (!successful) {
      throw new Error('Copy Failed');
    }
  } catch (err) {
    throw new Error('Copy Failed');
  } finally {
    document.body.removeChild(textArea);
  }
}