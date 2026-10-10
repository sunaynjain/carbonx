import { getDocuments } from '@/lib/db';
import DocumentsWorkspace from './DocumentsWorkspace';

export const metadata = {
  title: 'Document Validation Workspace | CarbonX',
  description: 'Upload, review, and manage required project evidence.',
};

export default async function DocumentsPage() {
  const documents = await getDocuments();
  
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#F6F3E9]/30">
      <DocumentsWorkspace initialDocuments={documents} />
    </div>
  );
}
