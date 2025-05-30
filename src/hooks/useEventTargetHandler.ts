import React from "react";

export const useEventTargetHandler = (handler: (value: any) => void) => {
  return React.useCallback((e) => handler(e.target.value), [handler]);
};
