"use client";

import { useState } from "react";

export default function Works() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    "/media/video1.mp4",
    "/media/video2.mp4",
    "/media/video3.mp4",
    "/media/video4.mp4",
  ];

  return (
    <main
      style={{
        padding: "120px 40px",
        background: "#0a0a0a",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontFamily: "var(--syne)",
          marginBottom: "80px",
        }}
      >
        SELECTED WORK
      </h1>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          justifyItems: "center",
        }}
      >
        {videos.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedVideo(src)}
            style={{
              width: "100%",
              maxWidth: "300px",
              aspectRatio: "9 / 16",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              borderRadius: "12px",
              background: "#111",
            }}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "0.4s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
        ))}
      </div>

      {/* FULLSCREEN VIEW */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "40px",
          }}
        >
          <video
            src={selectedVideo}
            controls
            autoPlay
            style={{
              maxHeight: "90vh",
              aspectRatio: "9 / 16",
              borderRadius: "16px",
            }}
          />
        </div>
      )}
    </main>
  );
}