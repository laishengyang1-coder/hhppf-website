// A tab opened before the bilingual studio was published can still request
// its retired entry or catalog module. Reopen that selection in the new app.
if (window.location.pathname.startsWith('/color-studio/')) {
  const current = new URL(window.location.href);
  current.searchParams.set('lang', current.searchParams.get('lang') === 'zh' ? 'zh' : 'en');
  if (current.searchParams.has('view')) current.searchParams.set('mode', current.searchParams.get('view'));
  if (current.searchParams.has('model')) current.searchParams.set('car', current.searchParams.get('model'));
  current.searchParams.delete('view');
  current.searchParams.delete('model');
  current.pathname = '/color-studio/';
  window.location.replace(current.href);
}

export const swatches = [];
