import type { Metadata } from 'next';
import { getGeneral, getSchools } from '@/lib/content';
import StraitgatePrimaryMagodoPage from './StraitgatePrimaryMagodoPage';

export const metadata: Metadata = {
  title: 'Straitgate Primary School Magodo',
  description:
    'Explore Straitgate Primary School Magodo — a Christ-centered nursery and primary school in Magodo, Lagos, nurturing young minds with godly principles and a global perspective.',
};

export default function StraitgatePrimaryMagodo() {
  const schools = getSchools();
  const general = getGeneral();
  const school = schools.find((school) => school.initial === 'snps-magodo') ?? schools.find((school) => school.name.includes('Magodo'));
  const admissionLink = general.admission_links?.find((link) => link.name.toLowerCase().includes('magodo'));

  return <StraitgatePrimaryMagodoPage school={school} admissionLink={admissionLink} />;
}
