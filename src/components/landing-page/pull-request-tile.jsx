import react from "react";
import PropTypes from "prop-types";
import {normalizeEpochDate} from "../../assets/utils.js"

//COMPONENTS
import SvgPullRequest from "../../assets/img/pull-request-svg.jsx";

//CSS
import "../../assets/css/pull-request-tile.scss";

function PullRequestTile({pr, org}){

  //Props Validation
  PullRequestTile.propTypes = {
    pr: PropTypes.object.isRequired,
    org: PropTypes.object.isRequired,
  }

  //VARIABLES
  const user = pr.user;
  const pullRequest = pr.pull_request;
  const mergedClass = pullRequest.merged_at?"prt-merged":"prt-open";
  const reactionEmoji = {
    "-1":"👎",
    "+1":"👍",
    "confused":"😕",
    "eyes":"👀",
    "heart":"❤",
    "hooray":"🎉",
    "laugh":"😆",
    "rocket":"🚀",
  }



  return (
    <div className={`pull-request-tile ${mergedClass}`}>
      <a
        href={pr.html_url+"/files"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <h4 className={mergedClass}>
          #{pr.url.split("/").slice(-1)[0]} - {pullRequest.merged_at?"Merged":"Open"}
        </h4>
      </a>
      <h5>{pr.title}</h5>

      <div className="prt-visual-aid">
        <a
          href={org.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="prt-org-link"
        >
          <img
            className="prt-org-avatar"
            src={org.owner.avatar_url}
            alt={`${org.login}'s profile picture`}
          />
        </a>

        <SvgPullRequest  className={mergedClass}/>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="prt-user-link"
        >
          <img
            className="prt-user-avatar"
            src={user.avatar_url}
            alt="My Github user profile picture"
          />
        </a>
      </div>

      <p className="prt-org-description">{org.description}</p>

      <div className="prt-labels">
      {
        //pr.labels.map(label=>
        //<span
        //  key={label.id.toString()+pr.id.toString()}
        //  className="prt-labels"
        //  style={{
        //    backgroundColor: `#${lightenHexColor(label.color, 1)}`,
        //    color: `#${darkenHexColor(label.color, .1)}`,
        //    border: `5px solid #${darkenHexColor(label.color, .7)}`
        //  }}
        //>
        //  {label.name + " "}
        //</span>
        //)
      }
      </div>

      <div className="prt-reactions">
        {(()=>{
          let reactions = [];
          // Display reactions if they exist.
          for (let emoji in pr.reactions){

            if(emoji === "total_count" || emoji === "url") continue;

            if(pr.reactions[emoji])
              reactions.push(
                <span
                  key={`prt-reaction: ${emoji}`}
                  className="prt-reaction"
                >
                  {(pr.reactions[emoji] > 1)?
                        <span
                          key={`prt-reaction: ${emoji}-count`}
                          className="prt-reaction-count"
                        >
                          {`+${pr.reactions[emoji]}`}
                        </span>
                      : undefined}
                  {reactionEmoji[emoji]}
                </span>
              );
          }
          return reactions;
        })()}
      </div>

      <p className="prt-create-date">Created {normalizeEpochDate(pr.created_at)}.</p>
    </div>
  )
}

export default PullRequestTile;
