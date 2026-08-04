function LoadingSpinner({ fullScreen = false }) {
  return (
    <div className={`loading-spinner ${fullScreen ? 'loading-spinner--fullscreen' : ''}`}>
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
