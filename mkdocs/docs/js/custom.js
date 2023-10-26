window.onload = function() {
    setTimeout(function() {
      document.getElementById('newVersionPopup').style.display = 'block';
    }, 5000); // Show popup after 5 seconds. Adjust the time as needed.
  }
  
  function closePopup() {
    document.getElementById('newVersionPopup').style.display = 'none';
  }
  