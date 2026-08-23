import { css } from 'lit';

// Shared look & feel for all four cards, built on standard Home Assistant
// CSS custom properties (same set the upstream simple-inventory-card uses,
// see ANALYSIS.md "Frontend: темизация") so these cards read as part of the
// same family. Fallback values are provided since not every HA theme
// defines every one of these tokens.
export const sharedStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color);
    background: var(--card-background-color, #fff);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .muted {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }

  input[type='text'],
  input[type='number'],
  input[type='date'],
  select,
  textarea {
    font: inherit;
    color: var(--primary-text-color);
    background: var(--card-background-color, #fff);
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    padding: 6px 8px;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  label {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    display: block;
    margin-bottom: 2px;
  }

  button,
  .btn {
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color);
  }

  button:disabled,
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .btn-primary {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }

  .btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    background: var(--secondary-background-color, #f0f0f0);
  }

  .btn-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 0.8em;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color);
    cursor: pointer;
    user-select: none;
  }

  .chip.active {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 0.75em;
    font-weight: 500;
    white-space: nowrap;
  }

  .badge-warning {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent);
    color: var(--warning-color, #ff9800);
  }

  .badge-error {
    background: color-mix(in srgb, var(--error-color, #f44336) 18%, transparent);
    color: var(--error-color, #f44336);
  }

  .badge-success {
    background: color-mix(in srgb, var(--success-color, #4caf50) 18%, transparent);
    color: var(--success-color, #4caf50);
  }

  .divider {
    border: none;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    margin: 8px 0;
  }

  .empty-state {
    text-align: center;
    color: var(--secondary-text-color);
    padding: 24px 8px;
  }

  .error-text {
    color: var(--error-color, #f44336);
    font-size: 0.85em;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--divider-color, #e0e0e0);
    border-radius: 4px;
  }
`;
