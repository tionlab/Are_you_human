import { useState, useRef } from 'react';

const CameraCapture = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoURL = canvas.toDataURL('image/png');
      // 이제 photoURL을 사용하여 필요한 작업을 수행할 수 있습니다.
      console.log('Captured photo:', photoURL);
    }
  };

  return (
    <div>
      <h1>Camera Capture</h1>
      {stream ? (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={capturePhoto}>Capture</button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      ) : (
        <button onClick={startCamera}>Start Camera</button>
      )}
    </div>
  );
};

export default CameraCapture;
