export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-1 ">
        {children}
      </div>
    </div>
  );
}