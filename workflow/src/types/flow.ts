import type { Placement as FloatingUiPlacement } from "@floating-ui/dom";

export type Placement = FloatingUiPlacement;

export interface FooterActionItem {
  /**
   * Button label.
   */
  label: string;
  /**
   * The flow branch to enter when the button is clicked.
   */
  targetBranch?: number;
  /**
   * When true the button will act as a previous step button.
   */
  prev?: boolean;
  /**
   * When true the button will act as a next step or finish button.
   */
  next?: boolean;
  /**
   * When true the button will cancel the flow.
   */
  cancel?: boolean;
  /**
   * Variant of the button.
   * @defaultValue `primary`
   */
  variant?: "primary" | "secondary";
  /**
   * Use to navigate to a custom URL. The button element will be rendered as an anchor tag.
   */
  href?: string;
  /**
   * `target="_blank"` - open the link in a new tab.
   */
  external?: boolean;
}
export interface FooterActions {
  /**
   * Buttons to be shown on the left side of the footer.
   */
  left?: FooterActionItem[];
  /**
   * Buttons to be shown in the center of the footer.
   */
  center?: FooterActionItem[];
  /**
   * Buttons to be shown on the right side of the footer.
   */
  right?: FooterActionItem[];
}

interface CommonStepProps {
  /**
   * Optional ID to identify the step. Useful for controlling the flow programmatically with `getCurrentStep()`.
   */
  stepId?: string;
}
export interface FlowTooltipStep extends CommonStepProps {
  /**
   * Title of the tooltip. Supports HTML.
   */
  title: string;
  /**
   * Body of the tooltip. Supports HTML.
   */
  body?: string;
  /**
   * Element to attach the tooltip to.
   * @example `#my-element`
   */
  targetElement: string;
  /**
   * On which side of the target element the tooltip should be placed.
   * @defaultValue `bottom`
   */
  placement?: Placement;
  /**
   * Highlights the target element with an overlay.
   * @defaultValue `false`
   */
  overlay?: boolean;
  /**
   * Cancel the flow when the overlay is clicked. Only works when `overlay` is `true`.
   * @defaultValue `false`
   */
  closeOnOverlayClick?: boolean;
  /**
   * When enabled the user can interact with the elements under the overlay.
   * @defaultValue `false`
   */
  disableOverlayClickLayer?: boolean;
  /**
   * `z-index` of the tooltip. You should only change this if this tooltip is positioned differently than your default.
   *
   * Defaults to `var(--flows-zIndex)` from the style template.
   */
  zIndex?: string;
  /**
   * z-index of the tooltip target element highlight when using `overlay: true`.
   *
   * Defaults to `var(--flows-target-zIndex)` from the style template.
   */
  targetZIndex?: string;
  /**
   * Hide the arrow pointing to the target element.
   * @defaultValue `false`
   */
  hideArrow?: boolean;
  /**
   * Hide the close button. Without the close button the user will not be able to close the tooltip.
   * @defaultValue `false`
   */
  hideClose?: boolean;
  /**
   * Hide the previous button. Without the previous button the user will not be able to go back.
   * @defaultValue `false`
   */
  hidePrev?: boolean;
  /**
   * Hide the next button.
   * Watch out this option should be used with `footerActions` to provide a way to go to the next step or by controlling the flow programmatically with `nextStep()`. Otherwise the user will be stuck on the current step.
   * @defaultValue `false`
   */
  hideNext?: boolean;
  /**
   * Text of the previous button.
   * @defaultValue `Back`
   */
  prevLabel?: string;
  /**
   * Text of the next and finish buttons.
   * @defaultValue `Continue` and `Finish` for the last step
   */
  nextLabel?: string;
  /**
   * Custom buttons to be shown in the footer.
   */
  footerActions?: FooterActions;
  /**
   * The element to scroll to when the tooltip is shown.
   * @example `#my-element`
   */
  scrollElement?: string;
  /**
   * Wait for an event to occur before continuing to the next step. You can wait for the user to click a button, navigate to a page, submit a form, etc.
   */
  wait?: WaitStepOptions | WaitStepOptions[];
}
export interface FlowModalStep extends CommonStepProps {
  /**
   * Title of the modal. Supports HTML.
   */
  title: string;
  /**
   * Body of the modal. Supports HTML.
   */
  body?: string;
  /**
   * Hides modal overlay backdrop and makes rest .
   * @defaultValue `false`
   */
  hideOverlay?: boolean;
  /**
   * Cancel the flow when the overlay is clicked.
   * @defaultValue `false`
   */
  closeOnOverlayClick?: boolean;
  /**
   * When enabled the user can interact with the elements under the overlay.
   * @defaultValue `false`
   */
  disableOverlayClickLayer?: boolean;
  /**
   * `z-index` of the modal. You should only change this if this modal is positioned differently than your default.
   *
   * Defaults to `var(--flows-zIndex)` from the style template.
   */
  zIndex?: string;
  /**
   * Hide the close button. Without the close button the user will not be able to close the tooltip.
   */
  hideClose?: boolean;
  /**
   * Hide the previous button. Without the previous button the user will not be able to go back.
   * @defaultValue `false`
   */
  hidePrev?: boolean;
  /**
   * Hide the next button.
   * Watch out this option should be used with `footerActions` to provide a way to go to the next step or by controlling the flow programmatically with `nextStep()`. Otherwise the user will be stuck on the current step.
   * @defaultValue `false`
   */
  hideNext?: boolean;
  /**
   * Text of the previous button.
   * @defaultValue `Back`
   */
  prevLabel?: string;
  /**
   * Text of the next and finish buttons.
   * @defaultValue `Continue` and `Finish` for the last step
   */
  nextLabel?: string;
  /**
   * Custom buttons to be shown in the footer.
   */
  footerActions?: FooterActions;
  /**
   * Wait for an event to occur before continuing to the next step. You can wait for the user to click a button, navigate to a page, submit a form, etc.
   */
  wait?: WaitStepOptions | WaitStepOptions[];
}

export interface FeedbackFieldProps {
  /**
   * Label of the field.
   */
  label: string;
  /**
   * Placeholder of the field.
   */
  placeholder?: string;
  /**
   * Type of the field.
   * @defaultValue `text`
   */
  type?: "text" | "email" | "number";
  /**
   * Required field.
   * @defaultValue `false`
   */
  required?: boolean;
}

export interface FlowFeedbackStep extends CommonStepProps {
  type: "feedback";
  /**
   * Title of the modal. Supports HTML.
   */
  title: string;
  /**
   * Body of the modal. Supports HTML.
   */
  body?: string;
  fields?: FeedbackFieldProps[];
  /**
   * Hides modal overlay backdrop and makes rest .
   * @defaultValue `false`
   */
  hideOverlay?: boolean;
  /**
   * Cancel the flow when the overlay is clicked.
   * @defaultValue `false`
   */
  closeOnOverlayClick?: boolean;
  /**
   * When enabled the user can interact with the elements under the overlay.
   * @defaultValue `false`
   */
  disableOverlayClickLayer?: boolean;
  /**
   * `z-index` of the modal. You should only change this if this modal is positioned differently than your default.
   *
   * Defaults to `var(--flows-zIndex)` from the style template.
   */
  zIndex?: string;
  /**
   * Hide the close button. Without the close button the user will not be able to close the tooltip.
   */
  hideClose?: boolean;
  /**
   * Hide the previous button. Without the previous button the user will not be able to go back.
   * @defaultValue `false`
   */
  hidePrev?: boolean;
  /**
   * Hide the next button.
   * Watch out this option should be used with `footerActions` to provide a way to go to the next step or by controlling the flow programmatically with `nextStep()`. Otherwise the user will be stuck on the current step.
   * @defaultValue `false`
   */
  hideNext?: boolean;
  /**
   * Text of the previous button.
   * @defaultValue `Back`
   */
  prevLabel?: string;
  /**
   * Text of the next and finish buttons.
   * @defaultValue `Continue` and `Finish` for the last step
   */
  nextLabel?: string;
  /**
   * Custom buttons to be shown in the footer.
   */
  footerActions?: FooterActions;
  /**
   * Wait for an event to occur before continuing to the next step. You can wait for the user to click a button, navigate to a page, submit a form, etc.
   */
  wait?: WaitStepOptions | WaitStepOptions[];
}

export interface FlowBannerStep extends CommonStepProps {
  type: "banner";
  /**
   * Position of the banner.
   * @defaultValue `bottom-right`
   */
  bannerPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Title of the banner. Supports HTML.
   */
  title: string;
  /**
   * Body of the banner. Supports HTML.
   */
  body?: string;
  /**
   * `z-index` of the banner. You should only change this if this banner is positioned differently than your default.
   *
   * Defaults to `var(--flows-zIndex)` from the style template.
   */
  zIndex?: string;
  /**
   * Hide the close button. Without the close button the user will not be able to close the tooltip.
   */
  hideClose?: boolean;
  /**
   * Hide the previous button. Without the previous button the user will not be able to go back.
   * @defaultValue `false`
   */
  hidePrev?: boolean;
  /**
   * Hide the next button.
   * Watch out this option should be used with `footerActions` to provide a way to go to the next step or by controlling the flow programmatically with `nextStep()`. Otherwise the user will be stuck on the current step.
   * @defaultValue `false`
   */
  hideNext?: boolean;
  /**
   * Text of the previous button.
   * @defaultValue `Back`
   */
  prevLabel?: string;
  /**
   * Text of the next and finish buttons.
   * @defaultValue `Continue` and `Finish` for the last step
   */
  nextLabel?: string;
  /**
   * Custom buttons to be shown in the footer.
   */
  footerActions?: FooterActions;
  /**
   * Wait for an event to occur before continuing to the next step. You can wait for the user to click a button, navigate to a page, submit a form, etc.
   */
  wait?: WaitStepOptions | WaitStepOptions[];
}

export interface WaitStepOptions {
  /**
   * Wait for an element to appear in the DOM.
   * @example `#my-element`
   */
  element?: string;
  /**
   * Wait for the user to click the given element.
   * @example `#my-element`
   */
  clickElement?: string;
  /**
   * Wait for the user to submit a form.
   */
  form?: {
    /**
     * Form element to wait for submit on.
     * @example `#my-form`
     */
    formElement: string;
    /**
     * Fields to check values of on submit.
     */
    values: {
      /**
       * Field to take the value from.
       */
      element: string;
      /**
       * Regex string to match the value against.
       */
      value: string;
    }[];
  };
  /**
   * Wait for the user to change a value in a field.
   */
  change?: {
    /**
     * Field to take the value from.
     */
    element: string;
    /**
     * Regex string to match the value against.
     */
    value: string;
  }[];
  /**
   * A regular expression that matches the current pathname.
   * @example
   * ```
   * "/about" // matches "/about", "/company/about" and "/about/contact"
   * "^/about" // matches "/about" and "/about/contact"
   * "^/about$" // matches only "/about"
   * ```
   */
  location?: string;
  /**
   * The flow branch to enter when the conditions are met. Leave empty if there are no branches in the next step.
   */
  targetBranch?: number;
}
export interface FlowWaitStep extends CommonStepProps {
  /**
   * Wait for an event to occur before continuing to the next step. You can wait for the user to click a button, navigate to a page, submit a form, etc.
   */
  wait: WaitStepOptions | WaitStepOptions[];
}
export type FlowStep = FlowModalStep | FlowTooltipStep | FlowBannerStep | FlowWaitStep | FlowFeedbackStep;
type Step = FlowStep | FlowStep[][];
export type FlowSteps = Step[];

export type FlowFrequency = "once" | "every-session" | "every-time";

export type PrimitiveValue = string | number | boolean | null;
/**
 * Data types that can be compared.
 *
 * `Date` can also be supplied in ISO 8601 format to support sending dates in JSON.
 */
export type CompareValue = number | Date | string;
export interface UserPropertyMatch {
  /**
   * Key of the user property to perform the match on.
   */
  key: string;
  /**
   * Value must be a string and match the given regular expression.
   */
  regex?: string;
  /**
   * Value must be equal to the given value.
   */
  eq?: PrimitiveValue | PrimitiveValue[];
  /**
   * Value must not be equal to the given value.
   */
  ne?: PrimitiveValue | PrimitiveValue[];
  /**
   * Value must be greater than the given value.
   */
  gt?: CompareValue;
  /**
   * Value must be greater than or equal to the given value.
   */
  gte?: CompareValue;
  /**
   * Value must be less than the given value.
   */
  lt?: CompareValue;
  /**
   * Value must be less than or equal to the given value.
   */
  lte?: CompareValue;
  /**
   * Value must be found within string.
   * When array is given, at least one of the values must be contained.
   */
  contains?: string | string[];
  /**
   * Value must not be found within string.
   * When array is given, none of the values must be contained.
   */
  notContains?: string | string[];
}
/**
 * A group of user property matchers.
 * Each of the matchers must match for the group to match.
 */
export type UserPropertyMatchGroup = UserPropertyMatch[];

export interface Flow {
  /**
   * Unique identifier of the flow. Used for controlling the flow programmatically and identification for analytics and Cloud.
   * @example `my-flow`
   */
  id: string;
  /**
   * Steps of the flow.
   */
  steps: Step[];
  /**
   * Controls how often the flow should be shown to the user.
   * @defaultValue `once`
   */
  frequency?: FlowFrequency;
  /**
   * Controls how the flow should be started. Option for user to click a button, navigate to a page, submit a form, etc. When array of options is given, the flow will start when **one** of the options is met.
   * If no start options are given, the flow can be started only by calling `startFlow()`.
   */
  start?: WaitStepOptions | WaitStepOptions[];
  /**
   * Matchers for user properties.
   *
   * **One group**
   *
   * When array of matchers is given, all matchers must match for the Flow to run.
   * @example
   * *`plan` is "premium" AND `age` is grater than 18*
   * ```
   * [
   *   { key: "plan", eq: "premium" },
   *   { key: "age", gt: 18 },
   * ]
   * ```
   *
   * **Array of groups**
   *
   * When array of arrays of matchers is given, each of the array is a group of matchers. At least one of the groups must match for the Flow to run.
   *
   * @example
   * *(`plan` is "premium" AND `age` is grater than 18) OR (`age` is grater than 65)*
   * ```
   * [
   *   [
   *     { key: "plan", eq: "premium" },
   *     { key: "age", gt: 18 }
   *   ],
   *   [
   *     { key: "age", gt: 65 }
   *   ]
   * ]
   * ```
   */
  userProperties?: UserPropertyMatchGroup | UserPropertyMatchGroup[];
  /**
   * Draft flow will not be shown to users.
   * Draft flows can be started by calling `startFlow()` with `startDraft` option.
   * @defaultValue `false`
   */
  draft?: boolean;
  /**
   * The element to use as the root for elements created by Flows. Useful when you need to render flows in a specific container.
   * @defaultValue "body"
   */
  rootElement?: string;
  /**
   * Flow is missing some steps that will be loaded asynchronously on start.
   * This is internal option when loading from Flows Cloud.
   * @defaultValue `false`
   */
  _incompleteSteps?: boolean;
}
