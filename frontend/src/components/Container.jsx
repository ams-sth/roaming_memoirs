export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto px-[0.1rem] w-full ${className}`.trim()}>
      {children}
    </div>
  );
};
