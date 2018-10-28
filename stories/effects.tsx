import * as React from "react";
import { storiesOf } from "@storybook/react";
import { useState, useEffect, Effect } from "../index";
import { withInfo } from "@storybook/addon-info";

storiesOf("useEffect", module)
  .add("simple effect", () => (
    <div>
      {useState(0, (counter, setCounter) => (
        <>
          <button onClick={() => setCounter(counter + 1)}>Change State</button>
          {useEffect(() => {
            console.log("Effect happened!");
          })}
        </>
      ))}
    </div>
  ))
  .add("with cleanup", () => (
    <div>
      {useState(0, (counter, setCounter) => (
        <>
          <button onClick={() => setCounter(counter + 1)}>Change State</button>
          {useEffect(() => {
            console.log("Effect happened!");
            return () => {
              console.log("Cleaned up effect");
            };
          })}
        </>
      ))}
    </div>
  ))
  .add("with inputs", () => (
    <div>
      {useState({ counter: 0, multipleOfThree: true }, (state, setState) => (
        <>
          <p>{state.counter}</p>
          <button
            onClick={() =>
              setState({
                multipleOfThree: (state.counter + 1) % 3 === 0,
                counter: state.counter + 1
              })
            }
          >
            Change State
          </button>
          {useEffect(
            () => {
              console.log(
                "multipleOfThree just changed!",
                state.multipleOfThree
              );
              return () => {
                console.log("Cleaned up effect");
              };
            },
            [state.multipleOfThree]
          )}
        </>
      ))}
    </div>
  ));
