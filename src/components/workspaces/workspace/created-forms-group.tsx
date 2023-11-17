import CreatedForm from "./created-form";

type Props = {};

export default function CreateFormsGroup({}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <CreatedForm />
      <CreatedForm />
      <CreatedForm />
    </div>
  );
}
