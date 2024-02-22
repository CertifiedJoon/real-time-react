import { useEffect, useState } from "react";

import { IMessage } from "../interface/IMessage";
import Loading from "../component/Loading";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { ReadyState } from "react-use-websocket";

interface IProp {
  sendJsonMessage: SendJsonMessage;
  lastJsonMessage: string;
  readyState: ReadyState;
  session: number;
}

export default function TableSection(prop: IProp) {
  return (
    <div className="main-content">
      <div className="document-holder">
        <Document
          sendJsonMessage={prop.sendJsonMessage}
          lastJsonMessage={prop.lastJsonMessage}
          readyState={prop.readyState}
          session={prop.session}
        />
      </div>
    </div>
  );
}

function Document(prop: IProp) {
  const { sendJsonMessage, lastJsonMessage } = prop;
  const [filterValue, setFilterValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [table, setTable] = useState<Array<IRow>>([
    { flowType: -1, clientId: "-", symbol: "-" },
  ]);

  function handleFilterChange() {
    const message: IMessage = {
      operation: "update",
      user: "g01710",
      column: "flowtype",
      val: filterValue,
      session: prop.session,
    };
    setLoading(true);
    sendJsonMessage(message);
  }

  useEffect(() => {
    const data = JSON.parse(lastJsonMessage as string);
    console.log(lastJsonMessage);
    if (data) {
      setTable(data);
      setLoading(false);
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <input type="text" onChange={(e) => setFilterValue(e.target.value)} />
      <button onClick={handleFilterChange}>Apply Filter on FlowType</button>
      {loading ? (
        <Loading />
      ) : (
        <table>
          <tr>
            <th>FlowType</th>
            <th>ClientID</th>
            <th>Symbol</th>
          </tr>
          {table.map((row: IRow) => {
            return (
              <tr>
                <td>{row.flowType}</td>
                <td>{row.clientId}</td>
                <td>{row.symbol}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}
