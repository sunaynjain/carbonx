"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download, 
  RefreshCw,
  Image as ImageIcon,
  XCircle,
  FileWarning
} from "lucide-react";
import type { DocumentRecord } from "@/lib/db";

const CATEGORIES = [
  "Land-related documents",
  "Farmer identity documents",
  "Bank or payout information",
  "Farm photographs",
  "Field activity records",
  "Soil or laboratory reports",
  "Tree-planting evidence",
  "Other project-specific supporting documents"
];

export default function DocumentsWorkspace({ initialDocuments }: { initialDocuments: any[] }) {
  const [documents, setDocuments] = useState<any[]>(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        setSelectedFile(null);
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only PDF, JPEG, and PNG are allowed.");
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(20);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", selectedCategory);

    try {
      setUploadProgress(50);
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(80);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setDocuments([data.document, ...documents]);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during upload.");
    } finally {
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const missingCategories = CATEGORIES.filter(
    (cat) => !documents.some((doc) => doc.category === cat)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
      case 'Accepted for preliminary review':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending Review':
      case 'Pending review':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Needs Correction':
      case 'Needs correction':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'Rejected':
      case 'Expired':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
      case 'Accepted for preliminary review':
        return "bg-green-100 text-green-800 border-green-200";
      case 'Pending Review':
      case 'Pending review':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'Needs Correction':
      case 'Needs correction':
        return "bg-orange-100 text-orange-800 border-orange-200";
      case 'Rejected':
      case 'Expired':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-[#153D2E] font-serif">Document Validation Workspace</h1>
          <p className="text-gray-600 mt-1">Upload, review, and manage required project evidence.</p>
        </div>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md flex items-start gap-3">
        <FileWarning className="w-5 h-5 text-orange-500 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-orange-800">Development Mode Notice</h3>
          <p className="text-sm text-orange-700 mt-1">
            Files are currently being stored in temporary local storage (Base64). In a production environment, they would be securely persisted in a cloud storage bucket.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#153D2E] mb-4">Upload Document</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Category</label>
                <select 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#153D2E]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#153D2E] transition-colors bg-[#F6F3E9]/50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#153D2E] hover:text-[#0f2e22] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#153D2E]">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-700 flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <FileText className="w-4 h-4 text-[#153D2E]" />
                    <span className="truncate flex-1">{selectedFile.name}</span>
                    <button onClick={() => { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }} className="text-gray-500 hover:text-red-500">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button 
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#153D2E] hover:bg-[#0f2e22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#153D2E] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Submit Evidence"}
              </button>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className="bg-[#153D2E] h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#153D2E] mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Missing Documents
            </h2>
            {missingCategories.length === 0 ? (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> All required categories have at least one document.
              </p>
            ) : (
              <ul className="space-y-2">
                {missingCategories.map(cat => (
                  <li key={cat} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#153D2E]">Evidence History</h2>
              <span className="bg-[#F6F3E9] text-[#153D2E] px-3 py-1 rounded-full text-xs font-medium">
                {documents.length} Files
              </span>
            </div>
            
            {documents.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No documents uploaded</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by uploading your first piece of evidence.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {documents.map((doc) => (
                  <li key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#F6F3E9] rounded-lg">
                          {doc.fileType.startsWith('image/') ? (
                            <ImageIcon className="w-6 h-6 text-[#153D2E]" />
                          ) : (
                            <FileText className="w-6 h-6 text-[#153D2E]" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{doc.fileName}</h4>
                          <p className="text-xs text-gray-500 mt-1">{doc.category}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              {doc.status}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {doc.status === 'Needs Correction' && (
                            <div className="mt-3 text-sm bg-orange-50 p-3 rounded-md border border-orange-100 text-orange-800">
                              <span className="font-semibold">Reviewer Note:</span> The document requires attention. Please review and replace.
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <a 
                          href={doc.url} 
                          download={doc.fileName}
                          className="p-2 text-gray-400 hover:text-[#153D2E] transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button 
                          className="p-2 text-gray-400 hover:text-[#153D2E] transition-colors"
                          title="Replace"
                          onClick={() => {
                            setSelectedCategory(doc.category);
                            if (fileInputRef.current) fileInputRef.current.click();
                          }}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {doc.fileType.startsWith('image/') && doc.url.startsWith('data:image') && (
                      <div className="mt-4 ml-12">
                        <img src={doc.url} alt={doc.fileName} className="h-24 w-auto rounded border border-gray-200 object-cover" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
