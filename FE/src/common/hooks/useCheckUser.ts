export const saveUserToDatabase = async (userId: string) => {
  try {
    if (!userId) {
      // console.log(userId);
      console.error("No userId provided");
      return;
    }
    const response = await fetch("http://localhost:8080/api/users/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerkId: userId }),
    });

    const data = await response.json();

    return data?.user;
  } catch (error) {
    console.error("Error during saveUserToDatabase:", error);
  }
};
