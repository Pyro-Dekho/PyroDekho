// When a video starts playing, pause every other video in the same grid
export const pauseOtherVideos = (e) => {
  const current = e.currentTarget;
  const grid = current.closest(".video-grid");

  grid?.querySelectorAll("video").forEach((video) => {
    if (video !== current) video.pause();
  });
};
