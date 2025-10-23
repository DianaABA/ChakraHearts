/**
 * Transition utilities for smooth scene and component animations
 */

export type TransitionType =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down"
  | "scale"
  | "blur"
  | "glow";

export interface TransitionConfig {
  type: TransitionType;
  duration: number;
  easing: string;
  delay?: number;
}

export const DEFAULT_TRANSITIONS: Record<string, TransitionConfig> = {
  scene: {
    type: "fade",
    duration: 800,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  character: {
    type: "slide-up",
    duration: 600,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  dialogue: {
    type: "slide-up",
    duration: 400,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  menu: {
    type: "scale",
    duration: 500,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  educational: {
    type: "slide-right",
    duration: 600,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  button: {
    type: "glow",
    duration: 300,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  karma: {
    type: "glow",
    duration: 500,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
};

/**
 * Apply transition styles to an element
 */
export const applyTransition = (
  element: HTMLElement,
  config: TransitionConfig
): void => {
  const { type, duration, easing, delay = 0 } = config;

  element.style.transition = `all ${duration}ms ${easing}`;
  if (delay > 0) {
    element.style.transitionDelay = `${delay}ms`;
  }

  // Add transition-specific classes
  element.classList.add(`transition-${type}`);
};

/**
 * Create a smooth transition between two elements
 */
export const createTransition = (
  fromElement: HTMLElement | null,
  toElement: HTMLElement,
  config: TransitionConfig
): Promise<void> => {
  return new Promise((resolve) => {
    const { duration, delay = 0 } = config;

    // Hide from element if it exists
    if (fromElement) {
      applyTransition(fromElement, { ...config, type: "fade" });
      fromElement.style.opacity = "0";
      fromElement.style.transform = "scale(0.95)";
    }

    // Show to element
    setTimeout(() => {
      applyTransition(toElement, config);
      toElement.style.opacity = "1";
      toElement.style.transform = "scale(1)";

      setTimeout(() => {
        resolve();
      }, duration);
    }, delay);
  });
};

/**
 * Add karma value change animation
 */
export const animateKarmaChange = (element: HTMLElement): void => {
  element.classList.add("karma-value-change");
  element.style.animation = "karmaGlow 0.8s ease-out";

  setTimeout(() => {
    element.classList.remove("karma-value-change");
    element.style.animation = "";
  }, 800);
};

/**
 * Add character entrance animation
 */
export const animateCharacterEntrance = (element: HTMLElement): void => {
  element.classList.add("character-fade-enter");

  requestAnimationFrame(() => {
    element.classList.add("character-fade-enter-active");
    element.classList.remove("character-fade-enter");

    setTimeout(() => {
      element.classList.remove("character-fade-enter-active");
    }, 600);
  });
};

/**
 * Add dialogue box slide animation
 */
export const animateDialogue = (element: HTMLElement): void => {
  element.classList.add("dialogue-slide-enter");

  requestAnimationFrame(() => {
    element.classList.add("dialogue-slide-enter-active");
    element.classList.remove("dialogue-slide-enter");

    setTimeout(() => {
      element.classList.remove("dialogue-slide-enter-active");
    }, 400);
  });
};

/**
 * Create staggered animations for multiple elements
 */
export const staggeredAnimation = (
  elements: HTMLElement[],
  config: TransitionConfig,
  staggerDelay: number = 100
): void => {
  elements.forEach((element, index) => {
    const delay = index * staggerDelay;
    applyTransition(element, { ...config, delay });
  });
};

/**
 * Preload transition styles
 */
export const preloadTransitions = (): void => {
  const style = document.createElement("style");
  style.textContent = `
    .transition-fade {
      opacity: 0;
      transition: opacity var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-slide-left {
      transform: translateX(-100%);
      transition: transform var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-slide-right {
      transform: translateX(100%);
      transition: transform var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-slide-up {
      transform: translateY(100%);
      transition: transform var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-slide-down {
      transform: translateY(-100%);
      transition: transform var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-scale {
      transform: scale(0);
      transition: transform var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-blur {
      filter: blur(10px);
      transition: filter var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-glow {
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transition: box-shadow var(--duration, 300ms) var(--easing, ease);
    }
    
    .transition-glow.active {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
  `;

  document.head.appendChild(style);
};
