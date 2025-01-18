// import type { FlowFeedbackStep } from "..";
// import type { FlowState } from "../flow-state";
// import { createRoot, getStepFooter, getStepHeader } from "./render-common";

// /**
//  * Function for rendering modal element to HTMLElement without placing it in the DOM.
//  */
// export const renderFeedbackElement = ({
//   step,
//   isFirstStep,
//   isLastStep,
//   root: _root,
// }: {
//   step: FlowFeedbackStep;
//   isLastStep: boolean;
//   isFirstStep: boolean;
//   root?: HTMLElement;
// }): { root: HTMLElement } => {
//   const root = _root ?? createRoot({ step });

//   const feedback = (
//     <div className="flows-modal-wrapper">
//       <div className="flows-modal">
//         {getStepHeader({ step })}
//         {step.body && (
//           <div className="flows-body" dangerouslySetInnerHTML={{ __html: step.body }} />
//         )}
//         {getStepFooter({ step, isFirstStep, isLastStep })}
//       </div>
//     </div>
//   );
//   if (!step.hideOverlay) {
//     root.appendChild(
//       <div
//         className={`flows-modal-overlay${step.closeOnOverlayClick ? " flows-overlay-cancel" : ""}`}
//         style={step.disableOverlayClickLayer ? "pointer-events:none" : undefined}
//       />,
//     );
//   }
//   root.appendChild(feedback);

//   return { root };
// };

// export const renderFeedback = ({
//   root,
//   step,
//   state,
// }: {
//   root: HTMLElement;
//   step: FlowFeedbackStep;
//   state: FlowState;
// }): void => {
// renderFeedbackElement({
//     step,
//     root,
//     isFirstStep: !state.hasPrevStep,
//     isLastStep: !state.hasNextStep,
//   });
// };

import type { FlowFeedbackStep } from "..";
import { getPersistentState } from "../../lib/persistent-state";
import type { FlowState } from "../flow-state";
import { createRoot, getStepFooter, getStepHeader } from "./render-common";

/**
 * Function for rendering feedback element to HTMLElement without placing it in the DOM.
 */
export const renderFeedbackElement = ({
  step,
  isFirstStep,
  isLastStep,
  root: _root,
}: {
  step: FlowFeedbackStep;
  isLastStep: boolean;
  isFirstStep: boolean;
  root?: HTMLElement;
}): { root: HTMLElement } => {
  const root = _root ?? createRoot({ step });

  const header = getStepHeader({ step });
  const modalContent = (
    <div className="flows-feedback-wrapper">
      <div className="flows-feedback-container">
        {getStepHeader({ step })}
        {step.body && (
          <p
            className="flows-feedback-body"
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        )}
        {step.fields && Array.isArray(step.fields) && (
          <form
            className="flows-feedback-form"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);
              const formJson: Record<string, any> = {};
              formData.forEach((value, key) => {
                formJson[key] = value;
              });

              try {
                console.log("PACKAGE Form===> ", formJson);
                console.log("PACKAGE Step===>", step);
                console.log("RIGHT HERE");
                const data = getPersistentState()

                console.log("PACKAGE Data ===> ", data)
                // const response = await fetch(step.apiEndpoint, {
                //   method: "POST",
                //   headers: { "Content-Type": "application/json" },
                //   body: JSON.stringify(formJson),
                // });
                // if (response.ok) {
                //   const result = await response.json();
                //   console.log("Form submitted successfully:", result);
                // } else {
                //   console.error("Error submitting form:", response.statusText);
                // }
              } catch (error) {
                console.error("Error during API call:", error);
              }
            }}
          >
            {step.fields.map((field, index) => (
              <div
                key={index}
                className="flows-feedback-form-group"
              >
                {field.label && (
                  <label
                    htmlFor={field.label+index}
                    className="flows-feedback-form-label"
                  >
                    {field.label}
                    {field.required && <span style="color: red;"> *</span>}
                  </label>
                )}
                <input
                  type={field.type || "text"}
                  id={field.label+index}
                  name={field.label}
                  placeholder={field.placeholder || ""}
                  required={!!field.required}
                  className="flows-feedback-form-input"
                />
              </div>
            ))}

            {getStepFooter({ step, isFirstStep, isLastStep })}
          </form>
        )}
      </div>
    </div>
  );

  if (!step.hideOverlay) {
    root.appendChild(
      <div
        className={`flows-modal-overlay${step.closeOnOverlayClick ? " flows-overlay-cancel" : ""}`}
        style={step.disableOverlayClickLayer ?  "pointerEvents: none;" : ""}
      />,
    );
  }
  root.appendChild(modalContent);

  return { root };
};

/**
 * Render feedback and attach it to the DOM
 */
export const renderFeedback = ({
  root,
  step,
  state,
}: {
  root: HTMLElement;
  step: FlowFeedbackStep;
  state: FlowState;
}): void => {
  renderFeedbackElement({
    step,
    root,
    isFirstStep: !state.hasPrevStep,
    isLastStep: !state.hasNextStep,
  });
};
