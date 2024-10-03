const JobHistoryUtils = {
  jobHistoryContent: function (
    id = 0,                // 0
    title = "",            // "Director of Communications"
    org = "",              // "Director's Choice"
    timeframe = {},        // {from: new Date(yyyy, m), to: new Date(yyyy, m)}
    logo = [],             // [img/src.png, "Alt Text", "Link (optional)"]
    summary = "",          // "I started at Director's Choice as a Marketing Assistant."
    responsibilities = []  // ["Maintain Sales Funnel.", "Create Advertisements.", ...]
){
    this.id = id;
    this.title = title;
    this.org = org;
    this.timeframe = timeframe;
    this.logo = logo;
    this.summary = summary;
    this.responsibilities = responsibilities;
  },

  JobDetails: function ({
  thumb,
  summary,
  list,
  classInsert,
}){

  return(
    <>
      <div
        className={`jobHistory-${classInsert}-details`}
      >
        {thumb}
        <div className={`jobHistory-${classInsert}-summary`}>
            {summary}
          <ul>
            {list.map(li =><li key={li.toString(36)}>{li}</li>)}
          </ul>
        </div>
      </div>
    </>
  )
},

  AttentionGetterSideText: function ({
  classInsert,
  title,
  org,
  from,
  to
}) {

  const startYear = from.getFullYear()
  const startMonth = from.getMonth();

  const endYear = to.getFullYear()
  const endMonth = to.getMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  const elapsed = months < 0?
    {y: --years, m: months += 12}
    :
    {y: years,   m: months};

  const timeFrameString = `
    ${from.toLocaleString('en', {month: 'long'})}, ${startYear} -
    ${endMonth === currentMonth?
      "Present"
      :
      `${to.toLocaleString('en', {month: 'long'})}, ${endYear}`
   }
  `
  const elapsedTimeString =`
    ${elapsed.y? `${elapsed.y} year${elapsed.y > 1? "s":""}` : ""}
    ${elapsed.y && elapsed.m? "and":""}
    ${elapsed.m? `${elapsed.m} month${elapsed.m > 1? "s" : ""}` : ""}
  `;

  return (
    <>
      <h3 className={`jobHistory-${classInsert}-title`}>{title}</h3>
      {org?<h4 className={`jobHistory-${classInsert}-org`}>{org}</h4>:undefined}
      <p className={`jobHistory-${classInsert}-timeframe`}>
        {timeFrameString}
      </p>
      <p className={`jobHistory-${classInsert}-elapsed-time`}>
        {elapsedTimeString}
      </p>
    </>
  );
  }
}

export default JobHistoryUtils;
