export function Steps({ ...props }) {
  return (
    <div
      className="[&>h3]:step steps mb-8 ml-4 border-l pl-8 border-border/10 [counter-reset:step]"
      {...props}
    />
  );
}
