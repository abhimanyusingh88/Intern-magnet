import { JobListPage } from '@/components/jobs/JobListPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Find Jobs | Intern Magnet',
    description: 'Explore thousands of job opportunities from top companies and Naukri.com.',
};

export default function JobsPage() {
    return <JobListPage />;
}
