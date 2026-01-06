//import PropTypes from "prop-types";
import GitHubCalendar from "react-github-calendar";

//Components
import PullRequestTile from "../pull-request-tile/pull-request-tile";
import SvgLoadingCircle from "@img/loading-circle-svg";
import ErrorMessageModal from "@components/error-msg-modal/error-msg-modal";

//CSS
import "./contributions.scss";

function Contributions({ orgs, pullRequests }) {
//  //PROPS
//  Contributions.propTypes = {
//    orgs: PropTypes.object.isRequired,
//    pullRequests: PropTypes.array.isRequired,
//  };
  const githubHTMLSearch =
    "https://github.com/search?q=author%3Athetyster+type%3Apr";

  return (
    <div className="contributions">
      <h3>Free and Open Source Software</h3>
      <p>
        This is something I care a lot about. Most of the software that I use
        falls under this umbrella. By creating software that is reusable by
        anyone, we help build each other up and give one another greater control
        over our digital world. Here&apos;s some projects I have contributed to.
      </p>
      <ul>
        <GitHubCalendar
          username="thetyster"
          colorScheme="light"
          style={{
            width: "unset",
            maxWidth: `${
              window.innerWidth < 600
                ? 220
                : window.innerWidth < 800
                ? 600
                : 800
            }px`,
            display: "block",
            margin: "0 auto",
            padding: 0,
          }}
          transformTotalCount={false}
          labels={{
            totalCount: "{{count}} contributions",
          }}
        />
        {orgs ? (
          pullRequests.map((pr) => (
            <PullRequestTile
              key={pr.id}
              pr={pr}
              org={orgs[pr.repository_url]}
            />
          ))
        ) : (
          <>
            <SvgLoadingCircle className="loading" />
            <p className="loading-msg">
              Content will refresh as data becomes available.
            </p>
            <ErrorMessageModal
              msg="Github's unauthenticated API rate limit is 60 requests per hour. This may have been exceeded. View my contributions on Github Instead!"
              imgSrc="/static/github-mark.svg"
              imgAlt="Github Logo"
              buttonLink={githubHTMLSearch}
              buttonText="Visit Now"
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default Contributions;
