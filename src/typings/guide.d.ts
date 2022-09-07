import type { ReactNode } from "react";
import { StepNumber } from '../constant/lang';

export type SinglePlacement = 'top' | 'bottom' | 'left' | 'right';

export type Placement =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export type SelectorType = string | Element | (() => Element);

export type ContentType = string | ReactNode | (() => ReactNode);

export interface ITargetPos {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface IStep {
  /* Relative to the target position of the body, there must be one of targetPos and selector, and the selector is read first */
  targetPos?: ITargetPos,
  /* The CSS Selector of the anchor element or the anchor element itself */
  selector?: SelectorType;
  /* The title of the modal */
  title?: string;
  /* The content of the modal */
  content?: ContentType;
  /* The placement of the modal relative to the selector */
  placement?: Placement;
  /* The offset of the modal relative to the selector */
  offset?: Record<'x' | 'y', number>;
  /* The parent component to mount. If not specified, the body will be used as the parent component if the guide is masked
   * the offsetParent of the anchor element will be used otherwise. If specified as 'body', then the body will be used.
   */
  parent?: 'body' | null;
  /* If the modal is visible */
  visible?: boolean;
  /* If the modal should be skipped */
  skip?: boolean;
  /* The function called when user click "next" and before going to the next step */
  beforeStepChange?: (curStep: IStep, curStepIndex: number, steps: IStep[]) => void;
}

export interface IGuide {
  /* The step info */
  steps: IStep[];
  /* The localStorage key indicating whether the guide has finished */
  localKey?: string;
  /* Whether or not to display the mask */
  mask?: boolean;
  /* Whether or not to display the arrow */
  arrow?: boolean;
  /* Whether or not to display the hotspot */
  hotspot?: boolean;
  /* Whether or not the guide can be closed before the last step */
  closable?: boolean;
  /* The first step's number. In some cases, you might want the guide's first step appear to be the 3rd step,
   * for example, when you want to connect two Guide components.
   */
  step?: number;
  /* The custom class name of the modal */
  modalClassName?: string;
  /* The custom class name of the mask */
  maskClassName?: string;
  /* The expire date of the guide when it will not be displayed anymore */
  expireDate?: string;
  /* If the guide is visible */
  visible?: boolean;
  /* The language of use */
  lang?: 'zh' | 'en' | 'ja';
  /* The custom node for the step info */
  stepNode?: (stepIndex: number, stepCount: number) => ReactNode;
  /* The custom text for the `Previous Step` button */
  prev?: (onClick: () => void) => ReactNode;
  /* The custom text for the `Skip` button */
  skip?: (onClick: () => void) => ReactNode;
  /* The custom text for the `Next Step` button */
  next?: (onClick: () => void) => ReactNode;
  /* The custom text for the confirm button at the last step */
  ok?: (onClick: () => void) => ReactNode;
  /* The callback function when the user is about to move to the next step */
  beforeStepChange?: (stepIndex: number, step: IStep) => void;
  /* The callback function when the step changes */
  afterStepChange?: (stepIndex: number, step: IStep) => void;
  /* The callback function when the guide closes */
  onClose?: () => void;
  /* Whether or not to display the previous button */
  showPreviousBtn?: boolean;
  /* Whether or not to display the skip button */
  showSkipBtn?: boolean;
  /* close element */
  closeEle?: JSX.Element;
}

export interface IModal {
  anchorEl: HTMLElement;
  parentEl: HTMLElement;
  realWindow: Window;
  steps: IStep[];
  stepIndex: number;
  mask: boolean;
  arrow: boolean;
  hotspot: boolean;
  closable: boolean;
  /* close element */
  closeEle?: JSX.Element;
  onClose: () => void;
  onChange: (direction: number) => void;
  stepNode?: (stepIndex: number, stepCount: number) => ReactNode;
  showPreviousBtn: boolean;
  showSkipBtn?: boolean;
  next?: (onClick: () => void) => ReactNode;
  prev?: (onClick: () => void) => ReactNode;
  skip?: (onClick: () => void) => ReactNode;
  ok?: (onClick: () => void) => ReactNode;
  className?: string;
  TEXT: (key: 'NEXT_STEP' | 'I_KNOW' | 'STEP_NUMBER' | 'PREV_STEP' | 'SKIP_STEP') => string | StepNumber;
}
