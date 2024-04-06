import react from "react";
import PropTypes from "prop-types";

//CSS
import "../assets/css/showcase.scss";

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

const Showcase = ({db}) =>{

  //PROPS
  Showcase.propTypes = {
    db: PropTypes.object.isRequired,
  }


  const showcaseNamesObj = db.keys().next().value;
  const showcaseDataArr = db.values().next().value;

  return (
    <div className="showcase">
      {showcaseDataArr.map(s =>
          s.link?(
            <a
              key={s.id}
              data-showcase-item-id={s.id}
              href={s.link[0]}
              target={s.link[1]?s.link[1]:undefined}
              rel={s.link[1] === "_blank"?"noreferrer noopener":undefined}
            >
              <h3>{s.title}</h3>
              <img src={s.img[0]} alt={s.img[1]} />
            </a>
          ):(
            <button
              key={s.id}
              data-showcase-item-id={s.id}
              onClick={s.onClick}
            >
              <h3>{s.title}</h3>
              <img src={s.img[0]} alt={s.img[1]} />
            </button>
          )
      )}
    </div>
  );
}

export default Showcase;
