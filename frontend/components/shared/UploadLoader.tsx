// "use client";

// import { Skeleton } from "@/components/ui/skeleton";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// const FileListSkeleton = () => {
//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>File Name</TableHead>
//             <TableHead>Extension</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {/* Show 3 skeleton rows by default */}
//           {[...Array(3)].map((_, i) => (
//             <TableRow key={i}>
//               <TableCell className="font-medium">
//                 <div className="flex items-center gap-2">
//                   <Skeleton className="w-4 h-4" />
//                   <Skeleton className="h-4 w-48" />
//                 </div>
//               </TableCell>
//               <TableCell>
//                 <Skeleton className="h-4 w-12" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// export default FileListSkeleton;


"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FileListSkeleton = ({fileLength}:{fileLength:number}) => {
  return (
  <>
    {/* Show 3 skeleton rows by default */}
    {[...Array(fileLength)].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
            </TableRow>
          ))}
  </>
  )
}

export default FileListSkeleton;