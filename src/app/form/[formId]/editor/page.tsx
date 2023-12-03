import Editor from "./_components/editor";
import EditorHeader from "./_components/editor-header";
import EditorSidebar from "./_components/editor-sidebar";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="bg-slate-50/50">
      <EditorHeader />
      <div className="flex w-full">
        <Editor />
        <EditorSidebar className="h-[calc(100vh-64px)]" />
      </div>
    </div>
  );
}
