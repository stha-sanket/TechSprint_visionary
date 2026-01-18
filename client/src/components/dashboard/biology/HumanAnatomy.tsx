import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BIOLOGY_CHAPTERS } from "./mockData";

// Component to load and display the GLTF model
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const HumanAnatomy = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (
      chapterId &&
      MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS]
    ) {
      setData(
        MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS],
      );
    }
  }, [chapterId]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading or Chapter not found...</p>
        <button
          onClick={() => navigate("/dashboard/biology")}
          className="ml-4 underline text-blue-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center z-10 bg-gray-900/80 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">{data.name}</h1>
          <p className="text-gray-400 text-sm">
            {data.description.description}
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/biology")}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
        >
          Back to Biology
        </button>
      </header>

      <div className="flex-1 relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Suspense fallback={null}>
            {data.threeDModels.length > 0 ? (
              <Model url={data.threeDModels[0]} />
            ) : (
              <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="mediumpurple" />
              </mesh>
            )}
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-xl backdrop-blur-sm max-w-xs">
          <h3 className="font-bold text-lg mb-2">Controls</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Left Click + Drag to Rotate</li>
            <li>• Right Click + Drag to Pan</li>
            <li>• Scroll to Zoom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HumanAnatomy;
