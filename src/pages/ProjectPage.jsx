import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { getProjectGallery } from "../data/project-images";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./ProjectPage.module.css";
import generalStyles from "../App.module.css";

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  const width = window.innerWidth;
  if (width <= 590) return 1;
  if (width <= 860) return 2;
  return 3;
};

export default function ProjectPage({ text, lang }) {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imgNaturalRef = useRef({ width: 0, height: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  const pointersRef = useRef(new Map());
  const pinchRef = useRef({ distance: null, zoom: 1 });
  const lastTapRef = useRef(0);

  const gallery = project ? getProjectGallery(project.slug) : [];

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(0, gallery.length - visibleCount)),
    );
  }, [visibleCount, gallery.length]);

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowLeft") {
        setSelectedImage((prev) =>
          prev === 0 ? gallery.length - 1 : prev - 1,
        );
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) =>
          prev === gallery.length - 1 ? 0 : prev + 1,
        );
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, gallery.length]);

  if (!project) {
    return (
      <section className={generalStyles.page}>
        <div className={generalStyles.content}>
          <p className={generalStyles.kicker}>{text.projectNotFound}</p>
          <Link className={styles.back_link} to="/#projects">
            <ArrowBackIcon className={styles.back_link_icon} />{" "}
            {text.backToProjects}
          </Link>
        </div>
      </section>
    );
  }

  const title = project.title[lang] || project.title.en;
  const description = project.description[lang] || project.description.en;
  const longDescription =
    project.longDescription[lang] || project.longDescription.en;
  const notes = project.notes && (project.notes[lang] || project.notes.en);

  const visibleImages = gallery.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const nextImages = () => {
    if (currentIndex < gallery.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevImages = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetImageView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    resetImageView();
  };

  const showPrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    resetImageView();
  };

  const showNextImage = () => {
    setSelectedImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    resetImageView();
  };

  const changeZoom = (amount) => {
    setZoom((prev) => {
      const newZoom = Math.min(3, Math.max(1, prev + amount));
      setPosition((prevPos) =>
        newZoom === 1 ? { x: 0, y: 0 } : clampPosition(prevPos, newZoom),
      );
      return newZoom;
    });
  };

  const getContainSize = () => {
    const container = containerRef.current;
    const nat = imgNaturalRef.current;
    if (!container || !nat.width || !nat.height) return null;

    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const fitScale = Math.min(cw / nat.width, ch / nat.height);

    return {
      width: nat.width * fitScale,
      height: nat.height * fitScale,
      cw,
      ch,
    };
  };

  const clampPosition = (pos, z) => {
    const base = getContainSize();
    if (!base) return { x: 0, y: 0 };

    const scaledW = base.width * z;
    const scaledH = base.height * z;

    const maxX = Math.max(0, (scaledW - base.cw) / 2);
    const maxY = Math.max(0, (scaledH - base.ch) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, pos.x)),
      y: Math.min(maxY, Math.max(-maxY, pos.y)),
    };
  };

  const getDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      pinchRef.current.distance = getDistance(pts[0], pts[1]);
      pinchRef.current.zoom = zoom;
      setIsDragging(false);
    } else if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handlePointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const distance = getDistance(pts[0], pts[1]);

      if (pinchRef.current.distance) {
        const scale = distance / pinchRef.current.distance;
        const newZoom = Math.min(3, Math.max(1, pinchRef.current.zoom * scale));
        setZoom(newZoom);
        setPosition((prev) =>
          newZoom === 1 ? { x: 0, y: 0 } : clampPosition(prev, newZoom),
        );
      }
      return;
    }

    if (isDragging && zoom > 1) {
      const next = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      setPosition(clampPosition(next, zoom));
    }
  };

  const handlePointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) {
      pinchRef.current.distance = null;
    }
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    changeZoom(e.deltaY < 0 ? 0.1 : -0.1);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const isDoubleTap = now - lastTapRef.current < 300;
    lastTapRef.current = now;
    if (!isDoubleTap) return;

    if (zoom > 1) {
      resetImageView();
    } else {
      setZoom(2);
      setPosition((prev) => clampPosition(prev, 2));
    }
  };

  return (
    <section className={generalStyles.page}>
      <div className={generalStyles.content}>
        <header className={generalStyles.section_header}>
          <p
            className={`${generalStyles.corner_paper} ${generalStyles.left}`}
            aria-hidden="true"
          >
            <img src="/projects/paper.png" alt="paper" loading="lazy" />
          </p>

          <p
            className={`${generalStyles.corner_paper} ${generalStyles.right}`}
            aria-hidden="true"
          >
            <img src="/projects/paper.png" alt="paper" loading="lazy" />
          </p>

          <h2>{title}</h2>
          <p>{description}</p>
        </header>

        <Link className={styles.back_link} to="/#projects">
          <ArrowBackIcon className={styles.back_link_icon} />{" "}
          {text.backToProjects}
        </Link>

        <div className={styles.project_gallery_wrapper}>
          <button
            className={styles.gallery_arrow}
            onClick={prevImages}
            disabled={currentIndex === 0}
            aria-label="Previous images"
          >
            <ArrowLeftIcon />
          </button>

          <div className={styles.project_gallery}>
            {visibleImages.map((src, index) => {
              const actualIndex = currentIndex + index;

              return (
                <button
                  className={styles.gallery_image_button}
                  key={src + actualIndex}
                  onClick={() => setSelectedImage(actualIndex)}
                  aria-label={`Open image ${actualIndex + 1}`}
                >
                  <img
                    src={src}
                    alt={`${title} ${actualIndex + 1}`}
                    loading="lazy"
                  />
                  <span className={styles.gallery_image_number}>
                    {actualIndex + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className={styles.gallery_arrow}
            onClick={nextImages}
            disabled={currentIndex >= gallery.length - visibleCount}
            aria-label="Next images"
          >
            <ArrowRightIcon />
          </button>
        </div>

        {selectedImage !== null && (
          <div className={styles.image_lightbox} onClick={closeLightbox}>
            <button
              className={styles.lightbox_close}
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            <span className={styles.lightbox_counter}>
              {selectedImage + 1} / {gallery.length}
            </span>

            <button
              className={`${styles.lightbox_arrow} ${styles.lightbox_arrow_left}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              aria-label="Previous image"
            >
              <ArrowLeftIcon />
            </button>

            <div
              className={`${styles.lightbox_image_container} ${
                zoom > 1 ? styles.is_zoomed : ""
              }`}
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={handleWheel}
              onClick={(e) => {
                e.stopPropagation();
                handleDoubleTap();
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (zoom > 1) {
                  resetImageView();
                } else {
                  setZoom(2);
                  setPosition((prev) => clampPosition(prev, 2));
                }
              }}
            >
              <img
                src={gallery[selectedImage]}
                alt={`${title} ${selectedImage + 1}`}
                onLoad={(e) => {
                  imgNaturalRef.current = {
                    width: e.target.naturalWidth,
                    height: e.target.naturalHeight,
                  };
                }}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                }}
                draggable="false"
                loading="lazy"
              />
            </div>

            <button
              className={`${styles.lightbox_arrow} ${styles.lightbox_arrow_right}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              aria-label="Next image"
            >
              <ArrowRightIcon />
            </button>

            <div
              className={styles.zoom_controls}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => changeZoom(-0.25)}>
                <RemoveIcon />
              </button>

              <span>{Math.round(zoom * 100)}%</span>

              <button type="button" onClick={() => changeZoom(0.25)}>
                <AddIcon />
              </button>

              <button type="button" onClick={resetImageView}>
                Reset
              </button>
            </div>
          </div>
        )}

        <div className={styles.project_detail_body}>
          <h3>{text.aboutProject}</h3>
          <p>{longDescription}</p>

          <h3>{text.technologies}</h3>

          <div className={styles.project_tech}>
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {notes && (
            <>
              <h3>{text.projectNotes}</h3>
              <p>{notes}</p>
            </>
          )}

          <div className={styles.project_links}>
            {project.github && (
              <a
                className={generalStyles.secondary_action}
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                {text.sourceCode}
              </a>
            )}

            {project.url && (
              <a
                className={generalStyles.primary_action}
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                {text.liveDemo}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
