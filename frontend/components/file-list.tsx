"use client";

import { FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUpload } from "@/context/UploadContext";
import UploadLoader from "./shared/UploadLoader";

export function FileList({isUploading, fileLength}:{isUploading : boolean, fileLength: number}) {
  const { uploadedFiles } = useUpload();


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Extension</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploadedFiles.length > 0 ? (
            <>
            {uploadedFiles.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {file.name}
                </TableCell>
                <TableCell>{file.extension}</TableCell>
              </TableRow>
            ))}
            {isUploading ? (<UploadLoader fileLength={fileLength}/>):null}
            </>
            
          ) : isUploading ? <UploadLoader fileLength={fileLength}/> :(
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                No files uploaded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
