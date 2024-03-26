import react from "react";

//css
import "../../../assets/css/hobbies.scss";

function Hobbies(){
  const calcAge = birthDate => Math.round(Math.abs((new Date(birthDate)-(new Date())))/8.64e7/365);
  return(
    <div className="hobbies">
      <h3>Self-hosting</h3>
        <p>
          My data is very important to me. To keep control of what goes out onto the internet I try to self-host as much of my own data as I can. I'm currently running servers hosting:
        </p>
      <ul>
        <li>
          <details>
          <summary>
            <a href="https://nextcloud.com">Nextcloud</a>
          </summary>
            <p>
            Nextcloud is like Google Drive. I run this out of a docker container on it's own machine. This holds a lot of sensitive data so, for increased security this is only available on my home network. I use a VPN and SSH to access it outside of the house.
            </p>
          </details>
        </li>
        <li>
          <details>
          <summary>
            <a href="https://pleroma.social">Pleroma</a>
          </summary>
            <p>
              Pleroma is a lot like <a href="https://mastodon.social">Mastodon</a> which you may have heard of. Mastodon and Pleroma are programs used to connect to the federated socialsphere called "The Fediverse". Pleroma is a lighter, faster project but interoperates with all of the platforms on the fediverse. Including Mastodon.
            </p>
          </details>
        </li>
        <li>
          <details>
          <summary>
            <a href="https://github.com/searxng/searxng">SearXNG</a>
          </summary>
            <p>SearXNG is a search engine that pulls searches from other search engines. Garnering more results with better privacy.</p>
          </details>
        </li>
        <li>
          <details>
          <summary>
            <a href="https://standardnotes.com">Standard Notes</a>
          </summary>
            <p>Standard Notes is an encrypted note taking app. It's surprisingly hard to host this.</p>
          </details>
        </li>
        <li>
          <details>
          <summary>
            <a href="https://gitea.com">Gitea</a>
          </summary>
            <p>Gitea is a lightweight git server. I mainly use mine to host small hobby projects not tied to my professional life.</p>
          </details>
        </li>
        <li>
          <details>
          <summary>
            <a href="https://conduit.rs">Conduit</a>
          </summary>
            <p>Conduit is a lightweight Matrix Chat server.</p>
          </details>
        </li>
      </ul>
      <h3>Family Time</h3>
      <p>My family is so much fun. I love spending time with my wife and {calcAge("2022")}-year-old daughter. When we are all together some of the things we enjoy doing are:</p>
      <ul>
        <li>Playing outside</li>
        <li>Reading books together</li>
        <li>Teaching each other new things</li>
        <li>Making messes</li>
        <li>Eating carrots</li>
      </ul>
      <h3>Retro Video Games</h3>
      <p>There was a time when video games didn't need to be connected to the internet, or updated, or even have lit screens to be fun. I don't get very much time for it these days but, when I dive into my childhood video games some of my favorites are:</p>
      <ul>
        <li>Pokemon Generations 1, 2, and 3</li>
        <li>Pac-Man</li>
        <li>Donkey Kong Country</li>
        <li>Castlevania</li>
        <li>Harvest Moon</li>
      </ul>
      <h3>A Good Story</h3>
      <p>My wife and I can both get really wrapped up in a good story. We often try reading books and watching movies or TV Shows together but, often end up skipping ahead of each other in our never-ending thirst for imaginary adventure. Some of our favorite genres are:</p>
      <ul>
        <li>Marvel Super Heroes</li>
        <li>Disney Pixar</li>
        <li>Harry Potter</li>
        <li>Korean Dramas</li>
      </ul>
      <h3>Cooking</h3>
      <p>I firmly believe that one of the best things a person can do to increase the quality of their life is learn how to cook. Some of my favorite foods are:</p>
      <ul>
        <li>Hot sauce!!!</li>
        <li>Homemade pizza</li>
        <li>Fermented Onions</li>
        <li>Homemade ginger ale</li>
        <li>Smoked jerky</li>
      </ul>
    </div>
  );
}

export default Hobbies;
