import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { camelizeText, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Label } from '@/components/ui/label';

type LiveFormMainProps = {
  buttonAlignment?: string;
  formSubmitText?: string;
  formFields?: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    minChars?: number;
    maxChars?: number;
    options?: string[];
  }[];
};

let formSchemaObj: z.ZodRawShape = {};

const formSchema = z.object(formSchemaObj);

export default function LiveFormMain({
  buttonAlignment,
  formSubmitText,
  formFields,
}: LiveFormMainProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const createSchema = (question: string, type: string) => {
    const camelCaseQuestion = camelizeText(question);

    const zodType =
      type === 'number'
        ? z.number()
        : type === 'email'
        ? z.string().email()
        : z.string();

    formSchemaObj[camelCaseQuestion as keyof typeof formSchemaObj] = zodType;
  };

  formFields?.forEach((field) => {
    createSchema(field.fieldQuestion, field.fieldType);
  });

  console.log(formSchemaObj);

  return (
    <div className="max-w-xl mx-auto my-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formFields?.map((formField) => (
            <Card key={formField.fieldId}>
              <CardContent className="py-4 px-6 flex items-center">
                <FormField
                  control={form.control}
                  name={camelizeText(formField.fieldQuestion)}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{formField.fieldQuestion}</FormLabel>
                      <FormControl>
                        {formField.fieldType === 'longText' ? (
                          <Textarea
                            placeholder={formField.placeholder}
                            {...field}
                            rows={formField.rows}
                          />
                        ) : formField.fieldType === 'number' ? (
                          <Input
                            type="number"
                            placeholder={formField.placeholder}
                            {...field}
                          />
                        ) : formField.fieldType === 'email' ? (
                          <Input
                            type="email"
                            placeholder={formField.placeholder}
                            {...field}
                          />
                        ) : formField.fieldType === 'dropdown' ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={formField.placeholder}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                formField.options || ['Option 1', 'Option 2']
                              )?.map((option, idx) => (
                                <SelectItem key={idx} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : formField.fieldType === 'multipleChoice' ? (
                          <RadioGroup
                            className="space-y-2"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {(
                              formField.options || ['Option 1', 'Option 2']
                            )?.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <Input
                            placeholder={formField.placeholder}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <Card
            className={cn(
              'max-w-xl mx-auto bg-transparent border-none shadow-none',
              `text-${buttonAlignment}`
            )}
          >
            <CardContent className="p-0">
              <Button
                type="submit"
                className={cn(buttonAlignment === 'justify' && 'w-full')}
              >
                {formSubmitText || 'Submit'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
