// src/core/services/fal-client.ts
import { fal } from "@fal-ai/client";

export const configureFalClient = () => {
  fal.config({
    credentials: process.env.FALEN_API_KEY,
  });
};
