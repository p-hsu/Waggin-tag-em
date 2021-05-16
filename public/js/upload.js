// I DONT THINK THIS IS NEEDED...

const uploadImageHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const image_file = document.getElementById('image_file').value.trim();
    if (image_file) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/pets/images/', {
        method: 'POST',
        body: JSON.stringify({ image_file }),
        // headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)
      if (response.ok) {
        // If successful render photo onto modal
          document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document.querySelector('.photo-btn').addEventListener('click', uploadImageHandler);