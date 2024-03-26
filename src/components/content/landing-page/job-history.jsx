import react from "react";

//CSS
import "../../../assets/css/job-history.scss";

//Components
import AttentionGetterImage from "../../attention-getter-image.jsx";

const Springboard = ()=>(
  <>
    <h3 className="jobHistory-title">Student</h3>
    <p className="jobHistory-org">Springboard Boot Camp</p>
  </>
)

const DirectorsChoice = ()=>(
  <>
    <h3 className="jobHistory-title">Director of Communication</h3>
    <p className="jobHistory-org">Director's Choice Tour and Travel</p>
  </>
)

const JobHistory = () => (
  <div className="job-history">
    <div className="springboard">
      <AttentionGetterImage 
        imgClass="jobHistory-logo" 
        imgSrc="img/springboard-logo.jpg" 
        imgAlt="Springboard Logo"
        sideText={<Springboard />}
        sideText_classPrefix="jobHistory"
      />
      <div className="jobHistory-summary">
        <p>
          After a year of self-teaching I decided to team up with springboard
          to further my expertise in front end web development. At Springboard
          I learned:
        </p>
        <ul>
          <li>Advanced front end development. </li>
          <li>Advanced JavaScript.            </li>
          <li>Advanced Python.                </li>
          <li>SQL.                            </li>
          <li>Unit and Integration Testing.   </li>
          <li>Back end development.           </li>
        </ul>
      </div>
    </div>
    <hr />
    <div className="directorschoice">
      <AttentionGetterImage 
        imgClass="jobHistory-logo"
        imgSrc="img/directorschoice-logo.png"
        imgAlt="Director's Choice Logo"
        sideText={<DirectorsChoice />}
        sideText_classPrefix="jobHistory"
      />
      <div className="jobHistory-summary">
        <p>
          It was at Director's choice that I discovered I had a passion for
          web development. While working there some of my responsibilities
          included:
        </p>
        <ul>
          <li>Maintaining the front-end of the company website.                                             </li>
          <li>Ground-up development and maintenance of a sales funnel automation application. (Python)   </li>
          <li>Updating and maintain the WordPress instance and site theme for the company website.         </li>
          <li>Developing interactive product pages and update information.                                  </li>
          <li>Writing HTML and CSS for marketing emails.                                                   </li>
          <li>Optimizing all digital media for Search Engine crawlers. (SEO)                               </li>
          <li>Integrating data in Google sheets and HubSpot with various applications. (Python)            </li>
          <li>Designing and gather visual media for marketing and public-facing events. (Adobe)             </li>
          <li>Crisis prevention and management.                                                          </li>
          <li>Brand Management.                                                                           </li>
        </ul>
      </div>
    </div>
  </div>
);

export default JobHistory;
