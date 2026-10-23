export function getRefinement(_url: URL, _locals = {}): string { return 'custom'; }
export function getSignupLayout(_url: URL, _locals = {}) { return 'horizontal'; }
export function getHomePalette(url: URL, _locals = {}) { return url.pathname === '/' ? {id: 'strata'} : undefined; }
