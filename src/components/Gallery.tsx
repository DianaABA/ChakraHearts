import React, { useState } from "react";
import "./Gallery.css";

export interface GalleryArtwork {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  category: "characters" | "scenes" | "concepts" | "special";
  unlocked: boolean;
  thumbnailSrc?: string;
}

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: GalleryArtwork[];
}

export const Gallery: React.FC<GalleryProps> = ({
  isOpen,
  onClose,
  artworks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryArtwork["category"] | "all"
  >("all");
  const [selectedArtwork, setSelectedArtwork] = useState<GalleryArtwork | null>(
    null
  );

  if (!isOpen) return null;

  const categories = [
    { key: "all" as const, label: "All" },
    { key: "characters" as const, label: "Characters" },
    { key: "scenes" as const, label: "Scenes" },
    { key: "concepts" as const, label: "Concepts" },
    { key: "special" as const, label: "Special" },
  ];

  const filteredArtworks = artworks.filter(
    (artwork) =>
      selectedCategory === "all" || artwork.category === selectedCategory
  );

  const unlockedArtworks = filteredArtworks.filter(
    (artwork) => artwork.unlocked
  );

  return (
    <div className="gallery-overlay">
      <div className="gallery-panel">
        {/* Header */}
        <div className="gallery-header">
          <h2 className="neon-subtle">Art Gallery</h2>
          <div className="gallery-stats">
            <span className="unlocked-count">
              {unlockedArtworks.length} / {filteredArtworks.length} Unlocked
            </span>
          </div>
          <button className="gallery-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Category Tabs */}
        <div className="gallery-categories">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`category-tab ${
                selectedCategory === category.key ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-content">
          <div className="gallery-grid">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className={`gallery-item ${
                  artwork.unlocked ? "unlocked" : "locked"
                }`}
                onClick={() => artwork.unlocked && setSelectedArtwork(artwork)}
              >
                {artwork.unlocked ? (
                  <>
                    <img
                      src={artwork.thumbnailSrc || artwork.imageSrc}
                      alt={artwork.title}
                      className="gallery-thumbnail"
                      loading="lazy"
                    />
                    <div className="gallery-item-overlay">
                      <h4 className="artwork-title">{artwork.title}</h4>
                      {artwork.description && (
                        <p className="artwork-description">
                          {artwork.description}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="locked-artwork">
                    <p className="locked-text">Locked</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredArtworks.length === 0 && (
            <div className="empty-gallery">
              <p>No artworks in this category yet.</p>
            </div>
          )}
        </div>

        {/* Full-size artwork viewer */}
        {selectedArtwork && (
          <div
            className="artwork-viewer"
            onClick={() => setSelectedArtwork(null)}
          >
            <div
              className="artwork-viewer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="artwork-viewer-header">
                <h3>{selectedArtwork.title}</h3>
                <button
                  className="artwork-close"
                  onClick={() => setSelectedArtwork(null)}
                >
                  ×
                </button>
              </div>
              <div className="artwork-image-container">
                <img
                  src={selectedArtwork.imageSrc}
                  alt={selectedArtwork.title}
                  className="full-artwork"
                />
              </div>
              {selectedArtwork.description && (
                <div className="artwork-details">
                  <p>{selectedArtwork.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
