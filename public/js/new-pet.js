const newPupProfileHandler = async (event) => {
    event.preventDefault();
    console.log("CREATE PUP FUNCTION CALLED")
    const name = document.getElementById("new-name").value;
    const human = document.getElementById("new-human").value;
    const age = document.getElementById("new-age").value;
    const sex = document.getElementById("new-sex").value;
    const breed = document.getElementById("new-breed").value;
    const temperament = document.getElementById("new-temperament").value;
    const about_me = document.getElementById("new-about_me").value;
    const about_you = document.getElementById("new-about_you").value;
    
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
            about_you,
            }),
            headers: {
            "Content-Type": "application/json",
            },
        });
      console.log(response);
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(`Uh oh, couldn't add your pet. Try again!`);
      }
    }
  };

//   const uploadImageHandler = async (event) => {
//     event.preventDefault();
//     // Collect file.original name from input field
//     const image_file = document.getElementById('image_file').value.trim();
//     // if value exists
//     if (image_file) {
//       // fetch from the GET endpoint
//       const response = await fetch('/profile', {
//         method: 'PUT',
//         body: JSON.stringify({ image_file }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       console.log(response)
//       if (response.ok) {
//           document.location.replace('/profile/new-pet');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };
  
// document.getElementById('.photo-btn').addEventListener('click', uploadImageHandler);

document.querySelector(".new-pet-form").addEventListener("submit", newPupProfileHandler);