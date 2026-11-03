import { useState } from 'react';
import Section from '../Section/Section';
import './MediaWall.css';

function MediaCard({ item }) {
  const [failed, setFailed] = useState(false);
  const showImage = item.image && !failed;

  return (
    <figure className="media-card">
      <div className="media-frame">
        {/* 没有图或图片加载失败时，显示标题 */}
        {!showImage && <span className="media-fallback">{item.title}</span>}
        {showImage && (
          <img
            src={item.image}
            alt={item.title}
            style={item.imageStyle}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {item.image && (
        <figcaption>
          <span className="media-title">{item.title}</span>
          {item.note && <span className="media-note">{item.note}</span>}
        </figcaption>
      )}
      {!item.image && item.note && (
        <figcaption>
          <span className="media-note">{item.note}</span>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 图片墙。shape 为 poster（竖版海报）或 cover（横版封面）。
 */
export default function MediaWall({ id, title, items, shape }) {
  return (
    <Section id={id} title={title}>
      <div className={`media-wall ${shape}`}>
        {items.map((item) => (
          <MediaCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}
