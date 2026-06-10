import { useForm } from "@formspree/react";

export const useContactForm = (formId) => {
  const [state, handleSubmit] = useForm(formId);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    await handleSubmit(event);
    form.reset();
  };

  return { state, handleFormSubmit };
};
