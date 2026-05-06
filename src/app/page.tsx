// // import { Button } from "@/components/ui/button";
// // this is test of client components
// "use client";
// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

// const page = () => {
//   const trpc = useTRPC();
//   // trpc.lallan.queryOptions({ text: "Hello!" });
//   // To get data from API's using a usequery
//   const { data } = useQuery(trpc.lallan.queryOptions({ text: "Saurab" }));
//   return (
//     <div>
//       {/* then render data here */}
//       {JSON.stringify(data)}
//     </div>
//   );
// };

// export default page;
// this look like works but not properly so always create through advance server rendering below:::
// import { caller } from "../trpc/server";

// const Page = async () => {
//   const data = await caller.hello({ text: "Saurab Server" });
//   //    ^? { greeting: string }
//   return <div>{JSON.stringify(data)}</div>;
// };

// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { Client } from "./client";

// const Page = async () => {
//   const queryClient = getQueryClient();
//   void queryClient.prefetchQuery(
//     trpc.hello.queryOptions({ text: "Saurab Server" }),
//   );

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Client />
//     </HydrationBoundary>
//   );
// };

// page.tsx for use function in background jobs
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [value, setValue] = useState<string>("");

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      // after adding toaster in layout:
      onSuccess: () => {
        toast.success("Background job started");
      },
    }),
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value: value })}
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default Page;
