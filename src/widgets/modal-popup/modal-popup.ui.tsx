import { IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function ModalPopup({ active, setActive, children }) {
  return (
    <div
      onClick={() => setActive(false)}
      className={`fixed duration-500 h-screen w-screen bg-black/40 backdrop-blur-sm top-0 left-0 flex pointer-events-none items-center justify-center z-50 ${
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-6 duration-300 bg-white border border-gray-100 shadow-lg w-[340px] md:w-[460px] flex flex-col ${
          active ? 'scale-100' : 'scale-95'
        }`}
      >
        <IconButton onClick={() => setActive(false)} className="self-end">
          <CancelRoundedIcon />
        </IconButton>

        {children}
      </div>
    </div>
  );
}
