import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Link from "next/link";

import { cn } from "@/utils/cn";

import { Tooltip } from "../../tooltip";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const CreateDate = ({
  date,
  focus = true,
  hover = true,
}: {
  date: Date | undefined;
  focus?: boolean;
  hover?: boolean;
}) => {
  const created = dayjs(date);
  const day = 24 * 60 * 60 * 1000;
  const isMoreThan24Hours = Date.now() - created.valueOf() < day;

  return (
    <Tooltip text={created.format("h:mm A · MMM D, YYYY")}>
      <Link
        className={cn(
          "text-nowrap",
          hover && "hover:underline focus-visible:underline",
        )}
        tabIndex={focus ? 0 : -1}
        href={`#`}
        aria-label={created.format("MMM D")}
        data-title={created.format("h:mm A · MMM D, YYYY")}
      >
        <time
          dateTime={created.format("YYYY-MM-DDTHH:mm:ssZ")}
          className="text-milli text-tertiary-100"
        >
          {isMoreThan24Hours ? created.fromNow(true) : created.format("MMM D")}
        </time>
      </Link>
    </Tooltip>
  );
};
