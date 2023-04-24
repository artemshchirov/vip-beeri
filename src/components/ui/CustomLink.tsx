import React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const CustomLink = ({ href, children, className, activeClassName }: CustomLinkProps): JSX.Element => {
  if (href.startsWith('http')) {
    return (
      <>
        <a className={className} href={href} rel='noreferrer' target='_blank'>
          {children}
        </a>
      </>
    );
  }

  if (href.startsWith('#')) {
    return (
      <>
        <a className={className} href={href}>
          {children}
        </a>
      </>
    );
  }

  if (activeClassName) {
    return (
      <>
        <NavLink className={({ isActive }) => `${className} ${isActive ? activeClassName : ''}`} to={href}>
          {children}
        </NavLink>
      </>
    );
  }

  return (
    <>
      <Link className={className} to={href}>
        {children}
      </Link>
    </>
  );
};

export default CustomLink;
