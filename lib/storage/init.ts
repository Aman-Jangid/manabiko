import { setStorageProvider } from ".";
import { localStorageProvider } from "./localStorageProvider";

export default function initStorageProvider() {
  setStorageProvider(localStorageProvider);
  // Initialize any other libraries or services here
  console.log("Storage Provider Initialization complete");
}
