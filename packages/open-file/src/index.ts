export interface IOptions {
  /**
   * Accept MimeType, support *
   *  image/*
   *  image/png
   *  image/jpg
   *  video/*
   *  text/markdown
   *  application/json
   *  ...
   * 
   *  see more according @zodash/mime
   */
  accept?: string;

  /**
   * Support mutiple file
   */
  multiple?: boolean;

  /**
   * Support directory
   */
  isDirectory?: boolean;
}

/**
 * 
 * @param options Open file dialog to select file in browser
 * @returns 
 */
export function openFile(options?: IOptions) {
  return new Promise<FileList>(resolve => {
    const input = document.createElement('input');
    //
    input.style.position = 'fixed';
    input.style.bottom = '0';
    input.style.left = '0';
    input.style.visibility = 'hidden';
    //
    input.setAttribute('type', 'file');

    if (options?.accept) {
      input.setAttribute('accept', options.accept);
    }

    if (options?.multiple) {
      input.setAttribute('multiple', '');
    }

    if (options?.isDirectory) {
      input.setAttribute('directory', 'directory');
      input.setAttribute('webkitdirectory', 'webkitdirectory');
    }

    //
    function onChange() {
      clean();

      resolve(input.files);
    };

    function mount() {
      document.body.appendChild(input);
      input.addEventListener('change', onChange);
    }

    function clean() {
      input.removeEventListener('change', onChange);
      document.body.removeChild(input);
    }
    
    function open() {
      mount();

      input.click();
    }

    open();
  });
}

export default openFile;
