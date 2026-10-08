"use client";

import { pauseOtherVideos } from "@/utils/pauseOtherVideos";

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <video controls preload="metadata" onPlay={pauseOtherVideos}>
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      <h3 className="video-title">{video.title}</h3>
    </div>
  );
}

export default VideoCard;
