import type { Metadata } from 'next';
import { getGeneral, getSchools } from '@/lib/content';
import StraitgatePrimaryForthrightPage from './StraitgatePrimaryForthrightPage';

export const metadata: Metadata = {
  title: 'Straitgate Nursery & Primary School Forthright',
  description:
    'Explore Straitgate Forthright Primary School — a Christ-centered nursery and primary school in Forthright Gardens, Magboro, Ogun State, where every child is a star waiting to shine.',
};

export default function StraitgatePrimaryForthright() {
  const schools = getSchools();
  const general = getGeneral();
  const school = schools.find((school) => school.initial === 'snps-magboro') ?? schools.find((school) => school.name.includes('Magboro'));
  const admissionLink = general.admission_links?.find((link) => link.name.toLowerCase().includes('forthright'));

  return <StraitgatePrimaryForthrightPage school={school} admissionLink={admissionLink} />;
}
