import * as React from "react";
import { storiesOf } from "@storybook/react";
import { useState, useEffect } from "../alternative";

const Counter = (counter, setCounter) => (
  <div>
    <input
      type="number"
      value={counter}
      onChange={e => setCounter(Number(e.target.value))}
    />
  </div>
);

const useCounterState = useState(0);
const useTitleState = useState("Hello World");
const useSubtitleState = useState("what a beautiful day");
const useCounterAndTitleState = useCounterState.compose(() => useTitleState);
const useCounterAndTitleAndSubtitle = useCounterAndTitleState.compose(
  () => useSubtitleState
);

const compositionWithLogInTheMiddle = useCounterAndTitleState
  .compose(() =>
    useEffect(() => {
      console.log("Effect happened!");
    })
  )
  .compose(() => useSubtitleState);

storiesOf("Alternative", module)
  .add("useState", () => {
    return useCounterState.render(Counter);
  })
  .add("one composition", () => {
    return useCounterAndTitleState.render(
      (counter, setCounter, title, setTitle) => (
        <div>
          <div>
            <input
              type="number"
              value={counter}
              onChange={e => setCounter(Number(e.target.value))}
            />
          </div>
          <div>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
        </div>
      )
    );
  })
  .add("two compositions", () =>
    useCounterAndTitleAndSubtitle.render(
      (counter, setCounter, title, setTitle, subtitle, setSubtitle) => (
        <div>
          <div>
            <input
              type="number"
              value={counter}
              onChange={e => setCounter(Number(e.target.value))}
            />
          </div>
          <div>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <input
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>
      )
    )
  )
  .add("with effect in the middle", () =>
    compositionWithLogInTheMiddle.render(
      (counter, setCounter, title, setTitle, subtitle, setSubtitle) => (
        <div>
          <div>
            <input
              type="number"
              value={counter}
              onChange={e => setCounter(Number(e.target.value))}
            />
          </div>
          <div>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <input
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>
      )
    )
  );
