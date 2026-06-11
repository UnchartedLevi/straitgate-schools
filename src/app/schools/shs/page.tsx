import type { Metadata } from 'next';
import { getGeneral, getSchools } from '@/lib/content';
import StraitgateHighSchoolPage from './StraitgateHighSchoolPage';

export const metadata: Metadata = {
  title: 'Straitgate High School',
  description:
    'Explore Straitgate High School — a Christ-centered secondary school in Magodo, Lagos, delivering world-class education that empowers students to succeed in an ever-changing world.',
};

export default function StraitgateHighSchool() {
  const schools = getSchools();
  const general = getGeneral();
  const highSchool = schools.find((school) => school.initial === 'shs') ?? schools.find((school) => school.name.includes('High'));
  const admissionLink = general.admission_links?.find((link) => link.name.toLowerCase().includes('high'));

  return <StraitgateHighSchoolPage school={highSchool} admissionLink={admissionLink} />;
}
