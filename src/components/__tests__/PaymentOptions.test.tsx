import React from 'react';
import { render, screen as tlScreen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { PaymentOptions } from '../../components/PaymentOptions';

describe('PaymentOptions', () => {
  it('calls onSelectPayment when clicking a character avatar (Elena)', async () => {
    const onSelectPayment = vi.fn();
    const onClose = vi.fn();

    vi.useFakeTimers();
  render(<PaymentOptions onSelectPayment={onSelectPayment} onClose={onClose} />);

  const elenaBtn = tlScreen.getByRole('button', { name: /choose elena/i });
    fireEvent.click(elenaBtn);

    // It shows a message first, then calls onSelectPayment after 2s
    vi.advanceTimersByTime(2000);
    expect(onSelectPayment).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('uses emoji for Sacred Cow (no image in the avatar button)', () => {
    const onSelectPayment = vi.fn();
    const onClose = vi.fn();
  render(<PaymentOptions onSelectPayment={onSelectPayment} onClose={onClose} />);

  const cowBtn = tlScreen.getByRole('button', { name: /choose sacred cow/i });
    // Within the button, there should be no <img>
    const imgInsideBtn = cowBtn.querySelector('img');
    expect(imgInsideBtn).toBeNull();
    // And it should display the cow emoji
    expect(cowBtn).toHaveTextContent('🐄');
  });
});
