import react from "react";
import PropTypes from "prop-types";

//CSS
import "../assets/css/showcase.scss";

const Showcase = ({db}) =>{

  //PROPS
  Showcase.propTypes = {
    db: PropTypes.object.isRequired,
  }

  const namesObj = db.keys().next().value;
  const dataArr = db.values().next().value;

  const handleClick = event =>{
    try{
      // Get the target.
      const target = Array
        .from(event.target.parentNode.childNodes)
        .filter((e)=>e.nodeName === "H3")[0].innerText;
    }
    catch (TypeError){
      console.log(TypeError);
      return
  }

    // Use the Map to find the onClick function of the
    // target without having to iterate over anything. 
    // O(1)
    dataArr[namesObj[target]].onClick();
  }

  return (
    <>
      <nav>
        <menu className="showcase" onClick={handleClick}>
          {dataArr.map(p => 
              (
                <button key={p.name}>
                  <h3>{p.name}</h3>
                  <img src={p.img[0]} alt={p.img[1]} />
                </button>
              )
          )}
        </menu>
      </nav>
    </>
  );
}

export default Showcase;
