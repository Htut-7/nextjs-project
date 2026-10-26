import { GetUserId } from "@/Components/lib/action/GetUser";
import ProfileHeader from "@/Components/ProfileHeader";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await GetUserId({
    userId: id,
  });

  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to load user");
  }

  const { user, totalQuestion, totalAnswer } = result.data;

  return (
    <div>
      <ProfileHeader
        user={user}
        totalQuestion={totalQuestion}
        totalAnswer={totalAnswer}
      />
    </div>
  );
}

export default page;
