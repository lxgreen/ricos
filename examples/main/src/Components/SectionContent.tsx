import type { ReactNode } from 'react';
import React, { Suspense } from 'react';

const defaultFallback = <div className="placeholder">Loading...</div>;

const SectionContent = React.memo<{
  isLoadedLazily?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}>(({ children, isLoadedLazily = true, fallback = defaultFallback }) => (
  <div className="content">
    {isLoadedLazily ? <Suspense fallback={fallback}>{children}</Suspense> : children}
  </div>
));

export default SectionContent;
