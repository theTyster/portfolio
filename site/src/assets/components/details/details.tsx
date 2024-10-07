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
        <summary>{""}</summary>
        {children}
      </details>
    </div>
  );
}

export default Details;
