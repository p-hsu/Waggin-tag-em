// CREATE NEW PUP PROFILE
let pup_selected; 

const newPupProfileHandler = async (event) => {
    event.preventDefault();
    console.log('function called')
    const name = document.getElementById('new-name').value;
    const human = document.getElementById('new-human').value;
    const age = document.getElementById('new-age').value;
    const sex = document.getElementById('new-sex').value;
    const breed = document.getElementById('new-breed').value;
    const temperament = document.getElementById('new-temperament').value;
    const about_me= document.getElementById('new-about_me').value;
    const about_you = document.getElementById('new-about_you').value;
    if (name && human && age && sex && breed && temperament && about_me && about_you) {
      const response = await fetch(`/api/pets`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          human,
          age,
          sex,
          breed,
          temperament,
          about_me,
          about_you
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(`Uh oh, couldn't add your pet. Try again!`);
      }
    }
  };
  
// THIS IS BEYOND MVP IF WE WANT TO EDIT PUP PROFILES
//   const editButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         document.location.replace('/editPost');
//       } else {
//         alert('Failed to update post');
//       }
//     }
//   };
  
// DELETE YOUR PET PROFILE
  // const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  //     const response = await fetch(`/api/posts/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to delete post');
  //     }
  //   }
  // };
  

  
//   document
//     .querySelector('.post-list')
//     .addEventListener('click', editButtonHandler);
  
  // document
  //   .querySelector('.post-list')
  //   .addEventListener('click', delButtonHandler);



// EVENT DELEGATION FOR EACH PROFILE CARD
const petHandler = (event) => {
  console.log(event)
  // event delegation to determine delete vs edit btn
  event.preventDefault();
  if (event.target.hasAttribute('data-delete_id')) {
      deletePet(event);       
  } else if (event.target.hasAttribute('data-update_id')) {
      //updatePet(event);
      pup_selected = event.target.dataset.update_id;
     
  }
};
// get pet.id to DELETE request by id
const deletePet = async (event) => {
    const id = event.target.getAttribute('data-delete_id');
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
    }
    })

    console.log("confirmation", confirmation);

    
};
    
// get post.id to go to edit-post view
const updatePet = async (event) => {
  event.preventDefault();
  console.log(event)
  console.log(pup_selected)
  //const id = event.target.getAttribute('data-update-id');
  const id = pup_selected;
  console.log(id)
  const name = document.getElementById('update-name').value;
  const human = document.getElementById('update-human').value;
  const age = document.getElementById('update-age').value;
  const sex = document.getElementById('update-sex').value;
  const breed = document.getElementById('update-breed').value;
  const temperament = document.getElementById('update-temperament').value;
  const about_me= document.getElementById('update-about_me').value;
  const about_you = document.getElementById('update-about_you').value;
  const response = await fetch(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      human,
      age,
      sex,
      breed,
      temperament,
      about_me,
      about_you
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(`Uh oh, couldn't edit your pet. Try again!`);
  }
}

// THE ISSUE WITH USING AN EVENT LISTENER
// INSIDE A EVENT DELEGATED PARENT EVENT LISTENER
// IS THAT IT TAKES THE EMPTY FIELDS AND
// GOES DIRECTLY TO THE NEWLY UPDATED PET CARD
// INSTEAD OF WAITING FOR USER INPUT AND THE
// SECOND EVENT LISTENER TO CLICK ON THE MODAL BUTTON

document.querySelector('.pet-profile-card').addEventListener('click', petHandler)

document.querySelector('.new-pet-form').addEventListener('submit', newPupProfileHandler);

document.getElementById('update-btn').addEventListener('click', updatePet)
