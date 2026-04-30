import { CircleCheck } from "lucide-react";

const Toast = ({handleUndo, label, showToastDownAnimation}: any) => {
    return(
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <div className={`flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg shadow-lg ${showToastDownAnimation ? 'animate-slideDown' : 'animate-slideUp'}`}>
              <span className="text-sm flex gap-2">
                <CircleCheck size={24} className="text-fuchsia-400" />
                <span>{label}</span>
              </span>

              {<button
                onClick={handleUndo}
                className="text-sm font-semibold text-fuchsia-400 hover:text-white transition cursor-pointer underline underline-offset-4">
                Undo
              </button>}
            </div>
        </div>
    );
};
export default Toast;