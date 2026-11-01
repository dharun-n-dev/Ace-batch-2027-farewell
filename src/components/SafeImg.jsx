import { useState } from 'react';

// Image with a loading fade-in and a clear placeholder when the file is missing or broken.
export default function SafeImg({ src, alt = '', className = '', label, ...rest }) {
  const [state, setState] = useState('loading');
  if (!src || state === 'error') {
    return (
      <div className={`missing ${className}`} role="img" aria-label={alt || 'Missing image'}>
        <span>Missing asset</span>
        {label && <code>{label}</code>}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} img-${state}`}
      onLoad={() => setState('ok')}
      onError={() => setState('error')}
      decoding="async"
      {...rest}
    />
  );
}
