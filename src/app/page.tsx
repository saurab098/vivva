// import { Button } from "@/components/ui/button";
// import React from "react";

// const page = () => {
//   return (
//     <div>
//       <Button variant="destructive">kick</Button>
//     </div>
//   );
// };

// export default page;

// for just db.ts check or making it server components(means only run in server):
// for try change users to posts.
import { prisma } from "@/lib/db";

const page = async () => {
  const posts = await prisma.post.findMany();
  return <div>{JSON.stringify(posts, null, 2)}</div>;
};

export default page;
