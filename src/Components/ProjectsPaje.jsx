import { projects } from "../data/projects";

export default function ProjectsPage({ text }) {
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
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img
                className="project-image"
                src={project.image}
                alt={project.title}
              />

              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <a href={project.url} target="_blank" rel="noreferrer">
                  {text.viewProject}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
