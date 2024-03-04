import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

//COMPONENTS
import SvgPullRequest from "../../../assets/img/pull-request-svg.jsx";
import SvgLoadingCircle from "../../../assets/img/loading-circle-svg.jsx";

//CSS
import "../../../assets/css/pull-request-tile.scss";

function PullRequestTile({pr}){

  //Props Validation
  PullRequestTile.propTypes = {
    pr: PropTypes.object.isRequired,
  }

  //VARIABLES
  const thetyster = pr.user;
  const pullRequest = pr.pull_request;

  //CLICK HANDLERS
  const visitPullRequest = ()=> window.open(pr.html_url+"/files"); 

  //TODO move utility function to separate file.
  const normalizeEpochDate = dateString=>{
    let date = new Date(dateString);
    let format = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return `${date.toLocaleTimeString("en-US", format)}`;
  }

  let [orgData, setOrgData] = useState();

  useEffect(()=>{(async ()=>{
    const resp = await axios(pr.repository_url);
    const org = resp.data;
    setOrgData([org.html_url, org.owner.avatar_url, org.login, org.description]);
  })()},[])

  return (
    <div onClick={visitPullRequest} className="pull-request-tile">
      <h4><SvgPullRequest  className={pullRequest.merged_at?"pr-icon-merged":"pr-icon-open"}/> {pr.title}</h4>
      <p>{normalizeEpochDate(pr.created_at)}</p>
      {(()=>{
      return orgData?
        <p>{orgData[3]}</p>
        :
        <p>Loading...</p>
      })()}
      <a href={thetyster.html_url}>
        <img src={thetyster.avatar_url} alt="My Github user profile picture" />
      </a>
      {(()=>{
        return orgData? (
          <a href={orgData[0]}>
            <img src={orgData[1]} alt={`${orgData[2]}'s profile picture`} />
          </a>
        ):
          <SvgLoadingCircle className="loading" />
      })()}

      {pr.labels.map(label=><span key={label.id} style={{backgroundColor: `#${label.color}`}}>{label.name}</span>)}

      {(()=>{
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
