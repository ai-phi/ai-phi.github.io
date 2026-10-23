import { loadTurnstile, turnstileApi } from '../../utils/turnstile';
class SubscriptionForm extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const form = this.querySelector('form')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const result = this.querySelector<HTMLElement>('.result')!;
    const status = this.querySelector<HTMLElement>('[data-status]')!;
    if (this.dataset.forwardToFooter === 'true') {
      button.disabled = false;
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const footer = document.querySelector<HTMLElement>('#updates-footer');
        const target = footer?.querySelector<HTMLFormElement>('ai-phi-subscription form');
        const email = target?.querySelector<HTMLInputElement>('[name="email"]');
        if (!footer || !target || !email) { status.textContent = 'Please use the subscription form in the footer.'; return; }
        if (target.hidden) {
          footer.querySelector<HTMLElement>('.result')?.focus({ preventScroll: true });
        } else {
          email.value = form.querySelector<HTMLInputElement>('[name="email"]')!.value.trim();
          email.dispatchEvent(new Event('input', { bubbles: true }));
          const names = [...target.querySelectorAll<HTMLInputElement>('[name="firstName"], [name="lastName"]')];
          const next = names.find(input => !input.value.trim()) ?? target.querySelector<HTMLButtonElement>('button[type="submit"]');
          next?.focus({ preventScroll: true });
          const targetStatus = target.querySelector<HTMLElement>('[data-status]');
          if (targetStatus) targetStatus.textContent = names.some(input => !input.value.trim()) ? 'Your email is filled in. Add your name to finish subscribing.' : 'Your email is filled in. Select Subscribe to finish.';
        }
        footer.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      });
      return;
    }
    const unsubscribe = this.dataset.operation === 'unsubscribe';
    let sending = false, finished = false, token = '', widget = '';
    if (this.dataset.endpoint && this.dataset.sitekey) {
      status.textContent = 'Loading security check…';
      loadTurnstile().then(api => {
        widget = api.render(this.querySelector<HTMLElement>('[data-challenge]')!, {
          sitekey: this.dataset.sitekey, action: unsubscribe ? 'unsubscribe' : 'subscription', theme: 'auto', size: 'flexible',
          appearance: 'interaction-only',
          callback: (value: string) => { token = value; if (!sending && !finished) { button.disabled = false; if (status.textContent === 'Loading security check…') status.textContent = ''; } },
          'expired-callback': () => { token = ''; button.disabled = true; if (!sending && !finished) api.reset(widget); },
          'error-callback': () => { token = ''; button.disabled = true; status.textContent = 'The security check could not load. Please reload the page.'; },
        });
      }).catch(() => { status.textContent = 'The security check could not load. Please reload the page.'; });
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending || finished || !form.reportValidity()) return;
      if (!token || !this.dataset.endpoint) return;
      sending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
      try {
        {
          status.textContent = unsubscribe ? 'Unsubscribing…' : 'Subscribing…';
          const values = new FormData(form);
          const response = await fetch(this.dataset.endpoint!, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(60000),
            body: JSON.stringify({ email: values.get('email'), ...(values.has('firstName') ? { firstName: values.get('firstName'), lastName: values.get('lastName') } : { name: values.get('name') ?? '' }), website: values.get('website') ?? '', consent: true, turnstileToken: token }),
          });
          const data = await response.json();
          if (!response.ok || data.ok !== true) {
            status.textContent = typeof data.error === 'string' ? data.error : 'We could not complete your request. Please try again.';
            return;
          }
        }
        finished = true; form.hidden = true; result.hidden = false; form.reset(); result.focus();
      } catch { status.textContent = 'We could not complete your request because the connection was interrupted. Please try again.'; }
      finally {
        sending = false; form.removeAttribute('aria-busy');
        if (!finished) { token = ''; turnstileApi()?.reset(widget); }
      }
    });

  }
}
if (!customElements.get('ai-phi-subscription')) customElements.define('ai-phi-subscription', SubscriptionForm);
