import subscription from '../subscription/config.json';
export function isSubscriptionJourney(_url: URL, _locals = {}): boolean {
  return subscription.enabled && Boolean(subscription.endpoint && subscription.turnstileSiteKey);
}
