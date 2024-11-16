import Swal from 'sweetalert2';

export default  function alert(title,text,icon) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#73ba9b', // Set the color of the confirm button (e.g., yellow)
      confirmButtonText: 'OK'
    });
};