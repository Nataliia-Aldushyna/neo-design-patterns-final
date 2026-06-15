/**
 * Патерн Composite (Компоновщик)
 *
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */

import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private d: Experience[]) {}

  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    this.d.forEach((exp) => {
      const experienceItem = document.createElement("div");
      experienceItem.className = "experience-item";

      experienceItem.innerHTML = `
        <p>
          <span class="position">${exp.position}</span> at
          <span class="company">${exp.company}</span>
          (${exp.start} - ${exp.end})
        </p>
      `;

      const projectsContainer = document.createElement("ul");
      projectsContainer.className = "projects-list";

      exp.projects.forEach((projectData) => {
        let projectBlock: IBlock = new ProjectBlock(projectData);

        if (projectData.isRecent) {
          projectBlock = new HighlightDecorator(projectBlock);
        }

        projectsContainer.appendChild(projectBlock.render());
      });

      experienceItem.appendChild(projectsContainer);
      container.appendChild(experienceItem);
    });

    return container;
  }
}