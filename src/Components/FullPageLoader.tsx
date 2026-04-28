import { Loader2 } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
      <Loader2 className="w-12 h-12 animate-spin text-fuchsia-500" />
    </div>
  );
}

export default FullPageLoader;