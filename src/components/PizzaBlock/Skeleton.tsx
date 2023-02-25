import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="269" rx="9" ry="9" width="280" height="27" />
    <rect x="0" y="304" rx="9" ry="9" width="280" height="88" />
    <rect x="127" y="402" rx="20" ry="20" width="150" height="45" />
    <rect x="0" y="413" rx="9" ry="9" width="90" height="27" />
  </ContentLoader>
);
