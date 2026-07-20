/**
 * Custom history-based router utility.
 * Updates the URL path without reloading the page, keeping the MusicContext audio continuous.
 */
export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0 });
};
