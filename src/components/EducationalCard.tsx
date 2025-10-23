import React from "react";
import "./EducationalCard.css";

interface EducationalCardProps {
  imageSrc: string;
  title: string;
  description?: string;
  className?: string;
}

export const EducationalCard: React.FC<EducationalCardProps> = ({
  imageSrc,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`educational-card ${className}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-image-container">
        <img src={imageSrc} alt={title} className="card-image" loading="lazy" />
      </div>

      {description && (
        <div className="card-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default EducationalCard;
