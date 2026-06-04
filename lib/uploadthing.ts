import { createUploadthing } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  screenshotUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
    };
  }),
};

export type OurFileRouter =
  typeof ourFileRouter;