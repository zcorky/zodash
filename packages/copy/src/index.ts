async function copyClipboardApi(text: string) {
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  if (!navigator.clipboard) {
    throw new Error('The request is not allowed');
  }

  return navigator.clipboard.writeText(text);
}

async function copyExecCommand(text: string) {
  const textArea = window.document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  window.document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = window.document.execCommand('copy');
    // var msg = successful ? 'successful' : 'unsuccessful';
    // console.log('Fallback: Copying text command was ' + msg);
    if (!successful) {
      throw new Error('Copy Failed');
    }
  } catch (err) {
    throw new Error('Copy Failed');
  } finally {
    window.document.body.removeChild(textArea);
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    return await copyExecCommand(text);
  }

  try {
    return await copyClipboardApi(text);
  } catch (error) {
    throw new Error('Copy Failed');
  }
}

export default copyClipboardApi;
