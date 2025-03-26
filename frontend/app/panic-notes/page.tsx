// // "use client";

// // import { useState, useEffect, useCallback } from "react";
// // import { Download, Copy, FileText } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { toast } from "react-toastify";
// // import { processDocuments, downloadFile } from "@/lib/api";
// // import { useUpload } from "@/context/UploadContext";
// // import EmptyState from "@/components/shared/EmptyState";

// // export default function PanicNotesPage() {
// //   const [loading, setLoading] = useState(false);
// //   const [notes, setNotes] = useState<string | null>(null);
// //   const [tables, setTables] = useState<string | null>(null);

// //   const {sessionId} = useUpload()

// //   if (!sessionId) {
// //     return <EmptyState message="Solve doubts with the bot" />;
// //   }

// //   // Fetch processed documents
// //   useEffect(() => {
// //     const fetchDocuments = async () => {
// //       setLoading(true);
// //       try {
// //         const data = await processDocuments(sessionId);
// //         setNotes("Notes");
// //         setTables("Resources");
// //         toast.success(data.message)
// //       } catch (error) {
// //         console.error("Error fetching documents:", error);
// //         toast.error("Failed to load documents");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDocuments();
// //   }, [sessionId]);

// //   // Download function for notes/tables
// //   const handleDownload = async (fileType: "notes" | "tables") => {
// //     try {
// //       const blob = await downloadFile(sessionId, fileType);
// //       const url = URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `${fileType}.docx`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //       toast.success(`${fileType} downloaded`);
// //     } catch (error) {
// //       console.error("Download error:", error);
// //       toast.error(`Failed to download ${fileType}`);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto pt-6 p-8 space-y-8">
// //       <div className="text-center">
// //         <h1 className="text-4xl font-bold">Your Panic Notes</h1>
// //         <p className="text-muted-foreground">Quickly review & download structured notes</p>
// //       </div>

// //       {loading ? (
// //         <div className="text-center text-lg">Processing your documents...</div>
// //       ) : (
// //         <div className="space-y-6">
// //           {notes && (
// //             <div className="bg-card p-6 rounded-lg shadow-lg">
// //               <h2 className="text-xl font-semibold">Consolidated Notes</h2>
// //               <pre className="whitespace-pre-wrap text-sm">{notes}</pre>
// //               <div className="mt-4 flex gap-2 justify-end">
// //                 <Button variant="outline" size="sm" onClick={() => handleDownload("notes")}>
// //                   <Download className="w-4 h-4 mr-2" />
// //                   Download Notes
// //                 </Button>
// //               </div>
// //             </div>
// //           )}

// //           {tables && (
// //             <div className="bg-card p-6 rounded-lg shadow-lg">
// //               <h2 className="text-xl font-semibold">Tables</h2>
// //               <pre className="whitespace-pre-wrap text-sm">{tables}</pre>
// //               <div className="mt-4 flex gap-2 justify-end">
// //                 <Button variant="outline" size="sm" onClick={() => handleDownload("tables")}>
// //                   <Download className="w-4 h-4 mr-2" />
// //                   Download Resources
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { processDocuments, downloadFile } from "@/lib/api";
// import { useUpload } from "@/context/UploadContext";
// import { Card } from "@/components/ui/card";
// import PanicNotesLoader from "@/components/shared/PanicNotesLoader ";
// import EmptyState from "@/components/shared/EmptyState";

// export default function PanicNotesPage() {
//   const [loading, setLoading] = useState(true);
//   const [notes, setNotes] = useState<string | null>(null);
//   const [tables, setTables] = useState<string | null>(null);
//   const [downloadReady, setDownloadReady] = useState(false);

//   const { sessionId } = useUpload();

//   // Fetch processed documents
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       if (!sessionId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const data = await processDocuments(sessionId);

//         // Simulate processing time if needed
//         await new Promise((resolve) => setTimeout(resolve, 2000));

//         setNotes("Consolidated Notes Content"); // Replace with actual notes
//         setTables("Tables and Resources Content"); // Replace with actual tables

//         setDownloadReady(true);
//         toast.success(data.message);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//         toast.error("Failed to load documents");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, [sessionId]);

//   // Download function for notes/tables
//   const handleDownload = async (fileType: "notes" | "tables") => {
//     if (!sessionId || !downloadReady) return;

//     try {
//       const blob = await downloadFile(sessionId, fileType);
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${fileType}.docx`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       toast.success(`${fileType} downloaded`);
//     } catch (error) {
//       console.error("Download error:", error);
//       toast.error(`Failed to download ${fileType}`);
//     } finally {
//     }
//   };

//   // If no session, show empty state
//   if (!sessionId) {
//     return <EmptyState message="to generate a panic notes" />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto pt-6 p-8 space-y-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-foreground">
//             Your Panic Notes
//           </h1>
//           <p className="text-muted-foreground">
//             Quickly review & download structured notes
//           </p>
//         </div>
//         {loading ? (
//           <PanicNotesLoader />
//         ) : (
//           <div className="space-y-6">
//             {notes && (
//               <Card className="p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Consolidated Notes</h2>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleDownload("notes")}
//                     disabled={!downloadReady}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download Notes
//                   </Button>
//                 </div>
//                 <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
//                   {notes}
//                 </pre>
//               </Card>
//             )}

//             {tables && (
//               <Card className="p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Tables & Resources</h2>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleDownload("tables")}
//                     disabled={!downloadReady}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download Resources
//                   </Button>
//                 </div>
//                 <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
//                   {tables}
//                 </pre>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import { Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { processDocuments, downloadFile } from "@/lib/api";
// import { usePanicNotes } from "@/context/PanicNotesContext";
// import { Card } from "@/components/ui/card";
// import EmptyState from "@/components/shared/EmptyState";
// import { useUpload } from "@/context/UploadContext";
// import PanicNotesLoader from "@/components/shared/PanicNotesLoader ";

// export default function PanicNotesPage() {
//   const { 
//     notes, 
//     tables, 
//     loading, 
//     downloadReady, 
//     setNotes, 
//     setTables, 
//     setLoading, 
//     setDownloadReady 
//   } = usePanicNotes();

//   const {sessionId} = useUpload()

//   // Fetch processed documents
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       if (!sessionId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const data = await processDocuments(sessionId);

//         // Simulate processing time if needed
//         await new Promise((resolve) => setTimeout(resolve, 2000));

//         setNotes("Consolidated Notes Content"); // Replace with actual notes
//         setTables("Tables and Resources Content"); // Replace with actual tables

//         setDownloadReady(true);
//         toast.success(data.message);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//         toast.error("Failed to load documents");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, [sessionId, setNotes, setTables, setLoading, setDownloadReady]);

//   // Download function for notes/tables
//   const handleDownload = async (fileType: "notes" | "tables") => {
//     if (!sessionId || !downloadReady) return;

//     try {
//       const blob = await downloadFile(sessionId, fileType);
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${fileType}.docx`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       toast.success(`${fileType} downloaded`);
//     } catch (error) {
//       console.error("Download error:", error);
//       toast.error(`Failed to download ${fileType}`);
//     }
//   };

//   // If no session, show empty state
//   if (!sessionId) {
//     return <EmptyState message="to generate a panic notes" />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto pt-6 p-8 space-y-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-foreground">
//             Your Panic Notes
//           </h1>
//           <p className="text-muted-foreground">
//             Quickly review & download structured notes
//           </p>
//         </div>
//         {loading ? (
//           <PanicNotesLoader />
//         ) : (
//           <div className="space-y-6">
//             {notes && (
//               <Card className="p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Consolidated Notes</h2>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleDownload("notes")}
//                     disabled={!downloadReady}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download Notes
//                   </Button>
//                 </div>
//                 <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
//                   {notes}
//                 </pre>
//               </Card>
//             )}

//             {tables && (
//               <Card className="p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Tables & Resources</h2>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleDownload("tables")}
//                     disabled={!downloadReady}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download Resources
//                   </Button>
//                 </div>
//                 <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
//                   {tables}
//                 </pre>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { processDocuments, downloadFile } from "@/lib/api";
import { usePanicNotes } from "@/context/PanicNotesContext";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/shared/EmptyState";
import { useUpload } from "@/context/UploadContext";
import PanicNotesLoader from "@/components/shared/PanicNotesLoader ";

export default function PanicNotesPage() {
  const { 
    notes, 
    tables, 
    loading, 
    downloadReady, 
    setNotes, 
    setTables, 
    setLoading, 
    setDownloadReady 
  } = usePanicNotes();

  const { sessionId } = useUpload();

  // Fetch processed documents only if notes haven't been generated
  useEffect(() => {
    const fetchDocuments = async () => {
      // Don't fetch if there's no session or notes are already generated
      if (!sessionId || (notes && tables)) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await processDocuments(sessionId);

        // Simulate processing time if needed
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Only set notes and tables if they're not already set
        if (!notes) setNotes("Consolidated Notes Content"); // Replace with actual notes
        if (!tables) setTables("Tables and Resources Content"); // Replace with actual tables

        setDownloadReady(true);
        toast.success(data.message);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [
    sessionId, 
    notes, 
    tables, 
    setNotes, 
    setTables, 
    setLoading, 
    setDownloadReady
  ]);

  // Download function for notes/tables
  const handleDownload = async (fileType: "notes" | "tables") => {
    if (!sessionId || !downloadReady) return;

    try {
      const blob = await downloadFile(sessionId, fileType);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileType}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`${fileType} downloaded`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error(`Failed to download ${fileType}`);
    }
  };

  // If no session, show empty state
  if (!sessionId) {
    return <EmptyState message="to generate a panic notes" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto pt-6 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Your Panic Notes
          </h1>
          <p className="text-muted-foreground">
            Quickly review & download structured notes
          </p>
        </div>
        {loading ? (
          <PanicNotesLoader />
        ) : (
          <div className="space-y-6">
            {notes && (
              <Card className="p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Consolidated Notes</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload("notes")}
                    disabled={!downloadReady}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Notes
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                  {notes}
                </pre>
              </Card>
            )}

            {tables && (
              <Card className="p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Tables & Resources</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload("tables")}
                    disabled={!downloadReady}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                  {tables}
                </pre>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}