import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface SignInFormProps {
  onClose: () => void;
}

const formSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

function SignInForm({ onClose }: SignInFormProps) {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { email, password } = values;
    try {
      await signIn(email, password);
      onClose();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <>
      <h1>SignIn Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="couser-name"
                      data-testid="email-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="slug-description"
                      {...field}
                      data-testid="password-input"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            isLoading={isSubmitting}
            variant="primary"
            data-testid="submit-button"
            type="submit"
            className="w-[120px]"
            disabled={isSubmitting}
          >
            Submit
          </Button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </Form>
    </>
  );
}
export default SignInForm;
