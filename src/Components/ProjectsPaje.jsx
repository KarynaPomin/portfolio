const projects = [
  { titleKey: "projectOne", tech: "Next.js", previewClass: "preview-shop", url: "#" },
  { titleKey: "projectTwo", tech: "React", previewClass: "preview-portfolio", url: "#" },
  { titleKey: "projectThree", tech: "PHP", previewClass: "preview-business", url: "#" },
  { titleKey: "projectFour", tech: "TypeScript", previewClass: "preview-blog", url: "#" },
  { titleKey: "projectFive", tech: "JavaScript", previewClass: "preview-app", url: "#" },
  { titleKey: "projectSix", tech: "MySQL", previewClass: "preview-food", url: "#" }
];

export default function ProjectsPage({ text }) {
  return (
    <section className="page" id="projects" data-section="projects">
      <div className="content">
        <header className="section-header">
          <h2>{text.projectsTitle}</h2>
          <p>{text.projectsSubtitle}</p>
        </header>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.titleKey}>
              <div className={`project-preview ${project.previewClass}`} />
              <div className="project-body">
                <h3>{text[project.titleKey]}</h3>
                <span>{project.tech}</span>
                <a href={project.url}>{text.viewProject}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
