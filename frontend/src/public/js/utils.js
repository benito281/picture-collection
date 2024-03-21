import Swal from "sweetalert2";

const showAlert = (message, type) => {
  if (type === 'error') {
      Swal.fire("Sorry", message, type);
  } else {
      Swal.fire("Good", message, "success");
  }

};

const validateForm = (title, description, file) => {
   // Validar que los campos de texto no estén vacíos
   if (file.trim() === '' || title.trim() === '' || description.trim() === '') {
    return false; // Devuelve false si alguno de los campos está vacío
  }

  // Obtenemos la extensión del archivo dividiendo la cadena en puntos y tomando la última parte
  const extension = file.split('.').pop().toLowerCase();
  
  // Lista de extensiones de imagen permitidas
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  // Comprobamos si la extensión está en la lista de extensiones permitidas
  return allowedExtensions.includes(extension);
}


function timeAgo(dateString) {
  const currentDate = new Date();
  const date = new Date(dateString);
  const secondsDiff = Math.floor((currentDate - date) / 1000);

  switch (true) {
    case secondsDiff >= 31536000: // 365 días en segundos
      const years = Math.floor(secondsDiff / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    case secondsDiff >= 2592000: // 30 días en segundos
      const months = Math.floor(secondsDiff / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    case secondsDiff >= 86400: // 24 horas en segundos
      const days = Math.floor(secondsDiff / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    case secondsDiff >= 3600: // 1 hora en segundos
      const hours = Math.floor(secondsDiff / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    case secondsDiff >= 60: // 1 minuto en segundos
      const minutes = Math.floor(secondsDiff / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    default:
      return `${secondsDiff} ${secondsDiff === 1 ? 'second' : 'seconds'} ago`;
  }
}
export {
  showAlert, validateForm, timeAgo
}

