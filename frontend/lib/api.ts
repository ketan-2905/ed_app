import apiClient from "./axios";

interface QueryResponse {
    response: string;
}

// export const uploadFiles = async (
//   files: File[],
//   sessionId: string | undefined,
//   onProgress: (progress: number) => void // New callback for progress updates
// ) => {
//   const formData = new FormData();
//   files.forEach((file) => formData.append("files", file));

//   try {
//     const response = await apiClient.post("/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "X-Session-ID": sessionId || "",
//       },
//       onUploadProgress: (event) => {
//         if (event.total) {
//           const progress = Math.round((event.loaded / event.total) * 100);
//           onProgress(progress); // Update progress bar
//         }
//       },
//     });

//     if (!response.data || !response.data.files || !response.data.session_id) {
//       throw new Error("Invalid response format from server");
//     }

//     return {
//       files: response.data.files.map((file: any) => ({
//         id: file.id,
//         name: file.name,
//       })),
//       session_id: response.data.session_id,
//     };
//   } catch (error: any) {
//     console.error("File upload failed:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "File upload failed. Please try again.");
//   }
// };

export const uploadFiles = async (
  files: File[],
  sessionId: string | undefined
) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Session-ID": sessionId || "",
      },
    });

    if (!response.data || !response.data.files || !response.data.session_id) {
      throw new Error("Invalid response format from server");
    }

    return {
      files: response.data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
      })),
      session_id: response.data.session_id,
    };
  } catch (error: any) {
    console.error("File upload failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "File upload failed. Please try again.");
  }
};



  

export const queryChatbot = async (sessionId: string | undefined, query: string): Promise<string> => {
  if (!query.trim()) return "";

  try {
    const response = await apiClient.post("/query", { session_id: sessionId, query });

    if (!response.data || !response.data.response) {
      throw new Error("Invalid response format from server");
    }

    return response.data.response;
  } catch (error: any) {
    console.error("Chatbot query failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch chatbot response.");
  }
};

export const generateQuiz = async (
  sessionId: string | undefined,
  topic: string = "",
  difficulty: string = "medium",
  numQuestions: number = 10
): Promise<{ quiz_id: string; questions: any[] }> => {
  if (!sessionId) {
    throw new Error("Session ID is required.");
  }

  try {
    const response = await apiClient.post("/generate-quiz", {
      session_id: sessionId,
      topic,
      difficulty,
      numberOfQuestions: numQuestions,
    });

    if (!response.data || !response.data.quiz_id || !response.data.questions) {
      throw new Error("Invalid response format from server.");
    }

    return {
      quiz_id: response.data.quiz_id,
      questions: response.data.questions,
    };
  } catch (error: any) {
    console.error("Quiz generation failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to generate quiz.");
  }
};

export const processDocuments = async (sessionId: string): Promise<{
  status: string;
  session_id: string;
  message: string;
  consolidated_doc: string;
  tables_doc: string;
}> => {
  if (!sessionId) {
    throw new Error("Session ID is required.");
  }

  try {
    const response = await apiClient.post(`/api/process/${sessionId}`);

    if (!response.data || !response.data.status) {
      throw new Error("Invalid response format from server.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Document processing failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to process documents.");
  }
};

export const downloadFile = async (
  sessionId: string,
  fileType: "notes" | "tables"
): Promise<Blob> => {
  if (!sessionId) {
    throw new Error("Session ID is required.");
  }

  try {
    const response = await apiClient.get(`/api/download/${sessionId}/${fileType}`, {
      responseType: "blob", // Ensures the file is downloaded as a blob
    });

    return response.data;
  } catch (error: any) {
    console.error("File download failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to download file.");
  }
};

