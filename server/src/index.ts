import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

const SignupSchema = z.object({
  email: z.string({ message: "Must be email" }).email(),
  password: z.string({ message: "lenght should graeter than 6" }).min(6),
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/signup", async (c) => {
  const body = await c.req.json();
  const Parsed = await SignupSchema.safeParse(body);
  console.log(`body`, Parsed);
  if (!Parsed.success) {
    return c.json({ message: "Invalid data" });
  }
  console.log(body);
  return c.json({ msg: "done" });
});

export default app;
