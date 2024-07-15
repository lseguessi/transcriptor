import React, { useEffect, useState } from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const VideoPlayer = ({videoId, timeStart=0}: any) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoRead, setVideoRead] = useState<boolean>(false);
  

  useEffect(() => {
    const token = localStorage.getItem("google_access_token");
    if (token && videoRead == false) {
      fetch(`https://www.googleapis.com/drive/v3/files/${videoId}?alt=media`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('Failed to fetch video');
          }
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setVideoUrl(`${url}#t=${timeStart}`);
          setVideoRead(true);
        })
        .catch(error => {
          console.error('Error fetching video:', error);
          setVideoRead(true);
        });
    }
  }, [videoRead]);

  return (
    <VideoWrapper>
      {videoRead ? (
        <iframe
          src={videoUrl}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>Loading video...</p>
      )}
    </VideoWrapper>
  );
};

export default VideoPlayer;
