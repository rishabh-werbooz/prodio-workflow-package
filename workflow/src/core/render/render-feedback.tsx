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

  // Create modal wrapper
  const modalWrapper = document.createElement("div");
  modalWrapper.className = "flows-feedback-wrapper";

  // Create modal
  const modal = document.createElement("div");
  modal.className = "flows-feedback";
  modal.style.padding = "10px";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.gap = "1rem";

  // Add header if it returns a valid DOM node
  const header = getStepHeader({ step });
  if (header instanceof Node) {
    modal.appendChild(header);
  } else if (typeof header === "string") {
    const headerElement = document.createElement("div");
    headerElement.innerHTML = header;
    modal.appendChild(headerElement);
  }

  // Add Title if present
  if (step.title) {
    const title = document.createElement("p");
    title.className = "flows-body flows-title";
    title.style.margin = "0";
    title.style.fontSize = "20px";
    title.innerHTML = step.title;
    modal.appendChild(title);
  }

  // Add body if present
  if (step.body) {
    const body = document.createElement("p");
    body.className = "flows-body";
    body.style.margin = "0";
    body.style.fontSize = "14px";
    body.style.lineHeight = "1.5";
    body.style.color = "#121212";
    body.innerHTML = step.body;
    modal.appendChild(body);
  }


  // Render form fields if provided
  if (step.fields && Array.isArray(step.fields)) {
    const form = document.createElement("form");
    form.className = "flows-form";

    // Prevent default form submission behavior
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Collect form data
      const formData = new FormData(form);
      const formJson: Record<string, any> = {};
      formData.forEach((value, key) => {
        formJson[key] = value;
      });

      // Make API call
      try {

        console.log(formJson)
        console.log(step)
        console.log("RIGHT HERE")
        // const response = await fetch(step.apiEndpoint, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formJson),
        // });

        // if (response.ok) {
        //   const result = await response.json();
        //   console.log("Form submitted successfully:", result);
        //   // Add success message or further actions
        // } else {
        //   console.error("Error submitting form:", response.statusText);
        //   // Handle errors (e.g., show error message)
        // }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    });

    step.fields.forEach((field) => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";
      formGroup.style.display = "flex";
      formGroup.style.flexDirection = "column";
      formGroup.style.gap = "2px";
      formGroup.style.marginBottom = "20px";

      // Create label
      if (field.label) {
        const label = document.createElement("label");
        label.htmlFor = field.label;
        label.className = "form-label";
        label.innerText = field.label;
        label.style.fontSize = "13px";

        // Add a red asterisk if the field is required
        if (field.required) {
          const asterisk = document.createElement("span");
          asterisk.innerText = " *";
          asterisk.style.color = "red";
          label.appendChild(asterisk);
        }

        formGroup.appendChild(label);
      }

      // Create input based on type
      const input = document.createElement("input");
      input.type = field.type || "text"; // Default to text if type is not provided
      input.id = field.label;
      input.name = field.label;
      input.placeholder = field.placeholder || "";
      input.required = !!field.required;
      input.className = "form-input";

      input.style.border = "1px solid #ccc";
      input.style.padding = "3px";
      input.style.borderRadius = ".25rem";
      input.style.fontSize = "14px";

      formGroup.appendChild(input);
      form.appendChild(formGroup);
    });

    // Add submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "flows-primary-btn";
    submitButton.innerText = "Submit";
    form.appendChild(submitButton);

    modal.appendChild(form);
  }


  modalWrapper.appendChild(modal);

  // Add overlay if required
  if (!step.hideOverlay) {
    const overlay = document.createElement("div");
    overlay.className = `flows-modal-overlay${step.closeOnOverlayClick ? " flows-overlay-cancel" : ""}`;
    if (step.disableOverlayClickLayer) {
      overlay.style.pointerEvents = "none";
    }
    root.appendChild(overlay);
  }

  root.appendChild(modalWrapper);

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
