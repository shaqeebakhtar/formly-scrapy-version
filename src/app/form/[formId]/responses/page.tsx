import Responses from './_components/responses';
import ResponsesHeader from './_components/responses-header';

type Props = {};

export default function page({}: Props) {
  return (
    <div className="bg-slate-50/50 h-full">
      <ResponsesHeader />
      <Responses />
    </div>
  );
}
