import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

import { WS_URL } from "../config";

interface IProp {
  onLoginSetUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginSection(prop: IProp) {
  const { onLoginSetUsername } = prop;
  const [username, setUsername] = useState<string>("");
  useWebSocket(WS_URL, {
    share: true,
    filter: () => false,
  });

  const logInUser = () => {
    if (!username.trim()) {
      return;
    }
    onLoginSetUsername && onLoginSetUsername(username);
  };

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">Join to edit the document</p>
          </div>
          <input
            name="username"
            onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            className="form-control"
          />
          <button
            type="button"
            onClick={() => logInUser()}
            className="btn btn-primary account__btn"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
