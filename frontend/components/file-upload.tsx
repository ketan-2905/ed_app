"use client";

import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { uploadFiles } from "@/lib/api";
import { useUpload } from "@/context/UploadContext";
import { toast } from "react-toastify";

export function FileUpload({setIsUploading, setFileLength}:{setIsUploading: Dispatch<SetStateAction<boolean>>, setFileLength: Dispatch<SetStateAction<number>>}) {
  const { setUploadData, sessionId } = useUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      setFileLength(acceptedFiles.length)
      try {
        const response = await uploadFiles(acceptedFiles, sessionId || "");

        if (!response || !response.files || !response.session_id) {
          throw new Error("Invalid response from server");
        }

        const formattedFiles = response.files.map((file :any) => {
          const parts = file.name.split(".");
          const extension = parts.length > 1 ? parts.pop() || "" : "";
          const name = parts.join(".");

          return { name, extension };
        });
        console.log(formattedFiles, response.session_id);
        
        setUploadData(formattedFiles, response.session_id);
        toast.success(`${acceptedFiles.length} file(s) uploaded successfully`);
      } catch (error) {
        toast.error("Failed to upload files");
      } finally {
        setIsUploading(false);
      }
    },
    [setUploadData, sessionId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-8 text-center">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <p className="text-lg font-medium">
          {isDragActive ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-muted-foreground">Supports PDF, PPTX, and DOCX files</p>
      </div>
    </div>
  );
}
