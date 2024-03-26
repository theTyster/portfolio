//DEV LIBRARIES
import {useEffect, useState} from "react";
import axios from "axios";
import {setTitle, sleep} from "../../../assets/utils.js";

//CSS
import "../../../assets/css/landing-page.scss";

//COMPONENTS
import TabMenu from "../../tab-menu.jsx";
import AttetionGetterImage from "../../attention-getter-image.jsx";
import JobHistory from "./job-history.jsx";
import Hobbies from "./hobbies.jsx";
import Contributions from "./contributions.jsx";
import MyWork from "./my-work.jsx";

//SVG
import SvgCurlywave from "../../../assets/img/curlywave.jsx";

const AttentionGetterContent = () =>(
    <>
      <p><i>I like to keep things, lean, fast, simple and usable. The web was meant to make information accessible to anyone.</i></p>
      <blockquote>
      <p>
        <i>&quot;Web pages are designed for people.&quot;</i>
      </p>
       <p>-Tim Berners-Lee</p>
      </blockquote>
    </>
)

function LandingPage(){

  setTitle("Ty Davis")

  // PULL CONTRIBUTIONS DATA
  const githubApiSearch = "https://api.github.com/search/issues?q=author%3Athetyster+type%3Apr";
  let [pullRequests, setPullRequests] = useState();
  let [orgs, setOrgs] = useState();

  useEffect(()=> {(async ()=>{

    // GET PULL REQUEST DATA
    let search;
    while(!search){
      try {
        const resp = await axios(githubApiSearch);
        search = resp.data.items
      }
      catch (error){
        console.log("API Error. Trying Again. ", error);
        await sleep(120);
      }
    }

    // FILTER OUT MY OWN PULL REQUESTS.
    const pullRequests = search.filter((pr)=>
      pr.author_association === "CONTRIBUTOR"&&
      pr.pull_request.merged_at &&
      pr.state === "closed" ||
      pr.state === "open"
    )

    // GET ARRAY OF ORGS CONTRIBUTED TO.
    const prOrgsUrls = Array.from(
      new Set(pullRequests.map(pr => pr.repository_url)));

    // GET ASSOCIATED DATA OF ORGS
    let orgData = {};
    while(Object.keys(orgData).length === 0){
      try{
        await axios.all(
          prOrgsUrls.map(url => axios(url))
        )
        // move data into an object with the url set as the key for each org.
          .then(resps => [...resps].map(resp =>
            orgData[resp.data.url] = resp.data)
          )
      }
      catch (error){
        console.log("API Error. Trying Again. ", error);
        await sleep(120);
      }
    }

    setPullRequests(pullRequests);
    setOrgs(orgData);
  })()}, []);

  // TAB MENU DATA
  const menuItems = new Map([
    [
      {
        "job-history": 0,
        "initial": 1,
        "contributions": 2,
        "hobbies": 3,
      },
      [
        {
    //0
        id: "job-history",
        component: <JobHistory />,
        title: "Job History",
        },
        {
    //1
        id: "initial",
        component: <MyWork />,
        title: "My Work",
        },
        {
    //2
        id: "contributions",
        component:
          <Contributions
            orgs={orgs}
            pullRequests={pullRequests}
          />,
        title: "Contributions",
        },
        {
    //3
        id: "hobbies",
        component: <Hobbies />,
        title: "Hobbies",
        }
      ]
    ]
  ])


  return(
    <div className="landing-page">
      <AttetionGetterImage
        imgClass="my-headshot"
        sideText_classPrefix="headshot-text"
        imgSrc="img/me.jpg"
        imgAlt="My Face."
        sideText={<AttentionGetterContent />}
      />

      <hr />

      <TabMenu
        menuItems={menuItems}
      />
    </div>
  )
}

export default LandingPage;
