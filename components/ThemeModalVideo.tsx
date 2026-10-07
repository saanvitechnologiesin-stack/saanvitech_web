"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const ThemeModalVideo = ({
  cls,
  image,
  video,
}: {
  cls?: string;
  image?: string;
  video?: string;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playBtnRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLSpanElement | null>(null);

  const open = (): void => {
    modalRef.current?.classList.add("active");
    videoRef.current?.play();
  };

  const close = (): void => {
    modalRef.current?.classList.remove("active");

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const playBtn = playBtnRef.current;
    const closeBtn = closeBtnRef.current;
    const modal = modalRef.current;

    if (!playBtn || !closeBtn || !modal) return;

    const handleBackdropClick = (e: MouseEvent): void => {
      if (e.target === modal) close();
    };

    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
    };

    playBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", handleBackdropClick);
    window.addEventListener("keyup", handleEsc);

    return () => {
      playBtn.removeEventListener("click", open);
      closeBtn.removeEventListener("click", close);
      modal.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("keyup", handleEsc);
    };
  }, []);

  return (
    <modal-video className={`video-wrap ${cls}`}>
      <div
        className="image radius18"
        data-aos="zoom-in"
      >
        {image && (
          <Image
            src={image}
            alt="modal poster"
            width={1000}
            height={929}
            loading="lazy"
          />
        )}

        <div className="content-absolute">
          <div className="flex-banner height-inherit flex items-center justify-center">
            <div className="content-box">
              <div
                className="button button--secondary open-video"
                ref={playBtnRef}
              >
                <svg
                  className="icon-24"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.858 5.1281C11.5377 5.51041 11.5377 6.48895 10.858 6.87125L2.04588 11.8281C1.37927 12.203 0.555618 11.7213 0.555618 10.9565V1.04285C0.555618 0.278027 1.37928 -0.203685 2.04588 0.171279L10.858 5.1281Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-modal" ref={modalRef}>
        <div className="video-modal-inner">
          <span className="close" ref={closeBtnRef}>
            <svg
              className="icon-18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </span>
          <video
            ref={videoRef}
            className="video-frame"
            width="1280"
            height="720"
            controls
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </modal-video>
  );
};

export default ThemeModalVideo;
