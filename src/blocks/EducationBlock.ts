/**
 * Блок відображення освіти в резюме
 */

import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education[]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = "<h2>Education</h2>";

    this.d.forEach((edu) => {
      const educationItem = document.createElement("div");
      educationItem.className = "education-item";

      educationItem.innerHTML = `
        <p>
          ${edu.degree} ${edu.field},
          ${edu.institution}
          (${edu.graduation})
        </p>
      `;

      el.appendChild(educationItem);
    });

    return el;
  }
}