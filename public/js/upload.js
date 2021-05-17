// the upload button 

const uploadImageHandler = async (event) => {
    event.preventDefault();
    // Collect file.original name from input field
    const image_file = document.getElementById('image_file').value.trim();
    // if value exists
    if (image_file) {
      // fetch from the GET endpoint
      const response = await fetch('/profile', {
        method: 'PUT',
        body: JSON.stringify({ image_file }),
        headers: { 'Content-Type': 'application/json' },
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
  
document.getElementById('.photo-btn').addEventListener('click', uploadImageHandler);