export interface StorageProvider {
  upload(file: Buffer | Blob, filename: string): Promise<string>;
  download(url: string): Promise<Buffer | Blob>;
  delete(url: string): Promise<void>;
  list(): Promise<string[]>;
}

let storageProvider: StorageProvider;

export function setStorageProvider(provider: StorageProvider): void {
  storageProvider = provider;
}

export function getStorageProvider(): StorageProvider {
  if (!storageProvider) {
    throw new Error("Storage provider not set");
  }
  return storageProvider;
}
