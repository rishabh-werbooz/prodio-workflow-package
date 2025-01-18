import { isBannerStep, isFeedbackStep, isModalStep, isTooltipStep } from "../../lib/step-type";
import type { FlowState } from "../flow-state";
import { renderBanner } from "./render-banner";
import { createRoot } from "./render-common";
import { renderModal } from "./render-modal";
import { renderTooltip } from "./render-tooltip";

const getBoundaryEl = (state: FlowState): Element | undefined | null => {
  const boundary = state.flow?.rootElement ?? state.flowsContext.rootElement;
  const boundaryEl = boundary ? document.querySelector(boundary) : undefined;
  return boundaryEl;
};

export const render = (state: FlowState): void => {
  state.unmount();

  const step = state.currentStep;
  if (!step) return;

  if (isTooltipStep(step)) {
    const target = document.querySelector(step.targetElement);
    const boundaryEl = getBoundaryEl(state);
    if (target && boundaryEl !== null) {
      const root = createRoot({ boundaryEl, step });
      const { cleanup } = renderTooltip({ root, step, state, target, boundary: boundaryEl });
      state.flowElement = { element: root, cleanup, target };
    } else {
      state.waitingForElement = true;
    }
  }
  if (isFeedbackStep(step)) {
    const boundaryEl = getBoundaryEl(state);
    if (boundaryEl !== null) {
      const root = createRoot({ boundaryEl, step });
      renderModal({ root, step, state });
      state.flowElement = { element: root };
    } else {
      state.waitingForElement = true;
    }
  }
  if (isModalStep(step)) {
    const boundaryEl = getBoundaryEl(state);
    if (boundaryEl !== null) {
      const root = createRoot({ boundaryEl, step });
      renderModal({ root, step, state });
      state.flowElement = { element: root };
    } else {
      state.waitingForElement = true;
    }
  }
  if (isBannerStep(step)) {
    const boundaryEl = getBoundaryEl(state);
    if (boundaryEl !== null) {
      const root = createRoot({ boundaryEl, step });
      renderBanner({ root, step, state });
      state.flowElement = { element: root };
    } else {
      state.waitingForElement = true;
    }
  }
};
