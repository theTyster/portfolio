import "./blog.scss";

export type BlogPost = {
  title: string;
  date: string;
  description: string;
  permalink: string;
};

export type BlogFeedResult =
  | { ok: true; pages: BlogPost[] }
  | {
      ok: false;
      reason: "no_token" | "http_error" | "network_error" | "parse_error";
      status?: number;
    };

// The blog lives on the Bludit CMS at blog.thetyster.dev; the landing-page
// feed lists posts pulled from its API and links out to the posts there.
const BLOG_HOME = "https://blog.thetyster.dev";

function FallbackLink({ note }: { note: string }) {
  return (
    <p className="blog-fallback">
      {note}{" "}
      <a href={BLOG_HOME} target="_blank" rel="noreferrer noopener">
        Visit blog.thetyster.dev directly →
      </a>
    </p>
  );
}

function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Blog({ blogFeed }: { blogFeed: BlogFeedResult }) {
  if (blogFeed.ok === false) {
    const note =
      blogFeed.reason === "no_token"
        ? "Blog feed unavailable in this environment."
        : "Couldn't load posts right now.";
    return (
      <div className="blog">
        <FallbackLink note={note} />
      </div>
    );
  }

  const posts = blogFeed.pages;
  if (posts.length === 0) {
    return (
      <div className="blog">
        <FallbackLink note="No posts yet." />
      </div>
    );
  }

  return (
    <div className="blog">
      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.permalink} className="blog-post">
            <a href={post.permalink} target="_blank" rel="noreferrer noopener">
              <h3>{post.title}</h3>
            </a>
            {post.date ? (
              <time dateTime={post.date} className="blog-date">
                {formatDate(post.date)}
              </time>
            ) : null}
            {post.description ? (
              <p className="blog-description">{post.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="blog-more">
        <a href={BLOG_HOME} target="_blank" rel="noreferrer noopener">
          More on blog.thetyster.dev →
        </a>
      </p>
    </div>
  );
}



export default Blog;
