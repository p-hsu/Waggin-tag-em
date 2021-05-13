// CREATE NEW PUP PROFILE
const newPupProfileHandler = async (event) => {
    event.preventDefault();
    console.log('function called')
    const title = document.querySelector('#post-name').value;
    const body = document.querySelector('#post-body').value;
    if (title && body) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
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
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPupProfileHandler);
  
//   document
//     .querySelector('.post-list')
//     .addEventListener('click', editButtonHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);