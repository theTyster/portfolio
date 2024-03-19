import react from "react";
import PropTypes from "prop-types";
import {normalizeEpochDate} from "../../../assets/utils.js"

//COMPONENTS
import SvgPullRequest from "../../../assets/img/pull-request-svg.jsx";

//CSS
import "../../../assets/css/pull-request-tile.scss";

function PullRequestTile({pr, org}){

  //Props Validation
  PullRequestTile.propTypes = {
    pr: PropTypes.object.isRequired,
    org: PropTypes.object.isRequired,
  }

  //VARIABLES
  const thetyster = pr.user;
  const pullRequest = pr.pull_request;

  //CLICK HANDLERS
  const visitPullRequest = ()=> window.open(pr.html_url+"/files"); 

  return (
    <div onClick={visitPullRequest} className="pull-request-tile">
      <h4><SvgPullRequest  className={pullRequest.merged_at?"pr-icon-merged":"pr-icon-open"}/> {pr.title}</h4>
      <p>{normalizeEpochDate(pr.created_at)}</p>
      <p>{org.description}</p>
      <a href={thetyster.html_url}>
        <img src={thetyster.avatar_url} alt="My Github user profile picture" />
      </a>
      <a href={org.html_url}>
        <img src={org.owner.avatar_url} alt={`${org.login}'s profile picture`} />
      </a>

      {pr.labels.map(label=><span key={label.id} style={{backgroundColor: `#${label.color}`}}>{label.name}</span>)}

      {(()=>{
        // Display reactions if they exist.
        if(pr.reactions["+1"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["+1"] > 2) pr.reactions["+1"]})()}👍</p>
        if(pr.reactions["-1"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["-1"] > 2) pr.reactions["-1"]})()}👎</p>
        if(pr.reactions["confused"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["confused"] > 2) pr.reactions["confused"]})()}😕</p>
        if(pr.reactions["eyes"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["eyes"] > 2) pr.reactions["eyes"]})()}👀</p>
        if(pr.reactions["heart"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["heart"] > 2) pr.reactions["heart"]})()}❤</p>
        if(pr.reactions["hooray"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["hooray"] > 2) pr.reactions["hooray"]})()}🎉</p>
        if(pr.reactions["laugh"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["laugh"] > 2) pr.reactions["laugh"]})()}😆</p>
        if(pr.reactions["rocket"]) return <p className="pr-reaction">{(()=>{if(pr.reactions["rocket"] > 2)pr.reactions["rocket"]})()}🚀</p>
      })()}
    </div>
  )
}

export default PullRequestTile;
