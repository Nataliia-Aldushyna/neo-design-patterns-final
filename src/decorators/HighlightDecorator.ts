/**
 * Патерн Decorator (Декоратор)
 *
 * Клас для додавання виділення до блоків резюме.
 * Декорує об'єкти типу IBlock, додаючи їм нову функціональність
 * без зміни їх внутрішньої структури.
 */

import { IBlock } from "../blocks/BlockFactory";

export class HighlightDecorator implements IBlock {
  private wrapped: IBlock;

  /**
   * @param block Блок, який буде декоровано
   */
  
  constructor(block: IBlock) {
    this.wrapped = block;
  }

  render(): HTMLElement {
    const element = this.wrapped.render();
    element.classList.add('highlight');

    return element;
  }
}