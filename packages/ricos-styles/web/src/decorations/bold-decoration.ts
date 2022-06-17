import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';
import { EmptyDecoration } from './empty-decoration';
import type { TextDecoration } from '../models/decoration';

const DEFAULT_BOLD_WEIGHT = 700;

export class BoldDecoration implements TextDecoration {
  type = Decoration_Type.BOLD;

  private readonly customStyle: CustomTextualStyle;

  private constructor(customStyle: CustomTextualStyle) {
    this.customStyle = customStyle;
  }

  static of(decoration: Decoration) {
    if (decoration.type !== Decoration_Type.BOLD) {
      throw new TypeError(`invalid decoration initializer ${decoration}`);
    }

    return new BoldDecoration({ fontWeight: decoration.fontWeightValue || DEFAULT_BOLD_WEIGHT });
  }

  getDecoration(): Decoration {
    return {
      type: this.type,
      fontWeightValue: parseInt(this.customStyle.fontWeight as string, 10) || DEFAULT_BOLD_WEIGHT,
    };
  }

  static fromCustomStyle(customStyle: CustomTextualStyle): TextDecoration {
    return new BoldDecoration(customStyle);
  }

  fromCustomStyle(customStyle: CustomTextualStyle): TextDecoration {
    return BoldDecoration.fromCustomStyle(customStyle);
  }

  toCustomStyle(): CustomTextualStyle {
    return this.customStyle;
  }

  overrideWith(decoration: TextDecoration): TextDecoration {
    if (!(decoration instanceof BoldDecoration || decoration instanceof EmptyDecoration)) {
      throw new TypeError(`invalid merge decoration ${decoration}`);
    }
    const customStyle = { ...this.customStyle, ...decoration.toCustomStyle() };
    return new BoldDecoration(customStyle);
  }
}
