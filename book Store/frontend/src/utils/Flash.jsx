import { toast } from 'react-toastify';

export const  errorFlash = (message)=>{
 toast.error(`Error! ${message}`, {
    position: "top-right",     // Position of the toast
    autoClose: 2000,// Time before the toast disappears (5 seconds)
    hideProgressBar: false,     // Don't hide the progress bar
    progress: undefined,        // You can optionally set custom progress
    closeOnClick: true,         // Close the toast when clicked
  });
}

export const successFlash = (message)=>{
toast.success(`Success! ${message}`, {
    position: "top-right",     // Position of the toast
    autoClose: 2000,            // Time before the toast disappears (5 seconds)
    hideProgressBar: false,     // Don't hide the progress bar
    progress: undefined,        // You can optionally set custom progress
    closeOnClick: true,      // Close the toast when clicked
})
}

