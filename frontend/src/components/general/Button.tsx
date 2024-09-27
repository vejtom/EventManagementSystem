import { NavLink } from 'react-router-dom';
import { HeroIcon } from '../../types/icons.ts';

interface ButtonProps {
    type: 'primary' | 'secondary';
    label: string;
    to: string;
    icon?: HeroIcon | undefined;
}

export const Button = ({ icon: Icon, type, label, to }: ButtonProps) => {
  const baseButtonStyles =
        'px-4 py-3 rounded-md inline-flex space-x-2 text-sm font-medium';

  const primaryStyles =
        'bg-primary hover:bg-primary-hover text-white shadow-md focus:ring-2 focus:ring-primary-light';
  const secondaryStyles =
        'bg-secondary hover:bg-secondary-hover text-white shadow focus:ring-2 focus:ring-secondary-light';

  const buttonStyles = type === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <NavLink className={`${baseButtonStyles} ${buttonStyles}`} to={`${to}`}>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
    </NavLink>
  );
};
