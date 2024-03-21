const url = import.meta.env.VITE_url; //Url del servidor

/* Carga la imagen */
const uploadData = async (form) => {
  try {
    const response = await fetch(url + "upload-image", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    alertify.alert("Error : failed to connect to the server");
    console.log("Error : ", error.message);
  }
};

//Actualizar imagen
const updateData = async (id, form) => {
  try {
    let formData = new FormData(form);
    const response = await fetch(`${url}image/${id}/update`, {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
//Eliminar imagen
const deleteData = async (id) => {
  try {
    const response = await fetch(`${url}image/${id}/delete`, {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

/* Obtiene todas las imagenes  */
const getImages = async () => {
  try {
    const response = await fetch(url + "images");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error : ", error.message);
  }
};


export {
    getImages, deleteData,updateData,uploadData
}