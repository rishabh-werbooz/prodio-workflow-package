import type { FlowBannerStep, FlowFeedbackStep, FlowModalStep, FlowTooltipStep, FooterActionItem } from "../../types";
import { isBannerStep, isFeedbackStep, isModalStep, isTooltipStep } from "../../lib/step-type";

export const getStepHeader = ({ step }: { step: FlowTooltipStep | FlowModalStep | FlowFeedbackStep }): HTMLElement => (
  <div className="flows-header">
    <h1 className="flows-title" dangerouslySetInnerHTML={{ __html: step.title }} />
    {!step.hideClose && <button aria-label="Close" className="flows-cancel flows-close-btn" />}
  </div>
);
export const getStepFooterActionButton = ({
  props,
  isLastStep,
  type
}: {
  props: FooterActionItem;
  isLastStep?: boolean;
  type?: string;
}): HTMLElement => {
  const classList = [];
  const variant = props.variant ?? "primary";

  if (variant === "primary") classList.push("flows-primary-btn");
  if (variant === "secondary") classList.push("flows-secondary-btn");
  if (props.cancel) classList.push("flows-cancel");
  if (props.prev) classList.push("flows-prev");
  if (props.next && !isLastStep) classList.push("flows-next");
  if (props.next && isLastStep) classList.push("flows-finish");
  if (props.targetBranch !== undefined) classList.push("flows-action");

  const className = classList.join(" ");

  if (props.href)
    return (
      <a className={className} href={props.href} target={props.external ? "_blank" : undefined}>
        {props.label}
      </a>
    );
  return (
    <button className={className} data-action={props.targetBranch} type={type === "feedback" ?  "submit" : "button"}>
      {props.label}
    </button>
  );
};
const getNextButton = ({
  isLastStep,
  label,
  type
}: {
  isLastStep: boolean;
  label?: string;
  type?: string;
}): HTMLElement =>
  getStepFooterActionButton({
    props: {
      next: true,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing is not suitable here
      label: label || (!isLastStep ? "Continue" : "Finish"),
      type: type
    },
    isLastStep,
  });
const getPrevButton = ({ label }: { label?: string }): HTMLElement =>
  getStepFooterActionButton({
    props: {
      prev: true,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing is not suitable here
      label: label || "Back",
      variant: "secondary",
    },
  });

const getStepFooterActions = ({
  items,
  isLastStep,
}: {
  items?: FooterActionItem[];
  isLastStep: boolean;
}): HTMLElement[] =>
  (items ?? []).map((item) => getStepFooterActionButton({ props: item, isLastStep }));
export const getStepFooter = ({
  step,
  isFirstStep,
  isLastStep,
}: {
  step: FlowModalStep | FlowTooltipStep;
  isLastStep: boolean;
  isFirstStep: boolean;
}): HTMLElement | null => {
  const backBtn = !isFirstStep && !step.hidePrev && getPrevButton({ label: step.prevLabel });
  const continueBtn = !step.hideNext && getNextButton({ label: step.nextLabel, isLastStep, type: step.type });
  const leftOptions = getStepFooterActions({ items: step.footerActions?.left, isLastStep });
  const centerOptions = getStepFooterActions({ items: step.footerActions?.center, isLastStep });
  const rightOptions = getStepFooterActions({ items: step.footerActions?.right, isLastStep });
  const someFooterBtn =
    backBtn || continueBtn || leftOptions.length || centerOptions.length || rightOptions.length;
  if (!someFooterBtn) return null;

  const isTooltip = isTooltipStep(step);
  const isModal = isModalStep(step);
  const isBanner = isBannerStep(step);
  const isFeedback = isFeedbackStep(step);

  return (
    <div className="flows-footer">
      <div>
        {isTooltip && backBtn}
        {isBanner && backBtn}
        {isBanner && continueBtn}
        {leftOptions}
      </div>
      <div>
        {isModal && backBtn}
        {centerOptions}
        {isModal && continueBtn}
      </div>
      <div>
        {isFeedback && backBtn}
        {centerOptions}
        {isFeedback && continueBtn}
      </div>
      <div>
        {rightOptions}
        {isTooltip && continueBtn}
      </div>
    </div>
  );
};

export const createRoot = ({
  boundaryEl,
  step,
}: {
  boundaryEl?: Element;
  step?: FlowTooltipStep | FlowModalStep | FlowBannerStep | FlowFeedbackStep;
} = {}): HTMLElement => {
  const root = <div className="flows-root" />;
  root.style.pointerEvents = "auto";
  if (step?.zIndex !== undefined) root.style.zIndex = step.zIndex;
  if (boundaryEl) boundaryEl.appendChild(root);
  else document.body.appendChild(root);
  return root;
};

// export const createRoot = ({
//   boundaryEl,
//   step,
// }: {
//   boundaryEl?: Element;
//   step?: FlowTooltipStep | FlowModalStep | FlowBannerStep | FlowFeedbackStep;
// } = {}): HTMLElement => {
//   // Create the root element using the DOM API
//   const root = document.createElement("div");
//   root.className = "flows-root";
//   root.style.pointerEvents = "auto";

//   if (step?.zIndex !== undefined) root.style.zIndex = step.zIndex.toString();

//   // Append the root element to the boundary or body
//   if (boundaryEl) {
//     boundaryEl.appendChild(root);
//   } else {
//     document.body.appendChild(root);
//   }

//   return root;
// };

