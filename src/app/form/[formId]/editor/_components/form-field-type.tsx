import Dropdown from './fields/dropdown';
import Email from './fields/email';
import LongText from './fields/long-text';
import MultipleChoice from './fields/multiple-choice';
import Number from './fields/number';
import ShortText from './fields/short-text';

type FormFieldTypeProps = {
  fieldType: string;
  item: { fieldId: string; fieldQuestion: string; fieldType: string };
};

export default function FormFieldType({ fieldType, item }: FormFieldTypeProps) {
  const fields = {
    shortText: <ShortText item={item} />,
    longText: <LongText item={item} />,
    multipleChoice: <MultipleChoice item={item} />,
    email: <Email item={item} />,
    dropdown: <Dropdown item={item} />,
    number: <Number item={item} />,
  };

  return <>{fields[fieldType as keyof typeof fields]}</>;
}
