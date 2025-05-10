interface SyncResponse {
  success: boolean;
  message: string;
  userId?: string;
  error?: string;
}

interface UserData {
  books: Array<Record<string, unknown>>;
  preferences: Record<string, unknown>;
  lastSynced?: string;
  [key: string]: unknown;
}

/**
 * Synchronizes data between a guest user and an authenticated user
 * @param guestUserId - The ID of the guest user
 * @param userData - The user data to sync (books, preferences, etc.)
 * @returns A promise that resolves to the sync response
 */
export const syncUserData = async (
  guestUserId: string,
  userData: UserData
): Promise<SyncResponse> => {
  try {
    const response = await fetch("/api/user/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestUserId,
        userData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to sync data");
    }

    return {
      success: true,
      message: data.message || "Data synchronized successfully",
      userId: data.userId,
    };
  } catch (error) {
    console.error("Error syncing user data:", error);
    return {
      success: false,
      message: "Failed to sync data",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Gets the current user data from local storage or other client-side storage
 * @returns User data object with books, preferences, etc.
 */
export const getUserData = () => {
  // In a real app, you would get this from IndexedDB, localStorage, etc.
  // This is just a placeholder implementation
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  const preferences = JSON.parse(localStorage.getItem("preferences") || "{}");

  return {
    books,
    preferences,
    lastSynced: new Date().toISOString(),
  };
};

/**
 * Stores authenticated user data after sign-in
 * @param userData - User data from the server
 */
export const storeUserData = (userData: UserData) => {
  // In a real app, this would merge/replace local data
  // with data from the server after authentication
  if (userData.books) {
    localStorage.setItem("books", JSON.stringify(userData.books));
  }

  if (userData.preferences) {
    localStorage.setItem("preferences", JSON.stringify(userData.preferences));
  }
};
