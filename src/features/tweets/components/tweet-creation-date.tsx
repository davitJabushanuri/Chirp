import dayjs from "dayjs";
import Link from "next/link";

import { Tooltip } from "@/components/elements/tooltip";

export const TweetCreationDate = ({
  date,
  link = "#",
}: {
  date: Date | undefined;
  link?: string;
}) => {
  const created = dayjs(date);

  return (
    <div className="border-b-[1px] border-neutral-600 py-4 text-milli text-tertiary-100">
      <Tooltip text={created.format(`h:mm A · MMM D, YYYY`)} className="w-fit">
        <Link
          className="cursor-pointer hover:underline focus-visible:underline"
          href={`/status/${link}`}
          aria-label={created.format(`h:mm A · MMM D, YYYY`)}
        >
          <time dateTime={created.format(`YYYY-MM-DDTHH:mm:ssZ`)}>
            {created.format(`h:mm A · MMM D, YYYY`)}
          </time>
        </Link>
      </Tooltip>
    </div>
  );
};
