/// <reference types="vite/client" />

import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          src?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "camera-controls"?: boolean;
          autoplay?: boolean;
          "shadow-intensity"?: string;
          exposure?: string;
          "interaction-prompt"?: string;
          alt?: string;
          scale?: string;
          "ar-scale"?: string;
          "ar-placement"?: string;
          "touch-action"?: string;
          loading?: string;
          reveal?: string;
          "auto-rotate"?: boolean;
          "auto-rotate-delay"?: string;
        },
        HTMLElement
      >;
      "a-scene": any;
      "a-assets": any;
      "a-asset-item": any;
      "a-entity": any;
      "a-camera": any;
      "a-cursor": any;
      "a-ring": any;
      "a-text": any;
      "a-plane": any;
      "a-cylinder": any;
      "a-gltf-model": any;
    }
  }
}
