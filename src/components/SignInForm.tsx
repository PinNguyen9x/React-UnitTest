import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../schemas/auth.schema";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      setIsSubmitting(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sign in failed");
      }

      // Handle successful sign in (e.g., redirect)
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Form.Field name="email">
        <Form.Label className="block text-sm font-medium">Email</Form.Label>
        <Form.Control asChild>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full rounded-md border p-2"
            data-testid="email-input"
          />
        </Form.Control>
        {errors.email && (
          <Form.Message className="text-sm text-red-500">
            {errors.email.message}
          </Form.Message>
        )}
      </Form.Field>

      <Form.Field name="password">
        <Form.Label className="block text-sm font-medium">Password</Form.Label>
        <Form.Control asChild>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full rounded-md border p-2"
            data-testid="password-input"
          />
        </Form.Control>
        {errors.password && (
          <Form.Message className="text-sm text-red-500">
            {errors.password.message}
          </Form.Message>
        )}
      </Form.Field>

      <Form.Submit asChild>
        <button
          type="submit"
          data-testid="submit-button"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
