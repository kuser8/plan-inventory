// Card registration helper mirroring upstream's own idempotency-guarded
// pattern (customElements.get(...) check, window.customCards.find(...)
// check) — see ANALYSIS.md "Frontend: регистрация карточки и customCards".
/**
 * @param {object} opts
 * @param {string} opts.tag
 * @param {CustomElementConstructor} opts.elementClass
 * @param {string} [opts.editorTag]
 * @param {CustomElementConstructor} [opts.editorClass]
 * @param {{type: string, name: string, description: string, preview?: boolean, documentationURL?: string}} opts.cardConfig
 */
export function registerCard({ tag, elementClass, editorTag, editorClass, cardConfig }) {
  if (!customElements.get(tag)) {
    customElements.define(tag, elementClass);
  }
  if (editorTag && editorClass && !customElements.get(editorTag)) {
    customElements.define(editorTag, editorClass);
  }

  window.customCards = window.customCards || [];
  const existing = window.customCards.find((card) => card.type === cardConfig.type);
  if (!existing) {
    window.customCards.push(cardConfig);
  }
}
