import "./effects";
import "./composition";
import "./alternative";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { useState, State } from "../index";
import { withInfo } from "@storybook/addon-info";

const useStatePrimitiveStateExample = () => (
  <div>
    {useState("Hello World", (title, setTitle) => (
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
    ))}
    {useState(0, (counter, setCounter) => (
      <div>
        <input
          type="number"
          value={counter}
          onChange={e => setCounter(Number(e.target.value))}
        />
      </div>
    ))}
  </div>
);

const useStateObjectStateExample = () =>
  useState(
    { title: "React Hooks", subtitle: "better off as components" },
    (state, setState) => (
      <div>
        <h3>{state.title}</h3>
        <h6>{state.subtitle}</h6>
        <div>
          Title:{" "}
          <input
            value={state.title}
            onChange={e => setState({ ...state, title: e.target.value })}
          />
        </div>
        <div>
          Subtitle:{" "}
          <input
            value={state.subtitle}
            onChange={e => setState({ ...state, subtitle: e.target.value })}
          />
        </div>
      </div>
    )
  );

const StatePrimitiveExample = () => (
  <div>
    <State initialState={"Hello World"}>
      {(title, setTitle) => (
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      )}
    </State>
    <State initialState={0}>
      {(counter, setCounter) => (
        <div>
          <input
            type="number"
            value={counter}
            onChange={e => setCounter(Number(e.target.value))}
          />
        </div>
      )}
    </State>
  </div>
);

const StateObjectExample = () => (
  <State
    initialState={{
      title: "React Hooks",
      subtitle: "better off as components"
    }}
  >
    {(state, setState) => (
      <div>
        <h3>{state.title}</h3>
        <h6>{state.subtitle}</h6>
        <div>
          Title:{" "}
          <input
            value={state.title}
            onChange={e => setState({ ...state, title: e.target.value })}
          />
        </div>
        <div>
          Subtitle:{" "}
          <input
            value={state.subtitle}
            onChange={e => setState({ ...state, subtitle: e.target.value })}
          />
        </div>
      </div>
    )}
  </State>
);

storiesOf("useState", module)
  .addDecorator(withInfo)
  .add("primitive state", useStatePrimitiveStateExample, {
    info: {
      inline: true,
      source: false,
      text: `
        #### Source
        \`\`\`js
        const useStatePrimitiveStateExample = () => (
          <div>
            {useState("Hello World", (title, setTitle) => (
              <div>
                <input value={title} onChange={e => setTitle(e.target.value)} />
              </div>
            ))}
            {useState(0, (counter, setCounter) => (
              <div>
                <input
                  type="number"
                  value={counter}
                  onChange={e => setCounter(Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        );
        \`\`\`

        #### Signature
        \`\`\`js
        export declare function useState<TState>(
          initialState: TState, 
          renderer: (state: TState, setState: (newState: TState) => void
        ): JSX.Element;
        \`\`\`
      `,
      propTablesExclude: [State]
    }
  })
  .add("object state", useStateObjectStateExample, {
    info: {
      inline: true,
      source: false,
      text: `
        #### Source
        \`\`\`js
        const useStateObjectStateExample = () =>
          useState(
            { title: "React Hooks", subtitle: "better off as components" },
            (state, setState) => (
              <div>
                <h3>{state.title}</h3>
                <h6>{state.subtitle}</h6>
                <div>
                  Title:{" "}
                  <input
                    value={state.title}
                    onChange={e => setState({ ...state, title: e.target.value })}
                  />
                </div>
                <div>
                  Subtitle:{" "}
                  <input
                    value={state.subtitle}
                    onChange={e => setState({ ...state, subtitle: e.target.value })}
                  />
                </div>
              </div>
            )
          );
        \`\`\`

        #### Signature
        \`\`\`js
        export declare function useState<TState>(
          initialState: TState, 
          renderer: (state: TState, setState: (newState: TState) => void
        ): JSX.Element;
        \`\`\`
      `,
      propTablesExclude: [State]
    }
  });

storiesOf("State", module)
  .addDecorator(withInfo)
  .add("primitive state", StatePrimitiveExample, {
    info: {
      inline: true,
      source: false,
      text: `
        #### Source
        \`\`\`js
        const StatePrimitiveExample = () => (
          <div>
            <State initialState={"Hello World"}>
              {(title, setTitle) => (
                <div>
                  <input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
              )}
            </State>
            <State initialState={0}>
              {(counter, setCounter) => (
                <div>
                  <input
                    type="number"
                    value={counter}
                    onChange={e => setCounter(Number(e.target.value))}
                  />
                </div>
              )}
            </State>
          </div>
        );
        \`\`\`

        #### Signature
        \`\`\`js
        export declare function State<TState>(props: {
          initialState: TState;
          children: (state: TState, setState: (newState: TState) => void;
        }): JSX.Element;
        \`\`\`
      `,
      propTablesExclude: [State]
    }
  })
  .add("object state", StateObjectExample, {
    info: {
      inline: true,
      source: false,
      text: `
        #### Source
        \`\`\`js
        const StateObjectExample = () => (
          <State
            initialState={{
              title: "React Hooks",
              subtitle: "better off as components"
            }}
          >
            {(state, setState) => (
              <div>
                <h3>{state.title}</h3>
                <h6>{state.subtitle}</h6>
                <div>
                  Title:{" "}
                  <input
                    value={state.title}
                    onChange={e => setState({ ...state, title: e.target.value })}
                  />
                </div>
                <div>
                  Subtitle:{" "}
                  <input
                    value={state.subtitle}
                    onChange={e => setState({ ...state, subtitle: e.target.value })}
                  />
                </div>
              </div>
            )}
          </State>
        );
        \`\`\`

        #### Signature
        \`\`\`js
        export declare function State<TState>(props: {
          initialState: TState;
          children: (state: TState, setState: (newState: TState) => void;
        }): JSX.Element;
        \`\`\`
      `,
      propTablesExclude: [State]
    }
  });
