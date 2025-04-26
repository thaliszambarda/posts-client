import { type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/user.context";

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value.trim();
    if (!value) return;

    setUser({ name: value });

    navigate("/posts");
  };

  return (
    <Card className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Welcome to CodeLeap network!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="username" className="text-base font-normal">
          Please enter your username
        </label>
        <Input
          id="username"
          placeholder="John doe"
          ref={inputRef}
          onChange={(e) => setIsEmpty(e.target.value === "")}
        />
        <Button className="mt-2 self-end" type="submit" disabled={isEmpty}>
          ENTER
        </Button>
      </form>
    </Card>
  );
}
