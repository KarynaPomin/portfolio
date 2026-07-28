import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { getProjectCover } from "../data/project-images";

export default function ProjectsPage({ text, lang }) {
  return (
    <section className="page" id="projects" data-section="projects">
      <div className="content">
        <header className="section-header">
          <p className="corner-paper left" aria-hidden="true">
            <img src="/projects/paper.png" alt="paper" />
          </p>
          <p className="corner-paper right" aria-hidden="true">
            <img src="/projects/paper.png" alt="paper" />
          </p>

          <h2>{text.projectsTitle}</h2>
          <p>{text.projectsSubtitle}</p>
        </header>

        <div className="project-grid">
          {projects.map((project) => {
            const title = project.title[lang] || project.title.en;
            const description =
              project.description[lang] || project.description.en;

            return (
              <Link
                className="project-card"
                to={`/projects/${project.slug}`}
                key={project.slug}
              >
                <img
                  className="project-image"
                  src={getProjectCover(project.slug)}
                  alt={title}
                />

                <div className="project-body">
                  <h3>{title}</h3>
                  <p>{description}</p>

                  <div className="project-tech">
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
