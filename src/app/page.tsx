export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Meeting Room Designer</h1>
      <a href="/viewer" className="text-blue-600 hover:underline">
        Launch 3D Viewer
      </a>
    </main>
  );
}
