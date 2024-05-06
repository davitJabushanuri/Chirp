import { Button } from "@/components/elements/button";
import { prisma } from "@/lib/prisma";
import { Log } from "./log";

const getLogs = async () => {
  const data = await prisma.errorLog.findMany({});
  return data;
};

async function LogsPage() {
  const logs = await getLogs();
  console.log(logs);

  if (!logs || logs.length === 0) {
    return (
      <div className="p-4">
        <p>There are no logs in this time range</p>
        <button>Refresh Query</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {logs.map((log) => {
        return <Log log={log} key={log.id} />;
      })}
    </div>
  );
}

export default LogsPage;

export const metadata = {
  title: "Logs",
};
