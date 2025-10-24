import React, { useState } from "react";
import { CHARACTERS } from "../assets";
import "./PaymentOptions.css";

interface PaymentOption {
  id: string;
  character: string;
  avatar?: string; // emoji fallback
  avatarUrl?: string; // image path for circular avatar
  title: string;
  description: string;
  price: string;
  message: string;
  className: string;
}

interface PaymentOptionsProps {
  onSelectPayment: (option: PaymentOption) => void;
  onClose: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onSelectPayment,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(
    null
  );
  const [showMessage, setShowMessage] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: "agnivesh",
      character: "Agnivesh",
      avatar: "🧘‍♂️",
      avatarUrl: CHARACTERS.AGNIVESH_HUMAN,
      title: "Struggling Together",
      description: "If you're in a hard spot financially",
      price: "FREE",
  message: "Don't worry, we will get out of it together.",
      className: "payment-agnivesh",
    },
    {
      id: "elena",
      character: "Elena",
      avatar: "✨",
      avatarUrl: CHARACTERS.ELENA_BASE,
      title: "Rich & Fabulous",
      description: "If you feel abundant and generous",
      price: "Pay What You Want",
  message: "Your generosity supports our spiritual journey!",
      className: "payment-elena",
    },
    {
      id: "david",
      character: "David",
      avatar: "⚔️",
      avatarUrl: CHARACTERS.DAVID_BASE,
      title: "Tactical Choice",
      description: "Strategic and practical approach",
      price: "€2.00",
  message: "A wise tactical investment in your spiritual growth.",
      className: "payment-david",
    },
    {
      id: "cow",
      character: "Sacred Cow",
      avatar: "🐄",
      title: "Moo Choice",
      description: "Just here for the cow pictures",
      price: "FREE",
  message: "Moo!",
      className: "payment-cow",
    },
  ];

  const handleSelectOption = (option: PaymentOption) => {
    setSelectedOption(option);
    setShowMessage(true);

    // Show character message for 2 seconds, then proceed
    setTimeout(() => {
      onSelectPayment(option);
    }, 2000);
  };

  if (showMessage && selectedOption) {
    return (
      <div className="payment-overlay">
        <div className="payment-message-panel">
          <div className={`character-message ${selectedOption.className}`}>
            {selectedOption.avatarUrl ? (
              <img
                className="character-avatar-large-img"
                src={selectedOption.avatarUrl}
                alt={`${selectedOption.character} avatar`}
              />
            ) : (
              <div className="character-avatar">{selectedOption.avatar}</div>
            )}
            <h3>{selectedOption.character} says:</h3>
            <p className="character-quote">"{selectedOption.message}"</p>
            <div className="loading-spinner" aria-hidden></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-overlay">
      <div className="payment-panel">
        <div className="payment-header">
          <h2 className="neon-subtle">Choose Your Spiritual Path</h2>
          <p>Select the character you resonate with for your payment option</p>
          <p style={{ marginTop: 4, opacity: 0.85, fontSize: "0.95rem" }}>
            Tap the circular avatar to choose
          </p>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="payment-options-grid">
          {paymentOptions.map((option) => (
            <div key={option.id} className={`payment-option ${option.className}`}>
              <button
                className="avatar-circle-button"
                onClick={() => handleSelectOption(option)}
                aria-label={`Choose ${option.character}`}
                type="button"
              >
                {option.avatarUrl ? (
                  <img
                    className="avatar-circle-image"
                    src={option.avatarUrl}
                    alt={option.character}
                  />
                ) : (
                  <span className="avatar-circle-emoji" aria-hidden>
                    {option.avatar}
                  </span>
                )}
              </button>
              <h3>{option.title}</h3>
              <p className="option-description">{option.description}</p>
              <div className="price-tag">{option.price}</div>
              <div className="character-name">with {option.character}</div>
            </div>
          ))}
        </div>

        <div className="payment-footer">
          <p>All proceeds support the development of inclusive spiritual gaming</p>
          <p>Secure payment processing • Available worldwide</p>
        </div>
      </div>
    </div>
  );
};
