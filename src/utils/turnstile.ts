export type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};
export const turnstileApi = () => (window as unknown as { turnstile?: Turnstile }).turnstile;
let loading: Promise<Turnstile> | undefined;
export function loadTurnstile(): Promise<Turnstile> {
  if (turnstileApi()) return Promise.resolve(turnstileApi()!);
  if (loading) return loading;
  loading = new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => turnstileApi() ? resolve(turnstileApi()!) : reject(new Error('Challenge unavailable'));
    script.onerror = () => { script.remove(); reject(new Error('Challenge unavailable')); };
    document.head.append(script);
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}
