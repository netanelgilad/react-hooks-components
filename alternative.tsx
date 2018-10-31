import * as React from "react";
import { State, Effect } from "./index";

class HookComponent {
  compositions: Array<(...args: any[]) => HookComponent>;
  hookFn: any;

  constructor(
    hookFn: ((renderer: () => JSX.Element | null) => JSX.Element | null),
    compositions: Array<(...args: any[]) => HookComponent> = []
  ) {
    this.hookFn = hookFn;
    this.compositions = compositions;
  }

  compose(composer: (...args: any[]) => HookComponent) {
    return new HookComponent(this.hookFn, [...this.compositions, composer]);
  }

  private _render(
    renderer: (...args: any[]) => JSX.Element | null,
    compositions?: Array<(...args: any[]) => HookComponent>
  ) {
    if (compositions.length === 0) {
      return this.hookFn(renderer);
    } else {
      return this._render((...args) => {
        const current = compositions[compositions.length - 1];
        return current(...args).render((...args2: any[]) => {
          return renderer(...args, ...args2);
        });
      }, compositions.slice(0, compositions.length - 1));
    }
  }

  render(renderer: (...args: any[]) => JSX.Element | null): JSX.Element | null {
    return this._render(renderer, this.compositions);
  }
}

export function useState<TState>(initialState: TState) {
  return new HookComponent(renderer => {
    return <State initialState={initialState} children={renderer} />;
  });
}

export function useEffect(effectFn, inputs?) {
  return new HookComponent(renderer => {
    return <Effect doFn={effectFn} inputs={inputs} children={renderer} />;
  });
}
