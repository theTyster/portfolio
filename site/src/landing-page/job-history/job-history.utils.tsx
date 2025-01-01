import AttentionGetter from "@components/attention-getter-image/attention-getter-image";

type Timeframe = { from: Date; to: Date } | Record<string, never>;

function JobEntry({
  id,
  title,
  org,
  timeframe,
  logo,
  summary,
  responsibilities,
}: {
  id?: number;
  title?: string;
  org?: string;
  timeframe?: Timeframe;
  logo?: string[];
  summary?: string | React.ReactNode;
  responsibilities?: (string | React.ReactNode)[];
}) {
  id = id ?? 0;
  title = title ?? "";
  org = org ?? "";
  timeframe = timeframe ?? {};
  logo = logo ?? [];
  summary = summary ?? "";
  responsibilities = responsibilities ?? [];

  const startYear = timeframe.from.getFullYear();
  const startMonth = timeframe.from.getMonth();

  const endYear = timeframe.to.getFullYear();
  const endMonth = timeframe.to.getMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  const elapsed =
    months < 0 ? { y: --years, m: (months += 12) } : { y: years, m: months };

  const timeFrameString = `
    ${timeframe.from.toLocaleString("en", { month: "long" })}, ${startYear} -
    ${
      endMonth === currentMonth
        ? "Present"
        : `${timeframe.to.toLocaleString("en", { month: "long" })}, ${endYear}`
    }
  `;
  const elapsedTimeString = `
    ${elapsed.y ? `${elapsed.y} year${elapsed.y > 1 ? "s" : ""}` : ""}
    ${elapsed.y && elapsed.m ? "and" : ""}
    ${elapsed.m ? `${elapsed.m} month${elapsed.m > 1 ? "s" : ""}` : ""}
  `;

  return (
    <>
      <div className={`jobHistory-${id}-details`}>
        <AttentionGetter
          imgClass={`jobHistory-${id}-logo`}
          imgSrc={logo[0]}
          imgAlt={logo[1]}
          imgLink={logo[2] ? logo[2] : undefined}
          sideText_classPrefix={`jobHistory-${id}`}
          sideText={
            <>
              <h3 className={`jobHistory-${id}-title`}>{title}</h3>
              {org ? (
                <h4 className={`jobHistory-${id}-org`}>{org}</h4>
              ) : undefined}
              <p className={`jobHistory-${id}-timeframe`}>{timeFrameString}</p>
              <p className={`jobHistory-${id}-elapsed-time`}>
                {elapsedTimeString}
              </p>
            </>
          }
        />
        <div className={`jobHistory-${id}-summary`}>
          {summary}
          <ul>
            {responsibilities.map((li) => (
              <li key={li!.toString()}
                className={`jobHistory-${id}-responsibilities`}
              >{li}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default JobEntry;
