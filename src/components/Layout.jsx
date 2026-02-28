export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 ">
        {children}
      </div>
    </div>
  );
}