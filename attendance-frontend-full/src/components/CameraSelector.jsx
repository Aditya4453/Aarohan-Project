import React, { useEffect, useState, useRef } from 'react';

const CameraSelector = ({ onCameraSelect }) => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    // Request camera permission and list all devices
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(devices => {
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedCameraId(videoInputs[0].deviceId);
        }
      })
      .catch(error => {
        console.error('Error accessing cameras:', error);
      });
  }, []);

  const connectCamera = async () => {
    if (selectedCameraId && videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCameraId } }
        });
        videoRef.current.srcObject = stream;
        setIsConnected(true);
        if (onCameraSelect) {
          onCameraSelect(selectedCameraId, stream);
        }
      } catch (error) {
        console.error('Error connecting to camera:', error);
        alert('Failed to connect to camera');
      }
    }
  };

  const disconnectCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsConnected(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Camera Selection</h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Camera:
        </label>
        <select
          value={selectedCameraId}
          onChange={(e) => setSelectedCameraId(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isConnected}
        >
          <option value="">-- Select a camera --</option>
          {cameras.map(cam => (
            <option key={cam.deviceId} value={cam.deviceId}>
              {cam.label || `Camera ${cam.deviceId.substring(0, 8)}...`}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        {!isConnected ? (
          <button
            onClick={connectCamera}
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
            disabled={!selectedCameraId}
          >
            📹 Connect Camera
          </button>
        ) : (
          <button
            onClick={disconnectCamera}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
          >
            🔴 Disconnect Camera
          </button>
        )}
      </div>

      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover"
        />
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
            <div className="text-center text-white">
              <p className="text-lg font-semibold mb-2">Camera Preview</p>
              <p className="text-sm text-gray-300">Connect a camera to see preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraSelector;
