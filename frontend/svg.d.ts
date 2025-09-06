/* ---------- Declaração do uso do ReactComponent ---------- */

declare module "*.svg?react" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentPropsWithoutRef<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
