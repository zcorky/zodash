export type Selector = string;

export type El = HTMLElement | Element | Selector;

export type I$S = (selector: Selector | Element) => Element;

export type Listener = <T extends Event>(e?: T) => void;

export type Unsubscibe = () => void;

export type Position = {
  x: number;
  y: number;
}
