const re = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

// isMobile checks current device is mobile or not.
export const isMobile = () => re.test(navigator.userAgent);
