function VideoGrid({ videos }) {
  return (
    <section className="video-section ">
      <h2 className="home-video-title">Event & Party Videos</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <video controls preload="metadata">
              <source src={video.videoUrl} type="video/mp4" />
            </video>
            <h3 className="video-title">{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideoGrid;
