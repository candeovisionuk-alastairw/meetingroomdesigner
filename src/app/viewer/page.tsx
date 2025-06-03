import RoomForm from '@/components/RoomForm';
import RoomCanvasWrapper from '@/components/RoomCanvasWrapper';

export default function ViewerPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 3D Canvas - 70% width */}
      <div className="w-[70%] h-full bg-black flex items-center justify-center">
        <RoomCanvasWrapper />
      </div>

      {/* Config panel - 30% width */}
      <div className="w-[30%] h-full bg-white p-6 overflow-y-auto border-l border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Configure Your Room</h2>
        <RoomForm />
      </div>
    </div>
  );
}
