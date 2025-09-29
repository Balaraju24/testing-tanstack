import { SubStage } from "@/lib/interfaces/files";

export const calculateChunks = (
  fileSize: number
): { chunkSize: number; totalChunks: number } => {
  const MIN_CHUNK_SIZE_BYTES = 5 * 1024 * 1024;
  const MAX_CHUNK_SIZE_BYTES = 20 * 1024 * 1024;
  const MAX_TOTAL_CHUNKS = 10000;

  let chunkSize = MIN_CHUNK_SIZE_BYTES;

  if (fileSize > 0 && fileSize <= 500 * 1024 * 1024) {
    chunkSize = Math.min(15 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (
    fileSize > 500 * 1024 * 1024 &&
    fileSize <= 1 * 1024 * 1024 * 1024
  ) {
    chunkSize = Math.min(12 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (
    fileSize > 1 * 1024 * 1024 * 1024 &&
    fileSize <= 2 * 1024 * 1024 * 1024
  ) {
    chunkSize = Math.min(15 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (
    fileSize > 2 * 1024 * 1024 * 1024 &&
    fileSize <= 3 * 1024 * 1024 * 1024
  ) {
    chunkSize = Math.min(18 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (
    fileSize > 3 * 1024 * 1024 * 1024 &&
    fileSize <= 4 * 1024 * 1024 * 1024
  ) {
    chunkSize = Math.min(20 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (
    fileSize > 4 * 1024 * 1024 * 1024 &&
    fileSize <= 5 * 1024 * 1024 * 1024
  ) {
    chunkSize = Math.min(20 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  }

  const totalCountChunks = Math.ceil(fileSize / chunkSize);

  return { chunkSize, totalChunks: totalCountChunks };
};

export const bytesToMB = (bytes: any) => {
  return bytes / (1024 * 1024);
};

export const fileSizeInMB = (fileSize: number): string => {
  return (fileSize / (1024 * 1024)).toFixed(2);
};

export const getSubStageTitle = (
  subStages: SubStage[] | undefined,
  subStageCode: string | undefined
): string | undefined => {
  if (!subStageCode) return undefined;
  return subStages?.find((sub) => sub.code === subStageCode)?.title;
};

export const isSubStageCompleted = (
  subStages: SubStage[] | undefined,
  subStageCode: string | undefined
): boolean => {
  if (!subStageCode) return false;
  return (
    subStages?.find((sub) => sub.code === subStageCode)?.status === "completed"
  );
};
