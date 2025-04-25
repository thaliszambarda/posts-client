import { type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/user.provider";

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
    <div className="flex w-full max-w-[500px] flex-col gap-2 rounded-2xl border border-[#CCC] bg-white p-6">
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
        <Button
          className="mt-2 self-end rounded-lg px-8 py-1.5 text-base font-bold"
          type="submit"
          disabled={isEmpty}
        >
          ENTER
        </Button>
      </form>
    </div>
  );
}
