// CREATE NEW PUP PROFILE
const newPupProfileHandler = async (event) => {
    event.preventDefault();
    console.log('function called')
    const name = document.getElementById('name').value;
    const human = document.getElementById('human').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const breed = document.getElementById('breed').value;
    const temperament = document.getElementById('temperament').value;
    const about_me= document.getElementById('about_me').value;
    const about_you = document.getElementById('about_you').value;
    if (name && human && age && sex && breed && temperament && about_me && about_you) {
      const response = await fetch(`/api/pets`, {
        method: 'POST',
        body: JSON.stringify({ name, human, age, sex, breed, temperament, about_me, about_you }),
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
  
  document
    .querySelector('.new-pet-form')
    .addEventListener('submit', newPupProfileHandler);
  
//   document
//     .querySelector('.post-list')
//     .addEventListener('click', editButtonHandler);
  
  // document
  //   .querySelector('.post-list')
  //   .addEventListener('click', delButtonHandler);