// Runs before analytics or widgets, only on the event page.
(async () => {
  const prefix = "#registration=";
  if (!location.hash.startsWith(prefix)) return;
  const token = location.hash.slice(prefix.length);
  history.replaceState(
    history.state,
    "",
    location.pathname + location.search + "#registration"
  );
  if (document.readyState === "loading") {
    await new Promise(resolve =>
      document.addEventListener("DOMContentLoaded", resolve, { once: true })
    );
  }
  const form = document.querySelector(
    'ai-phi-registration[data-event="session-43"] form'
  );
  if (!form) return;
  form.scrollIntoView();
  const notice = document.createElement("p");
  notice.setAttribute("role", "status");
  form.querySelector(".registration-fields").before(notice);
  notice.textContent = "Loading your registration details…";
  try {
    if (!/^[A-Za-z0-9_-]{40,4096}$/.test(token)) throw new Error();
    const response = await fetch(
      "https://ai-phi-registration-links.ai-phi.workers.dev/session-43",
      {
        method: "POST",
        body: token,
        credentials: "omit",
        referrerPolicy: "no-referrer",
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!response.ok) throw new Error();
    const details = await response.json();
    for (const name of ["firstName", "lastName", "email"]) {
      const input = form.elements.namedItem(name);
      if (
        input instanceof HTMLInputElement &&
        !input.value &&
        typeof details[name] === "string"
      )
        input.value = details[name];
    }
    notice.textContent =
      "Please review your details and select Register to confirm your attendance.";
  } catch {
    notice.textContent =
      "Your personal link could not fill in this form. You can still enter your details below.";
  }
})();
