import VideoCard from "./VideoCard";

function VideoGrid({ videos }) {
  return (
    <section className="video-section ">
      <h2 className="home-video-title">Event & Party Videos</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default VideoGrid;
