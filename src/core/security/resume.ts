export interface ValidatedResume {
  file: File;
  safeName: string;
  size: number;
  type: string;
}

const ALLOWED_MIME = new Set<string>([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_BYTES = 5 * 1024 * 1024;

const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46];
const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04];
const OLE_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

export class ResumeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResumeValidationError";
  }
}

function bytesStartWith(head: Uint8Array, signature: ReadonlyArray<number>): boolean {
  if (head.byteLength < signature.length) return false;
  for (let i = 0; i < signature.length; i++) {
    if (head[i] !== signature[i]) return false;
  }
  return true;
}

function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() || "resume";
  const cleaned = base.replace(/[^\w.\- ]+/g, "_").replace(/_+/g, "_").trim();
  return (cleaned || "resume").slice(0, 120);
}

function isAllowedMime(type: string | undefined): boolean {
  if (!type) return true;
  return ALLOWED_MIME.has(type.toLowerCase());
}

export async function validateResume(raw: FormDataEntryValue | null): Promise<ValidatedResume> {
  if (!(raw instanceof File)) {
    throw new ResumeValidationError("Resume file is required");
  }
  if (raw.size === 0) {
    throw new ResumeValidationError("Resume file is empty");
  }
  if (raw.size > MAX_BYTES) {
    throw new ResumeValidationError("Resume file exceeds the 5 MB limit");
  }
  if (!isAllowedMime(raw.type)) {
    throw new ResumeValidationError("Resume file type is not allowed");
  }

  const head = new Uint8Array(await raw.slice(0, 8).arrayBuffer());
  const isPdf = bytesStartWith(head, PDF_MAGIC);
  const isDocx = bytesStartWith(head, ZIP_MAGIC);
  const isDoc = bytesStartWith(head, OLE_MAGIC);
  if (!isPdf && !isDocx && !isDoc) {
    throw new ResumeValidationError("Resume file contents do not match an allowed type");
  }

  return {
    file: raw,
    safeName: sanitizeFilename(raw.name || "resume"),
    size: raw.size,
    type: raw.type || (isPdf ? "application/pdf" : isDocx
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/msword"),
  };
}
