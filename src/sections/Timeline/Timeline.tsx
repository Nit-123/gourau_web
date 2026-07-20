import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Timeline: React.FC = () => {
  return (
    <SectionWrapper id="timeline" className="bg-soft-white justify-center">
      <SectionTitle title="Timeline" subtitle="Screen 3" delay={0.1} />
    </SectionWrapper>
  );
};

export default Timeline;
