import { jsx } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import { c as cn } from './router-e7zdrxGz.mjs';

function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

export { Label as L };
//# sourceMappingURL=label-Btl29BJR.mjs.map
