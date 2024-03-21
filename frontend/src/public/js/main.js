import Swal from "sweetalert2";
import { uploadData, getImages, deleteData, updateData } from "./apiClient.js";
import { showAlert, validateForm, timeAgo} from "./utils.js";


const formUpload = document.querySelector("#upload-data"); //Formulario

let viewImages = document.getElementById("images");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const imageElement = document.getElementById("image");

let modeModal = "new"; //Ayuda a saber si se envia el dato o se va a actualizar
let idSelected = ""; //Ayuda a cargar el id


document.addEventListener('DOMContentLoaded', () => {
/* Muestra todas imagenes en cards con titulo y descripción  */
const viewAllImages = async (divElement) => {
  try {
    const dataFile = await getImages();
    if (dataFile && dataFile.length > 0) {
      divElement.classList = "row row-cols-1 row-cols-md-3 g-4 mx-4 my-4";
      divElement.innerHTML = "";
      dataFile.forEach((item) => {
        divElement.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${item.image.secure_url}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <button type="button" class="btn btn-primary me-2 update-btn" data-bs-toggle="modal"  data-bs-target="#modal-add" data-id="${item._id}" >Update</button>
                            <button type="button" class="btn btn-danger delete-btn" data-id ="${item._id}">Delete</button>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">${timeAgo(item.created_at)}</small>
                        </div>
                    </div>
                </div>
                `;
      });

      //Procedimientos auxiliares para actualizar y eliminar
      const updateButtons = document.querySelectorAll('.update-btn');
      const deleteButtons = document.querySelectorAll('.delete-btn');

      
      updateButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          //Se obtiene los datos
          const id = e.target.dataset.id;
          const title = e.target.parentElement.querySelector('.card-title').textContent;
          const description = e.target.parentElement.querySelector('.card-text').textContent;
          
          //Se pasa los datos al formulario
          titleElement.value = title;
          descriptionElement.value = description;

          modeModal = "update";
          idSelected = id;
          
        });
      });

      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
           modalDelete(id);
        })
      })

    } else {
      divElement.innerHTML = "<p>No pictures found..</p>";
    }
  } catch (error) {
    console.error("Error al cargar las imágenes:", error.message);
    divElement.innerHTML =
      "<p>Error loading images. Please try again later..</p>";
  }
};




viewAllImages(viewImages);


/* Enviar imagen al servidor  */
formUpload.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isValid = validateForm(titleElement.value,descriptionElement.value, imageElement.value); //Valida los campos del formulario
    let result;
    if (modeModal === "new") {
        if (isValid === false) { //Si es false mandara un error y si es true pasara a la peticíon POST
            showAlert("Please fill in all fields and make sure to select a valid image file", "error"); //Mensaje de error      
        } else {
            result = await uploadData(formUpload); //Sube el archivo con el titulo y la descripción      
            showAlert(result.message, result.type);
        }
    } else {
        result = await updateData(idSelected, formUpload); //Actualiza los campos
        showAlert(result.message, result.type);
    }

    formUpload.reset(); //Limpieza del formulario
    modeModal = "new"
    idSelected = "";
    viewAllImages(viewImages);

  });


  


/* Limpieza de formulario */
document.querySelectorAll(".close-modal-add").forEach((close) => {
  close.addEventListener("click", () => {
    formUpload.reset();
    modeModal = "new";
    idSelected = "";
  });
});



/* Modal para eliminar imagen */
const modalDelete = async (id) => {
  Swal.fire({
    title: 'Delete image',
    text: 'Are you sure you want to continue?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteData(id); // Espera a que la función deleteData se complete
      Swal.fire(
        'Deleted!',
        'Image has been deleted successfully.',
        'success'
      );
      viewAllImages(viewImages); // Espera a que la función viewAllImages se complete
    } else {
      Swal.fire(
        'Cancelled',
        'Your image is safe :)',
        'error'
      );
    }
  });
};

});