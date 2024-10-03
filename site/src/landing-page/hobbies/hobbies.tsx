// vim:foldmethod=marker
import { React } from "react";
import {calcAge} from "@utils/utils.js";
import utils from "./hobbies.utils";

//css
import "./hobbies.scss";

function Hobbies(){

  const hobbyArr = [
    // Self-hosting{{{
    new utils.hobby(
      0,
      "Self-hosting",
      <p>
        My data is very important to me. To keep control of what goes out
        onto the internet I try to self-host as much of my own data as I can.
        I'm currently running servers hosting:
      </p>,
      <>
        <utils.DetailsTag
          summary={<a href="https://nextcloud.com">Nextcloud</a>}
          details={
            <p>
              Nextcloud is like Google Drive. I run this out of a
              docker container on it's own machine. This holds a lot of sensitive
              data so, for increased security this is only available on my home
              network. I use a VPN and SSH to access it outside of the
              house.
            </p>
          }
        />
        <utils.DetailsTag
          summary={<a href="https://pleroma.social">Pleroma</a>}
          details={
            <p>
              Pleroma is a lot like <a
              href="https://mastodon.social">Mastodon</a> which you may have
              heard of. Mastodon and Pleroma are programs used to connect to
              the federated socialsphere called "The Fediverse". Pleroma is a
              lighter, faster project but interoperates with all of the
              platforms on the fediverse. Including Mastodon.
            </p>
          }
        />
         <utils.DetailsTag
          summary={<a href="https://github.com/searxng/searxng">SearXNG</a>}
          details={
            <p>
              SearXNG is a search engine that pulls searches from
              other search engines. Garnering more results with better
              privacy.
            </p>
          }
        />
         <utils.DetailsTag
           summary={<a href="https://standardnotes.com">Standard Notes</a>}
           details={
             <p>
               Standard Notes is an encrypted note taking app. It's
               surprisingly hard to host this.
             </p>
           }
         />
         <utils.DetailsTag
          summary={<a href="https://gitea.com">Gitea</a>}
          details={
            <p>
              Gitea is a lightweight git server. I mainly use mine to host small
              hobby projects not tied to my professional life.
            </p>
           }
        />
        <utils.DetailsTag
          summary={<a href="https://conduit.rs">Conduit</a>}
          details={<p>Conduit is a lightweight Matrix Chat server.</p>}
        />
      </>
    ),//}}}
    // Family Time{{{
    new utils.hobby(
      1,
      "Family Time",
      <p>
        My family is so much fun. I love spending time with my wife
        and {calcAge("2022")}-year-old daughter. When we are all together some of
        the things we enjoy doing are:
      </p>,
      <ul>
        <li>Playing outside</li>
        <li>Reading books together</li>
        <li>Teaching each other new things</li>
        <li>Making messes</li>
        <li>Eating carrots</li>
      </ul>,
    ),//}}}
    // Retro Video Games{{{
    new utils.hobby(
      2,
      "Retro Video Games",
      <p>
        There was a time when video games didn't need to be connected to the
        internet, or updated, or even have lit screens to be fun. I don't get
        very much time for it these days but, when I dive into my childhood video
        games some of my favorites are:
      </p>,
      <ul>
        <li>Pokemon Generations 1, 2, and 3</li>
        <li>Pac-Man</li>
        <li>Donkey Kong Country</li>
        <li>Castlevania</li>
        <li>Harvest Moon</li>
      </ul>,
    ),//}}}
    // A Good Story{{{
    new utils.hobby(
      3,
      "A Good Story",
      <p>
        My wife and I can both get really wrapped up in a good story. We often
        try reading books and watching movies or TV Shows together but, often
        end up skipping ahead of each other in our never-ending thirst for
        imaginary adventure. Some of our favorite genres are:
      </p>,
      <ul>
        <li>Marvel Super Heroes</li>
        <li>Disney Pixar</li>
        <li>Harry Potter</li>
        <li>Korean Dramas</li>
      </ul>,
    ),//}}}
    // Cooking{{{
    new utils.hobby(
      4,
      "Cooking",
      <p>
        I firmly believe that one of the best things a person can do to increase
        the quality of their life is learn how to cook. Some of my favorite
        foods are:
      </p>,
      <ul>
        <li>Hot sauce!!!</li>
        <li>Homemade pizza</li>
        <li>Fermented Onions</li>
        <li>Homemade ginger ale</li>
        <li>Smoked jerky</li>
      </ul>,
    )//}}}
  ]

    return(
    <div className="hobbies">
      {hobbyArr.map(h=>
        <article key={h.id}>
          <h3>{h.category}</h3>
          {h.par}
          {h.examples}
        </article>
      )}
    </div>
  );
}

export default Hobbies;
