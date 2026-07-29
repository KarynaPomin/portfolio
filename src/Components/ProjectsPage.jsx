import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { getProjectCover } from "../data/project-images";

import styles from "./ProjectsPage.module.css";
import generalStyles from "../App.module.css";

export default function ProjectsPage({ text, lang }) {
  return (
    <section
      className={generalStyles.page}
      id="projects"
      data-section="projects"
    >
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

          <h2>{text.projectsTitle}</h2>
          <p>{text.projectsSubtitle}</p>
        </header>

        <div className={styles.project_grid}>
          {projects.map((project) => {
            const title = project.title[lang] || project.title.en;
            const description =
              project.description[lang] || project.description.en;

            return (
              <Link
                className={styles.project_card}
                to={`/projects/${project.slug}`}
                key={project.slug}
              >
                <img
                  className={styles.project_image}
                  src={getProjectCover(project.slug)}
                  alt={title}
                  loading="lazy"
                />

                <div className={styles.project_body}>
                  <h3>{title}</h3>
                  <p>{description}</p>

                  <div className={styles.project_tech}>
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
