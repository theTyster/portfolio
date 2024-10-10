function Frontend() {
  return (
    <>
      <h3>Phase Four: Frontend</h3>
      <h4>Typescript & Next.JS</h4>
      <p>
        I chose to use Next.js for this project because of its support for
        TypeScript and its ability to generate static sites. Since Search Engine
        optimization was such a priority for this client, I wanted to be have an
        end product that was as SEO friendly as possible. Next.js has the most
        community support and is by far the most widely used static site
        generator. In an interest to learn a framework that could be used in a
        professional setting, I chose Next.js.
      </p>
      <img
        src="/static/img/typescript-and-next.png"
        alt="Typescript + Next.JS"
      />
      <p>
        Typescript was chosen for similar reasons as Next.js. I was only really
        aware of Typescript's existence and what it was on a surface level
        before starting this project. But, I knew I wanted something that would
        produce stable code, and I wanted an opportunity to get experience with
        a statically typed language. Typescript, once again being the most
        popular choice, was the reason I used it in this project.
      </p>
      <p>
        Having never used any of these tools before, I have to say that I was
        happy with how easily I was able to pick them up.
      </p>
      <h4>CMS</h4>
      <img src="/static/img/zoho-logo.png" alt="Zoho's Logo" />
      <p>
        One of the first things I did was to set up a CMS for the owner to use.
        I chose to use Zoho CRM for this because it was free and easy to set up.
        I also set up a system for the owner to receive emails when a new
        customer signed up on the site. This was done using Gmail and an SMTP
        server that I connected to the domain.
      </p>
      <h4>Business Email</h4>
      <p>
        Setting up a business email was not too difficult. I used Gmail and
        MailerSend, a free SMTP server that I connected to the domain. Then, I
        connected that business address and SMTP provider directly to the
        owner's Gmail account. This allowed the owner to receive and respond to
        emails from clients without needing a new inbox.
      </p>
      <p>
        Additionally, since we were using our own SMTP provider instead of
        routing them through Gmail's SMTP, the owner's primary Gmail email will
        not be visible in email headers and they have a much stronger
        deliverability rate.
      </p>
    </>
  );
}

export default Frontend;
