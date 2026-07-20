import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = ""
}) => {
  return (
    <section
      id={id}
      className={`w-full flex flex-col justify-center items-center relative py-16 px-6 md:px-12 ${className}`}
    >
      {children}
    </section>
  );
};
