import react from "react";

function JobHistory(){
  return(
    <>
      <div className="springboard">
        <h3 className="jobHistory-title">Student</h3>
        <p className="jobHistory-org">Springboard Boot Camp</p>
        <img className="jobHistory-logo" src="img/springboard-logo.jpg" alt="Springboard Logo" />
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
      <div className="directorschoice">
        <h3 className="jobHistory-title">Director of Communication</h3>
        <p className="jobHistory-org">Director's Choice Tour and Travel</p>
        <img className="jobHistory-logo" src="img/directorschoice-logo.jpg" alt="Director's Choice Logo" />
        <div className="jobHistory-summary">
          <p>
            It was at Director's choice that I discovered I had a passion for
            web development. While working there some of my responsibilities
            included:
          </p>
          <ul>
            <li>Maintain the front-end of the company website.                                             </li>
            <li>Ground-up development and maintenance of a sales funnel automation application. (Python)   </li>
            <li>Update and maintain the WordPress instance and site theme for the company website.         </li>
            <li>Develop interactive product pages and update information.                                  </li>
            <li>Write HTML and CSS for marketing emails.                                                   </li>
            <li>Optimize all digital media for Search Engine crawlers. (SEO)                               </li>
            <li>Integrate data in Google sheets and HubSpot with various applications. (Python)            </li>
            <li>Design and gather visual media for marketing and public-facing events. (Adobe)             </li>
            <li>Crisis prevention and management.                                                          </li>
            <li>Brand Management.                                                                           </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default JobHistory;
