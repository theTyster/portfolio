import './pre.scss';
function Pre({ children }: { children: React.ReactNode }) {
  return (
    <div className="pre">
      <pre>{children}</pre>
    </div>
  );
}

export default Pre;
