"use client";

import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import TableSection from "./TableSection";
import LoginSection from "./LoginSection";
import { WS_URL } from "../config";
import { ISessionMessage } from "../interface/IMessage";

function page() {
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(0);
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      share: true,
      retryOnError: true,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log(lastJsonMessage);
    const data = JSON.parse(lastJsonMessage as string);
    if (data && "session" in data) {
      setSession(data.session);
    } else {
      setSession(1);
    }
  }, [lastJsonMessage]);

  return (
    <>
      <div className="container-fluid">
        {username && session ? (
          <TableSection
            sendJsonMessage={sendJsonMessage}
            lastJsonMessage={lastJsonMessage as string}
            readyState={readyState}
            session={session}
          />
        ) : (
          <LoginSection onLoginSetUsername={setUsername} />
        )}
      </div>
    </>
  );
}

export default page;
