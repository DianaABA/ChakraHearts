import React from 'react';
import { render, screen as tlScreen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalPanel from '../../components/EducationalPanel';

const noop = () => {};

describe('EducationalPanel', () => {
  it('toggles reading mode and fullscreen, and ESC exits fullscreen', () => {
    const { container } = render(
      <EducationalPanel isOpen={true} onClose={noop} />
    );

    const panel = container.querySelector('.educational-panel');
    expect(panel).toBeTruthy();

    // Reading mode toggle
  const readingBtn = tlScreen.getByRole('button', { name: /reading mode/i });
    fireEvent.click(readingBtn);
    expect(panel?.classList.contains('reading')).toBe(true);

    // Fullscreen toggle
  const fsBtn = tlScreen.getByRole('button', { name: /enter fullscreen/i });
    fireEvent.click(fsBtn);
    expect(panel?.classList.contains('fullscreen')).toBe(true);

    // Escape exits fullscreen
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(panel?.classList.contains('fullscreen')).toBe(false);

    // Has a sticky subheader for Chakras (more specific than tab label)
    expect(tlScreen.getByText(/Chakras.*Root Chakra/i)).toBeInTheDocument();
  });
});
