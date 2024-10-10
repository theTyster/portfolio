import Pre from "@components/pre/pre";
import NewTabLink from "@components/safe-link/new-tab-link";

function Backend() {
  return (
    <>
      <h3>Phase Three: Backend</h3>
      <h4>Cloudflare</h4>
      <p>
        The backend system for the site was built entirely serverless.
        Cloudflare, despite their many crimes against the internet, offer an
        unmatchable amount of free services. Everything from the relational
        database to the Next.js cache, all the way to the image delivery system
        was built using Cloudflare's services.
      </p>
      <h4>Relational Database</h4>
      <p>
        Initially, I thought I would be using Cloudflare Workers KV for the
        database. KV is a NoSQL solution though. I needed a relational database
        in order to define dog families. I quickly realized this was going to be
        a non-negotiable feature for this dog breeding site. After careful
        consideration of many options, I decided to use Cloudflare's D1 Sqlite
        database.
      </p>
      <aside>
        <h4>D1 is still new</h4>
        <p>
          D1 is still being adopted by the devolpment community. So, I quickly
          became deeply familiar with Cloudflare's documentation. This lead me
          to making{" "}
          <NewTabLink link="https://github.com/search?q=is%3Apr%20author%3AtheTyster%20archived%3Afalse%20cloudflare%20&type=pullrequests">
            several contributions
          </NewTabLink>{" "}
          to their documentation during the development of the site.
        </p>
      </aside>
      <h5>
        Here's a visual example of the schema I ended up creating for this
        Database
      </h5>
      <Pre>
        {`
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Group_Photos │  │ Headshots_Lg │  │ Headshots_Sm │
  └──────────────┘  └──────────────┘  └──────────────┘
  1:M    │       │          │         │
         │       └──────────┼─────────┘
         │                  └────┐
         v                       V 1:1
  ┌─────────────────────┐  M:M  ┌──────┐
  │ Dog_To_Group_Photos │<=====>│ Dogs │
  └─────────────────────┘       └──────┘
                                 / 1:1 \\
                                /       \\
                               /         \\
                              v           v
                      ┌─────────┐      ┌────────┐
                      │ Puppies │      │ Adults │
                      └─────────┘      └────────┘
                        \\ M:1 /          \\ 2:1 /
                         \\   /            \\   /    
                          \\ /              \\ /
                           │                │
                           v                v
                      ┌─────────┐ 1:1 ┌──────────┐  
                      │ Litters │────>│ Families │  
                      └─────────┘     └──────────┘
        `}
      </Pre>
      <p>
        This boiled down to only five total queries for site data and one complex
        query requiring aggregated 'Select' statements. Nevertheless, in the
        interest of squeezing every bit of speed I knew how to out of the site,
        I built a caching and validation function to cache the results of these
        six queries in Cloudflare's KV storage three times a day.
      </p>
      <img
        src="/static/img/backend-architecture.svg"
        alt="Cherry Lane Farms Back End Image Management map."
      />
      <p>
        This not only reduces queries, to a standard rate, (Something that could
        eventually cost money if it got out of hand.) but it also stores the
        results closer to users since KV storage is more distributed across
        Cloudflares CDN than D1 is currently.
      </p>
      <h4>Image Delivery</h4>
      <p>
        Protecting proprietary images was a priority for the owner. Apparently
        it is not uncommon for puppy mills to steal images off the internet and
        use them to market off their own dogs.
      </p>
      <p>
        With this in mind, I devised a way to not only optimize images, but also
        secure them, and the image optimization service from abuse.
      </p>
      <img
        src="/static/img/image-delivery.svg"
        alt="Cherry Lane Farms Image Delivery Architectural map."
      />
      <p>
        Cloudflare's image delivery service optimizes images as they are
        accessed and immediately caches them on the edge. The first time an
        image is accessed, it is optimized and then stored on the edge server.
      </p>
      <p>
        Using this service is very easy. It simply requires a minor change to
        the sources image URL. The problem was that, once enabled, anyone savvy
        enough to discover that the service is in use can make the same
        alteration and siphon optimizations from your image delivery worker.
        This can lead to a large bill from Cloudflare.
      </p>
      <h5>The Creation of CripToe</h5>
      <p>
        For a small website like this that would otherwise have no costs for
        image delivery, I was determined to lock everything down.
      </p>
      <p>
        So, I created my first NPM package,{" "}
        <NewTabLink link="https://www.npmjs.com/package/criptoe">
          CripToe
        </NewTabLink>
        . CripToe simply encrypts and decrypts URL strings. I used this to
        encrypt the image delivery URL and programmed the worker to reject any
        optimizations that could not be decrypted. Then, all that was left was
        to encrypt and hash all of the images and store the encrypted URLs in
        the database.
      </p>
    </>
  );
}

export default Backend;
