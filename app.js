(() => {
  const body = document.body;
  const choices = [...document.querySelectorAll('[data-design-choice]')];
  const allowed = new Set(choices.map((button) => button.dataset.designChoice));
  const storageKey = 'barrometamorfose-design';

  function selectDesign(name, persist = true) {
    const design = allowed.has(name) ? name : 'caderno';
    body.dataset.design = design;
    choices.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.designChoice === design));
    });
    if (persist) {
      try { localStorage.setItem(storageKey, design); } catch { /* storage can be disabled */ }
    }
  }

  let initial = 'caderno';
  try { initial = localStorage.getItem(storageKey) || initial; } catch { /* storage can be disabled */ }
  selectDesign(initial, false);
  choices.forEach((button) => {
    button.addEventListener('click', () => selectDesign(button.dataset.designChoice));
  });
})();
