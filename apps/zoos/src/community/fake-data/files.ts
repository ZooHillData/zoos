import { faker } from "@faker-js/faker";

interface FileMetadata {
  description: string;
  tags: string[];
}

interface GeneratedFile {
  path: string;
  name: string;
  size: number;
  created: Date;
  modified: Date;
  type: string;
  extension: FileExtension;
  author: string;
  metadata: FileMetadata;
}

type FileExtension =
  | "txt"
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "jpg"
  | "png"
  | "md";

const FILE_TYPES: Record<FileExtension, string> = {
  txt: "text/plain",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  jpg: "image/jpeg",
  png: "image/png",
  md: "text/markdown",
};

const FILE_EXTENSIONS: FileExtension[] = Object.keys(
  FILE_TYPES,
) as FileExtension[];

function createRandomFiles(numFiles = 50, maxDepth = 4): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  function generatePath(depth: number): string {
    const numSegments = faker.number.int({ min: 1, max: depth });
    const segments: string[] = [];

    for (let i = 0; i < numSegments; i++) {
      segments.push(faker.word.noun().toLowerCase());
    }

    return segments.join("/");
  }

  function createRandomFile(): GeneratedFile {
    const extension: FileExtension =
      faker.helpers.arrayElement(FILE_EXTENSIONS);
    const fileName = `${faker.word
      .words({ count: { min: 1, max: 3 } })
      .toLowerCase()
      .replace(/ /g, "-")}.${extension}`;
    const path = generatePath(maxDepth);
    const fullPath = path ? `${path}/${fileName}` : fileName;

    return {
      path: fullPath,
      name: fileName,
      size: faker.number.int({ min: 1024, max: 10485760 }), // Between 1KB and 10MB
      created: faker.date.past(),
      modified: faker.date.recent(),
      type: FILE_TYPES[extension],
      extension,
      author: faker.person.fullName(),
      metadata: {
        description: faker.lorem.sentence(),
        tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
          faker.word.noun(),
        ),
      },
    };
  }

  // Generate the specified number of files
  for (let i = 0; i < numFiles; i++) {
    files.push(createRandomFile());
  }

  // Sort files by path for better readability
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

// Utility functions
const getFilesByType = (
  files: GeneratedFile[],
  type: string,
): GeneratedFile[] => {
  return files.filter((file) => file.type.startsWith(type));
};

const getTotalSize = (files: GeneratedFile[]): number => {
  return files.reduce((total, file) => total + file.size, 0);
};

// Format size in human-readable format
const formatSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export { createRandomFiles };
