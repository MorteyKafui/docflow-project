"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          className="w-full col-start-1 col-end-3 font-bold text-xl"
        >
          {" "}
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait...{" "}
        </Button>
      ) : (
        <Button
          className="w-full col-start-1 col-end-3 font-bold text-xl"
          type="submit"
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
