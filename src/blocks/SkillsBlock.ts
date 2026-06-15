/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    const skillsContainer = document.createElement("ul");

    Object.entries(this.d).forEach(([category, skills]) => {
      if (skills.length === 0) {
        return;
      }

      const categoryItem = document.createElement("li");

      categoryItem.innerHTML = `
        <p class="category-item">
          <span class="category">${category}:</span>
          ${skills.join(", ")}
        </p>
      `;

      skillsContainer.appendChild(categoryItem);
    });

    sec.appendChild(skillsContainer);

    return sec;
  }
}