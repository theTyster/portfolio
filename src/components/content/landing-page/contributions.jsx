import {useEffect, useState} from "react";
import axios from "axios";

//Components
import PullRequestTile from "./pull-request-tile.jsx";
import SvgLoadingCircle from "../../../assets/img/loading-circle-svg.jsx";

//CSS
import "../../../assets/css/pull-request-tile.scss";

function Contributions(){
  const githubApiSearch = "https://api.github.com/search/issues?q=author%3Athetyster+type%3Apr";
  let [pullRequestData, setPullRequestData] = useState();

  useEffect(()=> {(async ()=>{
    const resp = await axios(githubApiSearch);
    const search = resp.data
    setPullRequestData(search.items);
  })()}, []);

  return(
    <>
      <h3>Free and Open Source Software</h3>
      <p>This is something I care a lot about. Most of the software that I use falls under this umbrella. By creating software that is reusable by anyone, we help build each other up and give one another greater control over our digital world. Here's some projects I have contributed to.</p>
      <ul>
        {(()=> {
            return pullRequestData? 
              pullRequestData.map(pr => {
                  if(
                    pr.author_association === "CONTRIBUTOR"&&
                    pr.pull_request.merged_at && 
                    pr.state === "closed" || 
                    pr.state === "open"
                  )
                    return <PullRequestTile key={pr.id} pr={pr} />
                }
              ):
              <SvgLoadingCircle className="loading" />
        })()}
      </ul>
    </>
  );
}

export default Contributions;
