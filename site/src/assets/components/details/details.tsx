import "./details.scss";

function Details({
  children,
  heading,
  ...props
}: {
  children: React.ReactNode;
  heading?: React.ReactNode;
  [key: string]: React.DetailsHTMLAttributes<HTMLDetailsElement> | React.ReactNode;
}) {
  return (
    <div className="details">
      {heading ? heading : ""}
      <details {...props}>
        <summary aria-label="Show or hide details" />
        {children}
      </details>
    </div>
  );
}

export default Details;
