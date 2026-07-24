import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectPage({ text }) {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [pointers, setPointers] = useState(new Map());
  const [pinchStartDistance, setPinchStartDistance] = useState(null);
  const [pinchStartZoom, setPinchStartZoom] = useState(1);

  if (!project) {
    return (
      <section className="page project-page">
        <div className="content">
          <p className="kicker">{text.projectNotFound}</p>
          <Link className="back-link" to="/#projects">
            ← {text.backToProjects}
          </Link>
        </div>
      </section>
    );
  }

  const visibleCount = 3;

  const visibleImages = project.gallery.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const nextImages = () => {
    if (currentIndex < project.gallery.length - visibleCount) {
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

  const changeZoom = (amount) => {
    setZoom((prev) => {
      const newZoom = Math.min(3, Math.max(0.5, prev + amount));

      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return newZoom;
    });
  };

  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    setPointers((prev) => {
      const next = new Map(prev);
      next.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
      });
      return next;
    });

    if (zoom > 1) {
      setIsDragging(true);

      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handlePointerMove = (e) => {
    setPointers((prev) => {
      const next = new Map(prev);

      if (next.has(e.pointerId)) {
        next.set(e.pointerId, {
          x: e.clientX,
          y: e.clientY,
        });
      }

      return next;
    });

    if (pointers.size === 2) {
      const pointerArray = Array.from(pointers.values());

      const distance = getDistance(pointerArray[0], pointerArray[1]);

      if (pinchStartDistance) {
        const scale = distance / pinchStartDistance;

        setZoom(Math.min(3, Math.max(1, pinchStartZoom * scale)));
      }

      return;
    }

    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handlePointerUp = (e) => {
    setPointers((prev) => {
      const next = new Map(prev);
      next.delete(e.pointerId);
      return next;
    });

    setIsDragging(false);
    setPinchStartDistance(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const amount = e.deltaY < 0 ? 0.1 : -0.1;

    changeZoom(amount);
  };

  return (
    <section className="page project-page">
      <div className="content">
        <header className="section-header">
          <p className="corner-paper left" aria-hidden="true">
            <img src="/projects/paper.png" alt="paper" />
          </p>

          <p className="corner-paper right" aria-hidden="true">
            <img src="/projects/paper.png" alt="paper" />
          </p>

          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </header>

        <Link className="back-link" to="/#projects">
          ← {text.backToProjects}
        </Link>

        <div className="project-gallery-wrapper">
          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={prevImages}
            disabled={currentIndex === 0}
            aria-label="Previous images"
          >
            ←
          </button>

          <div className="project-gallery">
            {visibleImages.map((src, index) => {
              const actualIndex = currentIndex + index;

              return (
                <button
                  className="gallery-image-button"
                  key={src + actualIndex}
                  onClick={() => setSelectedImage(actualIndex)}
                  aria-label={`Open image ${actualIndex + 1}`}
                >
                  <img src={src} alt={`${project.title} ${actualIndex + 1}`} />
                </button>
              );
            })}
          </div>

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImages}
            disabled={currentIndex >= project.gallery.length - visibleCount}
            aria-label="Next images"
          >
            →
          </button>
        </div>

        {selectedImage !== null && (
          <div
            className="image-lightbox"
            onClick={() => {
              setSelectedImage(null);
              setZoom(1);
            }}
          >
            <button
              className="lightbox-close"
              type="button"
              onClick={() => {
                setSelectedImage(null);
                setZoom(1);
              }}
            >
              ×
            </button>

            <button
              className="lightbox-arrow lightbox-arrow-left"
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setSelectedImage((prev) =>
                  prev === 0 ? project.gallery.length - 1 : prev - 1,
                );

                setZoom(1);
              }}
            >
              ←
            </button>

            <div
              className={`lightbox-image-container ${
                zoom > 1 ? "is-zoomed" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={handleWheel}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.gallery[selectedImage]}
                alt={`${project.title} ${selectedImage + 1}`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                }}
                draggable="false"
              />
            </div>

            <button
              className="lightbox-arrow lightbox-arrow-right"
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                setSelectedImage((prev) =>
                  prev === project.gallery.length - 1 ? 0 : prev + 1,
                );

                setZoom(1);
              }}
            >
              →
            </button>

            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => changeZoom(-0.25)}>
                −
              </button>

              <span>{Math.round(zoom * 100)}%</span>

              <button type="button" onClick={() => changeZoom(0.25)}>
                +
              </button>

              <button type="button" onClick={resetImageView}>
                Reset
              </button>
            </div>
          </div>
        )}

        <div className="project-detail-body">
          <h3>{text.aboutProject}</h3>
          <p>{project.longDescription}</p>

          <h3>{text.technologies}</h3>

          <div className="project-tech">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {project.notes && (
            <>
              <h3>{text.projectNotes}</h3>
              <p>{project.notes}</p>
            </>
          )}

          <div className="project-links">
            {project.github && (
              <a
                className="secondary-action"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                {text.sourceCode}
              </a>
            )}

            {project.url && (
              <a
                className="primary-action"
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
