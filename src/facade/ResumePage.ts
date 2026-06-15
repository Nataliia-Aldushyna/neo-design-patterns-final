import { ResumeImporter } from "../importer/ResumeImporter";

/**
 * Фасад: єдина точка входу.
 */
export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    try {
      const jsonData = await this.fetchData(jsonPath);
      const importer = new ResumeImporter(jsonData);

      importer.import();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown initialization error";

      console.error(`Error initializing resume: ${message}`);
    }
  }

  private async fetchData(path: string): Promise<unknown> {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Error loading JSON: ${response.statusText} (${response.status})`
      );
    }

    return response.json();
  }
}