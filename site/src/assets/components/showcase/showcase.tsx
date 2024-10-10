//CSS
import "./showcase.scss";

// This component requires a pseudo SQL database shaped Map that has the following constraints:
// I. An Object which contains Id's pointing to indexes. {["id"]: 0}
// II. An Array which contains objects holding:
//    1.) A unique id for each entry.
//    2.) A title for the image to be displayed.
//    3.) An Image array. [src, alt]
//    4.) A method for an onClick function --OR-- a link array. ["uri/index.html", "_blank"]
//    [{
//      //0
//      id: "id",
//      title: "Title",
//      onClick: undefined,
//      link: ["uri/index.html", "_blank"],
//      img: ["./img/image.png", "Example Alt Text."],
//    }]

const hasLink = (s: PortfolioDB["Data"]) => {
  if (!s.className) s.className = "";
  if (s.link)
    return (
      <a
        className={s.className}
        key={s.id}
        data-showcase-item-id={s.id}
        href={s.link[0]}
        target={s.link[1] ? s.link[1] : ""}
        rel={s.link[1] === "_blank" ? "noreferrer noopener" : undefined}
      >
        {s.title ? <h3>{s.title}</h3> : ""}
        {s.img}
      </a>
    );
  else if (s.onClick)
    return (
      <button
        className={s.className}
        key={s.id}
        data-showcase-item-id={s.id}
        onClick={s.onClick}
      >
        {s.title ? <h3>{s.title}</h3> : ""}
        {s.img}
      </button>
    );
  else
    return (
      <>
        {s.title ? <h3>{s.title}</h3> : ""}
        {s.img}
      </>
    );
};

const Showcase = ({ db }: { db: PortfolioDB['Map'] }) => {
  //const showcaseNamesObj = db.keys().next().value;
  const showcaseDataArr: PortfolioDB['Data'] = db.values().next().value;

  return (
    <div className="showcase">
      {showcaseDataArr.map((s, index) => {
        if (index === 0) {
          return (
            <>
              <div key="showcase_currently-showcased" className="currently-showcased">
                {hasLink(s)}
              </div>
              <hr key="showcase_hr" />
            </>
          );
        } else {
          return hasLink(s);
        }
      })}
    </div>
  );
};

export default Showcase;
