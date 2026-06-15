/**
 * Конкретна реалізація імпортера резюме.
 * Наслідується від AbstractImporter і реалізує абстрактні методи.
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory, BlockType } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    if (!this.raw || typeof this.raw !== "object") {
      throw new Error("Invalid resume data: JSON root must be an object.");
    }

    const data = this.raw as Partial<ResumeModel>;

    if (
      !data.header ||
      !data.summary ||
      !data.experience ||
      !data.education ||
      !data.skills
    ) {
      throw new Error(
        "Invalid resume data: required sections are missing."
      );
    }

    if (!data.header.fullName || !data.header.title || !data.header.contacts) {
      throw new Error("Invalid resume data: header is incomplete.");
    }

    if (!data.summary.text) {
      throw new Error("Invalid resume data: summary is missing.");
    }

    if (!Array.isArray(data.experience)) {
      throw new Error("Invalid resume data: experience must be an array.");
    }

    if (!Array.isArray(data.education)) {
      throw new Error("Invalid resume data: education must be an array.");
    }

    if (
      !Array.isArray(data.skills.core) ||
      !Array.isArray(data.skills.tools) ||
      !Array.isArray(data.skills.languages)
    ) {
      throw new Error("Invalid resume data: skills are incomplete.");
    }
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");

    if (!root) {
      throw new Error('Element with id "resume-content" was not found.');
    }

    root.innerHTML = "";

    const factory = new BlockFactory();

    const blockTypes: BlockType[] = [
      "header",
      "summary",
      "experience",
      "education",
      "skills",
    ];

    for (const type of blockTypes) {
      const block = factory.createBlock(type, model);
      root.appendChild(block.render());
    }
  }
}