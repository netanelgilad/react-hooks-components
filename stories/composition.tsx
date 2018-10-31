import * as React from "react";
import { storiesOf } from "@storybook/react";
import { useState, useEffect, Effect, State } from "../index";
import { withInfo } from "@storybook/addon-info";

function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}

const useOnlineStatus = renderer => {
  return useState(getOnlineStatus(), (onlineStatus, setOnlineStatus) => {
    function goOnline() {
      setOnlineStatus(true);
    }
    function goOffline() {
      setOnlineStatus(false);
    }
    return useEffect(
      () => {
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);
        return () => {
          window.removeEventListener("online", goOnline);
          window.removeEventListener("offline", goOffline);
        };
      },
      [],
      () => renderer(onlineStatus)
    );
  });
};

storiesOf("Composition", module)
  .add("state and effect", () =>
    useOnlineStatus(onlineStatus => (
      <div>You are currently {onlineStatus ? "online" : "offline"}</div>
    ))
  )
  .add("effect between states", () => (
    <div>
      {useState(0, (counter, setCounter) =>
        useState("Hello World", (title, setTitle) =>
          useEffect(
            () => console.log("Effect Happened"),
            () =>
              useState("what a beautiful day", (subtitle, setSubtitle) => (
                <div>
                  <div>
                    <input
                      type="number"
                      value={counter}
                      onChange={e => setCounter(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      value={subtitle}
                      onChange={e => setSubtitle(e.target.value)}
                    />
                  </div>
                </div>
              ))
          )
        )
      )}
    </div>
  ));
