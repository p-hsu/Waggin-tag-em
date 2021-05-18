// CREATE NEW PUP PROFILE
let pup_selected;
let photo_id;
// const newPupProfileHandler = async (event) => {
//   event.preventDefault();
//   console.log("function called");
//   const name = document.getElementById("new-name").value;
//   const human = document.getElementById("new-human").value;
//   const age = document.getElementById("new-age").value;
//   const sex = document.getElementById("new-sex").value;
//   const breed = document.getElementById("new-breed").value;
//   const temperament = document.getElementById("new-temperament").value;
//   const about_me = document.getElementById("new-about_me").value;
//   const about_you = document.getElementById("new-about_you").value;
//   if (
//     name &&
//     human &&
//     age &&
//     sex &&
//     breed &&
//     temperament &&
//     about_me &&
//     about_you
//   ) {
//     const response = await fetch(`/api/pets`, {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         human,
//         age,
//         sex,
//         breed,
//         temperament,
//         about_me,
//         about_you,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response);
//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert(`Uh oh, couldn't add your pet. Try again!`);
//     }
//   }
// };

// EVENT DELEGATION FOR EACH PROFILE CARD
const petHandler = (event) => {
  console.log(event);
  // event delegation to determine delete vs edit btn
  event.preventDefault();
  if (event.target.hasAttribute("data-delete_id")) {
    deletePet(event);
  } else if (event.target.hasAttribute("data-update_id")) {
    //updatePet(event);
    pup_selected = event.target.dataset.update_id;
  }
};
// get pet.id to DELETE request by id
const deletePet = async (event) => {
  const id = event.target.getAttribute("data-delete_id");
  console.log(id);

    let confirmation = swal("Are you sure you want to delete this pet profile?", {
      buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: "YES",
            value: true,
            closeModal: true
          }
      },
    }).then(async (res) =>{
      console.log(res);
      if (res) {
        const response = await fetch(`/api/pets/${id}`, {
            method: 'DELETE',
        });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
<<<<<<< HEAD
    })

    console.log("confirmation", confirmation);

    
=======
  }
>>>>>>> main
};

// get post.id to go to edit-post view
const updatePet = async (event) => {
  event.preventDefault();
  console.log(event);
  //const id = event.target.getAttribute('data-update-id');
  const id = pup_selected;
  const name = document.getElementById("update-name").value;
  const human = document.getElementById("update-human").value;
  const age = document.getElementById("update-age").value;
  const sex = document.getElementById("update-sex").value;
  const breed = document.getElementById("update-breed").value;
  const temperament = document.getElementById("update-temperament").value;
  const about_me = document.getElementById("update-about_me").value;
  const about_you = document.getElementById("update-about_you").value;
  const response = await fetch(`/api/pets/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      human,
      age,
      sex,
      breed,
      temperament,
      about_me,
      about_you,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(`Uh oh, couldn't edit your pet. Try again!`);
  }
};

// NOT RENDERING SPECIFIC PUP DATA > NEED TO LOOK AT HOW ID IS BEING PASSED TO MODAL FIELDS

// the upload button

const uploadImageHandler = async (event) => {
  event.preventDefault();
  console.log("PUT REQUEST");
  console.log(event);
  let form = new FormData();


  // Collect file.original name from input field
  let id = pup_selected;
  console.log(event.target);
  console.log(id);
  const image_file = document.getElementById("image_file").value.trim();
  let response;
  const FILE_ACTUAL = document.getElementById("myImage").value.trim();
  console.log(FILE_ACTUAL)
  form.append('id', id);
  form.append('photo_id', photo_id)
  form.append('image_file', image_file)
  form.append('file', FILE_ACTUAL)
  form = new URLSearchParams(form);
  // if value exists
  if (image_file) {
    // fetch from the GET endpoint
    console.log(photo_id)
    if (photo_id) {
      response = await fetch(`/api/images/${photo_id}`, {
        method: "PUT",
        body: form,
      });
    } else {
      response = await fetch(`/api/images/upload`, {
        method: "POST",
        body: form,
        // headers: {'Content-Type': 'multipart/form-data'}
      });
    }
    console.log(response);
    if (response.ok) {
      // If successful render photo onto modal
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const handleMiddle = (event) => {
  //check if event snagged was either was a button or i tag

  pup_selected = event.target.parentElement.dataset.pet_id;
  photo_id = event.target.parentElement.dataset.photo_id;
  console.log(event.target.tagName);
};


// event delegation handler
document.querySelector(".pet-profile-card").addEventListener("click", petHandler);
// update pet event listener
document.getElementById('update-btn').addEventListener('click', updatePet)
// upload photo event listener
// document
//   .querySelector(".photo-upload-form")
//   .addEventListener("submit", uploadImageHandler);

document.getElementById("btn-photo-edit").addEventListener("click", handleMiddle);
