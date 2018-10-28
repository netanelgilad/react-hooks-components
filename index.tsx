import * as React from "react";

export type StateRenderer<TState> = (
  state: TState,
  setState: (newState: TState) => void
) => JSX.Element | null;

export class StateAsClass<TState> extends React.Component<
  {
    initialState: TState;
    children: StateRenderer<TState>;
  },
  {
    value: TState;
  }
> {
  constructor(props) {
    super(props);

    this.state = { value: props.initialState };
  }

  updateState = newState => {
    this.setState({
      value: newState
    });
  };

  render() {
    return this.props.children(this.state.value, this.updateState);
  }
}

export function State<TState>(props: {
  initialState: TState;
  children: StateRenderer<TState>;
}) {
  if ("useState" in React) {
    const [state, setState] = (React as any).useState(props.initialState);
    return props.children(state, setState);
  } else {
    return (
      <StateAsClass
        initialState={props.initialState}
        children={props.children}
      />
    );
  }
}

export function useState<TState>(
  initialState: TState,
  renderer: StateRenderer<TState>
) {
  return <State initialState={initialState} children={renderer} />;
}

export type EffectRenderer = () => JSX.Element | null;

export type EffectFn = () => (() => void) | void;

export function Effect({
  doFn,
  inputs,
  children
}: {
  doFn: EffectFn;
  inputs?: any[];
  children?: EffectRenderer;
}) {
  if (typeof inputs === "function") {
    children = inputs;
    inputs = undefined;
  }

  (React as any).useEffect(doFn, inputs);
  return children ? children() : null;
}

export function useEffect(
  doFn: EffectFn,
  inputs?: any[],
  children?: EffectRenderer
) {
  if (typeof inputs === "function") {
    children = inputs;
    inputs = undefined;
  }

  return <Effect doFn={doFn} inputs={inputs} children={children} />;
}
