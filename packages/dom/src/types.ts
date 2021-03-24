export type Selector = string;

export type El = Element | Selector;

export type I$S = (selector: Selector | El | Window) => Window | Element | null;

export type Listener = <T extends Event>(e?: T) => void;

export type Unsubscibe = () => void;

export type Position = {
  x: number;
  y: number;
};
