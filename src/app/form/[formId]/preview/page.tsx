import Preview from './_components/preview';
import PreviewHeader from './_components/preview-header';

type Props = {};

export default function page({}: Props) {
  return (
    <div className="bg-slate-50/50">
      <PreviewHeader />
      <Preview />
    </div>
  );
}
