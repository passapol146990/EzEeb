console.log("passapol")
const form = document.getElementById('reg_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/saveregform');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('successfully');
        form.reset(); // รีเซ็ตแบบฟอร์ม
      } else {
        console.error('Error');
      }
    };
    xhr.send(formData);
})
