import React from "react";
import mp4Src from "../media/chart-bg.mp4";
import webmSrc from "../media/chart-bg.webm";
import posterSrc from "../media/chart-bg.jpg";

const BackgroundVideo = () => {
  return (
    <video
      playsInline
      autoPlay="autoplay"
      muted
      loop="loop"
      poster={posterSrc}
      id="bgvid"
    >
      <source src={mp4Src} type="video/mp4" />
      <source src={webmSrc} type="video/webm" />
    </video>
  );
};

export default BackgroundVideo;
