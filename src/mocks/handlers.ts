import { http, HttpResponse, PathParams } from "msw";

export interface Work {
  id: number;
  title: string;
  authorId: number;
}

export interface Author {
  id: number;
  name: string;
}

export const handlers = [
  http.get<never, PathParams, Work[] | { error: string }>("/api/works", () => {
    return HttpResponse.json([
      { id: 1, title: "Work 1", authorId: 1 },
      { id: 2, title: "Work 2", authorId: 2 },
    ]);
  }),

  http.get<never, PathParams, Author[] | { error: string }>(
    "/api/authors",
    () => {
      return HttpResponse.json([
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
      ]);
    }
  ),

  http.get("https://jsonplaceholder.typicode.com/users/:userId", () => {
    return HttpResponse.json({
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }),
  http.post("/api/auth/signin", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Simulate basic validation
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        message: "Sign in successful",
        user: { id: 1, email: "test@example.com" },
      });
    }

    return HttpResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }),
];
