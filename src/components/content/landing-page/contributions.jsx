import react from "react";
import PropTypes from "prop-types";

//Components
import PullRequestTile from "./pull-request-tile.jsx";
import SvgLoadingCircle from "../../../assets/img/loading-circle-svg.jsx";

//CSS
import "../../../assets/css/contributions.scss";

function Contributions({orgs, pullRequests}){
  //PROPS
  Contributions.propTypes = {
    orgs: PropTypes.object.isRequired,
    pullRequests: PropTypes.array.isRequired,
  }

  return(
    <>
      <h3>Free and Open Source Software</h3>
      <p>This is something I care a lot about. Most of the software that I use falls under this umbrella. By creating software that is reusable by anyone, we help build each other up and give one another greater control over our digital world. Here's some projects I have contributed to.</p>
      <ul>
        {orgs?
            pullRequests.map(pr => 
          <PullRequestTile
            key={pr.id}
            pr={pr}
            org={orgs[pr.repository_url]}
          />)
          :
            <SvgLoadingCircle className="loading" />
        }
      </ul>
    </>
  );
}

export default Contributions;
