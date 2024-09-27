import { NavLink } from 'react-router-dom';
import { HeroIcon } from '../../types/icons.ts';

interface ButtonProps {
    type: 'primary' | 'secondary';
    label: string;
    to?: string;
    icon?: HeroIcon | undefined;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    buttonType?: 'button' | 'submit'; // form submission
}

export const Button = ({
  icon: Icon,
  type,
  label,
  to,
  onClick,
  size = 'small',
  buttonType = 'button'
}: ButtonProps) => {
  const sizeClasses = {
    small: 'px-2 py-1',
    medium: 'px-4 py-2',
    large: 'px-12 py-3'
  };

  const baseButtonStyles = `rounded-md inline-flex space-x-2 text-sm font-medium ${sizeClasses[size]}`;

  const primaryStyles =
        'bg-primary hover:bg-primary-hover text-white shadow-md focus:ring-2 focus:ring-primary-light';
  const secondaryStyles =
        'bg-secondary hover:bg-secondary-hover text-white shadow focus:ring-2 focus:ring-secondary-light';

  const buttonStyles = type === 'primary' ? primaryStyles : secondaryStyles;

  // Handle buttons with onClick and buttonType (either 'button' or 'submit')
  if (onClick || buttonType === 'submit') {
    return (
      <button
        type={buttonType}
        className={`${baseButtonStyles} ${buttonStyles}`}
        onClick={onClick}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </button>
    );
  }

  // If 'to' is provided, render as a NavLink
  if (to) {
    return (
      <NavLink className={`${baseButtonStyles} ${buttonStyles}`} to={to}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </NavLink>
    );
  }

  return null; // Fallback in case no action is specified
};
