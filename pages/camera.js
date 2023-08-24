import { useState, useRef } from "react";

// camera 미완성 입니다. 접근하지 마세요.
const CameraCapture = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };
  // camera 미완성 입니다. 접근하지 마세요.
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoURL = canvas.toDataURL("image/png");
      console.log("Captured photo:", photoURL);
    }
  };
  // camera 미완성 입니다. 접근하지 마세요.
  return (
    <div>
      <h1>Camera Capture</h1>
      {stream ? (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={capturePhoto}>Capture</button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      ) : (
        <button onClick={startCamera}>Start Camera</button>
      )}
    </div>
  );
};

export default CameraCapture;
