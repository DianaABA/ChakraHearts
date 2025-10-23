import React from 'react';
import { render, screen as tlScreen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterPortrait } from '../../core/CharacterPortrait';

describe('CharacterPortrait', () => {
  it('falls back to Aurora image when portrait fails to load', async () => {
    render(
      <CharacterPortrait
        character="UMBRA"
        portrait="/invalid/path.png"
        position="center"
      />
    );

  const img = tlScreen.getByRole('img');
    // Trigger error to invoke fallback
    fireEvent.error(img);

    await waitFor(() => {
      const src = (img as HTMLImageElement).getAttribute('src') || '';
      expect(src.endsWith('/characters/aurora.png')).toBe(true);
    });
  });
});
