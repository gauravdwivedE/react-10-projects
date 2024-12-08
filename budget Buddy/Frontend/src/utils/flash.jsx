import { toast } from 'react-toastify';

export function successFlash(message){
    toast.success(message)
}
export function errorFlash(message){
    toast.error(message)
}