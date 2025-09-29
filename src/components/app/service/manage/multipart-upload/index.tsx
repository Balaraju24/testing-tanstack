import { uploadDocumentAPI } from "@/http/services/fileUpload";
import {
  abortUploadingAPI,
  fileUploadAPI,
  getPresignedUrlsForFileAPI,
  mergeAllChunksAPI,
  resumeUploadAPI,
  startUploadMultipartFileAPI,
} from "@/http/services/multipart";
import {
  FileError,
  FileFormData,
  FilePreview,
  FileProgress,
  IUseFileUploadHook,
} from "@/lib/interfaces/files";
import { calculateChunks } from "@/utils/helpers/files";
import { useMutation } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadFiles from "./UploadFiles";

const MultiPartUploadComponent = ({
  showFileUpload,
  setShowFileUpload,
  from,
  onUploadSuccess,
}: IUseFileUploadHook) => {
  const { service_id } = useParams({ strict: false });

  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [abortedFiles, setAbortedFiles] = useState<Set<number>>(new Set());
  const [fileProgress, setFileProgress] = useState<FileProgress>({});
  const [previewImages, setPreviewImages] = useState<FilePreview[]>([]);
  const [fileErrors, setFileErrors] = useState<FileError[]>([]);
  const [fileFormData, setFileFormData] = useState<FileFormData>({
    chunkSize: "",
    unit: "MB",
    totalChunksParts: "",
    chunkSizeInBytes: 0,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [uploadFileDetails, setUploadFileDetails] = useState<any>([]);
  const [presignedUrlsMap, setPresignedUrlsMap] = useState<{
    [index: number]: string[];
  }>({});
  const [etagsMap, setEtagsMap] = useState<{ [index: number]: string[] }>({});
  const [fileTitles, setFileTitles] = useState<string[]>(
    Array(multipleFiles.length).fill("")
  );
  const [startUploading, setStartUploading] = useState(false);
  const search = useSearch({ strict: false }) as {
    stage?: string;
    sub_stage?: string;
  };
  const stage = search.stage;
  const subStage = search.sub_stage;

  const handleFileChange = async (files: File[]) => {
    const newFiles: any = Array.from(files);
    setMultipleFiles((prevFiles: any) => [...prevFiles, ...newFiles]);

    setFileProgress((prev) => ({
      ...prev,
      ...Object.fromEntries(
        newFiles.map((_: any, index: number) => [index, 0])
      ),
    }));
    setFileErrors([]);
  };

  const uploadProgressStart = async () => {
    setStartUploading(true);
    const newFiles: any = Array.from(multipleFiles);

    for (const [index, file] of newFiles.entries()) {
      if (fileProgress[index] !== 100) {
        try {
          const { chunkSize, totalChunks } = calculateChunks(file.size);
          setFileFormData((prev) => ({
            ...prev,
            chunkSize: chunkSize.toString(),
            totalChunksParts: totalChunks.toString(),
            chunkSizeInBytes: chunkSize,
          }));
          if (file.size > 39558800) {
            await startUploadEvent(file, index, chunkSize, totalChunks);
          } else {
            await getPresignedUrls(file, index);
          }
        } catch (error) {
          setFileErrors((prev) => [
            ...prev,
            { file, id: index, reason: (error as Error).message },
          ]);
          setStartUploading(false);
        }
      }
    }
  };

  const startUploadEvent = async (
    file: File,
    index: number,
    chunkSize: number,
    totalChunks: number
  ) => {
    const MAX_SIZE_MB = 50;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      setFileErrors((prev) => [
        ...prev,
        {
          file,
          id: index,
          reason: `File size exceeds ${MAX_SIZE_MB} MB limit`,
        },
      ]);
      return;
    }
    try {
      setStartUploading(true);
      const response: any = await startUploadMultipartFileAPI({
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_path: file.name,
        case_stage: stage,
        case_sub_stage: subStage,
      });
      if (response?.success) {
        const { upload_id, file_key } = response.data;
        setUploadFileDetails((prev: any) => ({
          ...prev,
          [index]: {
            upload_id,
            file_key: response.data?.file_key,
            file_name: file.name,
            name: file.name,
            path: response.data?.file_key,
          },
        }));
        await uploadFileIntoChunks(
          upload_id,
          file,
          index,
          file_key,
          chunkSize,
          totalChunks
        );
      } else {
        throw new Error("Failed to start upload");
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: (error as Error).message },
      ]);
      setStartUploading(false);
    }
  };

  const fetchPresignedUrls = async (
    fileIndex: number,
    uploadId: string,
    key: string,
    totalChunks: number
  ) => {
    try {
      if (presignedUrlsMap[fileIndex]) {
        return presignedUrlsMap[fileIndex];
      }

      const response: any = await getPresignedUrlsForFileAPI({
        file_key: key,
        upload_id: uploadId,
        parts: totalChunks,
      });

      if (response.data?.length === 0 || !response) {
        throw new Error("Failed to get presigned URLs");
      }
      const presignedUrls: any = response.data.upload_urls;
      setPresignedUrlsMap((prev) => ({ ...prev, [fileIndex]: presignedUrls }));
      return presignedUrls;
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        {
          file: multipleFiles[fileIndex],
          id: fileIndex,
          reason: (error as Error).message,
        },
      ]);
      setStartUploading(false);
    }
  };

  const uploadFileIntoChunks = async (
    uploadId: string,
    file: File,
    index: number,
    key: string,
    chunkSize: number,
    totalChunks: number,
    unuploadedParts?: number[],
    initialProgress?: number
  ): Promise<void> => {
    const etags: { ETag: string; PartNumber: number }[] = [];
    const chunkProgresses: number[] = new Array(totalChunks).fill(0);
    try {
      const existingEtags: any = unuploadedParts?.length
        ? etagsMap[index] || []
        : [];

      existingEtags.forEach((part: any) => {
        chunkProgresses[part.PartNumber - 1] = 1;
      });

      if (initialProgress === 100) {
        for (let i = 0; i < totalChunks; i++) {
          chunkProgresses[i] = 1;
        }
      }

      const initialProgressPercent =
        (chunkProgresses.reduce((sum, progress) => sum + progress, 0) /
          totalChunks) *
        100;

      setFileProgress((prev) => ({
        ...prev,
        [index]: parseFloat(initialProgressPercent.toFixed(2)),
      }));
      const partsToUpload =
        unuploadedParts || Array.from({ length: totalChunks }, (_, i) => i + 1);

      const presignedUrls: string[] = await fetchPresignedUrls(
        index,
        uploadId,
        key,
        partsToUpload.length
      );
      const uploadPromises = partsToUpload.map(async (partNumber) => {
        const chunkIndex = partNumber - 1;
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const url = presignedUrls[chunkIndex];
        try {
          const { etag } = await uploadChunk(
            url,
            file,
            partNumber,
            start,
            end,
            file.size,
            (partNumber, chunkProgress) => {
              chunkProgresses[chunkIndex] = chunkProgress;
              const totalLoaded = chunkProgresses.reduce(
                (sum, progress) => sum + progress,
                0
              );
              const overallProgress = (totalLoaded / totalChunks) * 100;
              setFileProgress((prev) => ({
                ...prev,
                [index]: parseFloat(overallProgress.toFixed(2)),
              }));
            }
          );

          etags.push({ ETag: etag, PartNumber: partNumber });
        } catch (error) {
          setFileErrors((prev) => [
            ...prev,
            { file, id: index, reason: (error as Error).message },
          ]);
          setStartUploading(false);
        }
      });

      await Promise.all(uploadPromises);

      const allEtags = [...existingEtags, ...etags];

      if (allEtags.length === totalChunks) {
        await mergeFileChunks(uploadId, key, allEtags, index, file);
        setPresignedUrlsMap((prev) => {
          const newMap = { ...prev };
          delete newMap[index];
          return newMap;
        });
        setEtagsMap((prev) => {
          const newMap = { ...prev };
          delete newMap[index];
          return newMap;
        });
      } else {
        setEtagsMap((prev) => ({ ...prev, [index]: allEtags }));
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: (error as Error).message },
      ]);
      setStartUploading(false);
    }
  };
  const uploadChunk = async (
    url: string,
    file: File,
    partNumber: number,
    start: number,
    end: number,
    totalFileSize: number,
    progressCallback: (partNumber: number, chunkProgress: number) => void
  ): Promise<{ etag: string }> => {
    const chunk = file.slice(start, end);
    const response = await axios.put(url, chunk, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      onUploadProgress: (progressEvent: any) => {
        const { loaded } = progressEvent;
        const chunkProgress = loaded / (end - start);
        progressCallback(partNumber, chunkProgress);
      },
    });
    const etag = response.headers["etag"];
    return { etag };
  };

  // const uploadChunk = async (
  //   url: string,
  //   file: File,
  //   partNumber: number,
  //   start: number,
  //   end: number,
  //   totalFileSize: number,
  //   progressCallback: (partNumber: number, chunkProgress: number) => void
  // ): Promise<{ etag: string }> => {
  //   const chunk = file.slice(start, end);
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     body: chunk,
  //     headers: {
  //       "Content-Type": file.type || "application/octet-stream",
  //     },
  // onUploadProgress: (progressEvent: any) => {
  //   const { loaded } = progressEvent;
  //   const chunkProgress = loaded / (end - start);
  //   progressCallback(partNumber, chunkProgress);
  // },
  //   });
  //   const reader = chunk.stream().getReader();
  //   let loaded = 0;
  //   const total = end - start;
  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) break;
  //     loaded += value.length;
  //     const chunkProgress = loaded / total;
  //     progressCallback(partNumber, chunkProgress);
  //   }
  //   const etag = response.headers.get("etag");
  //   if (!etag) {
  //     throw new Error(`ETag not found for chunk ${partNumber}`);
  //   }
  //   return { etag };
  // };

  const mergeFileChunks = async (
    uploadId: string,
    fileKey: string,
    etags: { ETag: string; PartNumber: number }[],
    index: number,
    file: File
  ) => {
    const sortedEtags = etags
      .slice()
      .sort((a, b) => a.PartNumber - b.PartNumber);

    try {
      const response = await mergeAllChunksAPI({
        file_key: fileKey,
        upload_id: uploadId,
        parts: sortedEtags,
      });
      if (!response.success) {
        setFileProgress((prev) => ({ ...prev, [index]: 99 }));
        throw new Error("Failed to merge chunks");
      } else {
        setFileProgress((prev) => ({ ...prev, [index]: 100 }));
        const payload = {
          case_id: Number(service_id),
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          key: fileKey,
          case_stage: stage,
          case_sub_stage: subStage,
        };
        // refetch();
        await uploadDocsMutation.mutate(payload);
        setStartUploading(false);
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        {
          file: { name: fileKey } as File,
          id: index,
          reason: (error as Error).message,
        },
      ]);
      setStartUploading(false);
    } finally {
    }
  };

  const resumeUploadForMultipart = async (file: File, index: number) => {
    let body = {
      upload_id: uploadFileDetails[index]?.upload_id,
      file_key: uploadFileDetails[index]?.file_key,
      parts: +fileFormData.totalChunksParts,
    };

    try {
      const response = await resumeUploadAPI(body);

      if (!response.success) {
        throw new Error("Failed to resume upload");
      }
      const unuploadedParts = response.data || [];
      const { chunkSize, totalChunks } = calculateChunks(file.size);
      await uploadFileIntoChunks(
        uploadFileDetails[index]?.upload_id,
        file,
        index,
        uploadFileDetails[index]?.file_key,
        chunkSize,
        totalChunks,
        unuploadedParts,
        fileProgress[index]
      );
    } catch (error) {
      setStartUploading(false);
    }
  };

  const resumeUpload = async (file: File, index: number) => {
    let erros = [...fileErrors];
    erros = erros.filter((error) => error.id !== index);
    setFileErrors(erros);
    if (file.size > 39558800) {
      await resumeUploadForMultipart(file, index);
    }
    // else {
    //   await uploadSinglePartFile(file, index);
    // }
  };

  const abortFileUpload = async (index: number) => {
    const uploadDetails = uploadFileDetails[index];

    if (!uploadDetails?.upload_id || !uploadDetails?.file_key) {
      return; // Don't proceed with the API call
    }

    const body = {
      upload_id: uploadDetails.upload_id,
      file_key: uploadDetails.file_key,
    };

    try {
      const response = await abortUploadingAPI(body);
      if (!response.success) {
        throw new Error("Failed to abort upload");
      }
      onUploadSuccess?.();
      setAbortedFiles((prev) => new Set(prev.add(index)));
      toast.success("File upload aborted successfully");
      setStartUploading(false);
    } catch (error) {}
  };

  //   const fetchIncompletePresignedUrls = async (
  //     index: number,
  //     totalChunks: number,
  //     chunkSize: number,
  //     file: File
  //   ) => {

  //     if (presignedUrlsMap[index]) {
  //       return presignedUrlsMap[index];
  //     }
  //     const upload_id = uploadFileDetails[0]?.upload_id;
  //     const file_key = uploadFileDetails[0]?.file_key;

  //     // const response: PresignedUrlsResponse =
  //     //   await getPresignedUrlsForIncompleteFileAPI(
  //     //     {
  //     //       upload_id,
  //     //       file_key,
  //     //       parts: totalChunks,
  //     //     },
  //     //     categoriesId
  //     //   );

  //     // if (!response.success) {
  //     //   throw new Error("Failed to get presigned URLs");
  //     // }

  //     const incompleteParts: any = response.data;
  //     setIncompleteData(incompleteParts);
  //
  //     await uploadFileIntoChunks(
  //       upload_id,
  //       file,
  //       index,
  //       file_key,
  //       chunkSize,
  //       totalChunks,
  //       incompleteParts
  //     );
  //   };

  // Upload single part file which is less than 5 mb
  const getPresignedUrls = async (file: File, index: number) => {
    try {
      const payload = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      };
      const response = await fileUploadAPI({
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        case_stage: stage,
        case_sub_stage: subStage,
      });
      const result = response;

      if (response.status === 200 || response.status === 201) {
        const { upload_id, file_key } = result?.data;
        setUploadFileDetails((prev: any) => [
          ...prev,
          {
            upload_id,
            file_key,
            file_name: file.name,
            name: file.name,
            path: file.name,
          },
        ]);
        await uploadFileToS3(
          result.data.data.target_url,
          file,
          index,
          result.data.data.file_key
        );
      } else {
        throw new Error(result.message || "Failed to generate presigned URL");
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: (error as Error).message },
      ]);
      setStartUploading(false);
    }
  };

  const uploadDocsMutation = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const response = await uploadDocumentAPI(payload);
        if (response.data?.status === 200 || response.data?.status === 201) {
          toast.success("File uploaded successfully");
          return response;
        } else {
          throw new Error("Failed to upload ");
        }
      } catch (error) {
        toast.error("Failed to upload.");
      }
    },
    onSuccess: () => {
      onUploadSuccess?.();
    },
    onError: () => {},
  });

  const uploadFileToS3 = async (
    url: string,
    file: File,
    index: number,
    key: any
  ) => {
    try {
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        onUploadProgress: (progressEvent) => {
          const chunkProgress = (progressEvent.loaded / file.size) * 100;
          setFileProgress((prev) => ({
            ...prev,
            [index]: parseFloat(chunkProgress.toFixed(2)),
          }));
        },
      });
      const payload = {
        case_id: Number(service_id),
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        key,
        case_stage: stage,
        case_sub_stage: subStage,
      };

      await uploadDocsMutation.mutate(payload);
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: (error as Error).message },
      ]);
      setStartUploading(false);
    }
  };

  // const uploadFileToS3 = async (
  //   url: string,
  //   file: File,
  //   index: number,
  //   key: any
  // ) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: file,
  //       headers: {
  //         "Content-Type": file.type || "application/octet-stream",
  //       },
  // onUploadProgress: (progressEvent) => {
  //   const chunkProgress = (progressEvent.loaded / file.size) * 100;
  //   setFileProgress((prev) => ({
  //     ...prev,
  //     [index]: parseFloat(chunkProgress.toFixed(2)),
  //   }));
  // },
  //     });

  //     if (response.ok) {
  //       const payload = {
  //         case_id: Number(case_id),
  //         file_name: file.name,
  //         file_type: file.type,
  //         file_size: file.size,
  //         key,
  //         case_stage,
  //         case_sub_stage,
  //       };

  //       await uploadDocsMutation.mutate(payload);
  //     } else {
  //       throw new Error(`Upload failed with status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     setFileErrors((prev) => [
  //       ...prev,
  //       { file, id: key, reason: (error as Error).message },
  //     ]);
  //     setStartUploading(false);
  //   }
  // };

  useEffect(() => {
    if (showFileUpload) {
    }
  }, [showFileUpload]);

  return (
    <div>
      <UploadFiles
        handleFileChange={handleFileChange}
        multipleFiles={multipleFiles}
        previewImages={previewImages}
        fileProgress={fileProgress}
        fileErrors={fileErrors}
        setMultipleFiles={setMultipleFiles}
        setFileFormData={setFileFormData}
        fileFormData={fileFormData}
        setFileProgress={setFileProgress}
        resumeUpload={resumeUpload}
        abortFileUpload={abortFileUpload}
        abortedFiles={abortedFiles}
        uploadProgressStart={uploadProgressStart}
        fileTitles={fileTitles}
        setFileTitles={setFileTitles}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        setShowFileUpload={setShowFileUpload}
        from={from}
        setFileErrors={setFileErrors}
        startUploading={startUploading}
        setStartUploading={setStartUploading}
      />
    </div>
  );
};

export default MultiPartUploadComponent;
