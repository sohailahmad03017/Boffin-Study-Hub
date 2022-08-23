  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  import { getDatabase, ref, set,push, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASf9Ns3RoMcntJWElmhPsSC41InpkvmVM",
    authDomain: "boffin-study-hub.firebaseapp.com",
    projectId: "boffin-study-hub",
    storageBucket: "boffin-study-hub.appspot.com",
    messagingSenderId: "983672459076",
    appId: "1:983672459076:web:fa1c44e3b0dd9afb9dd111",
    measurementId: "G-PYDJXL919W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const databs = getDatabase();



//My code
window.studentPg = function(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if(name == "admin" && password == "85233161"){
        window.location.href = "students.html";
        getStudents();
    }
    else{
        alert("Incorrect Data");
    }
}

var students = [];  
var submitBtn = document.getElementById("submitBtn");


// submitBtn.addEventListener('click',submitForm)

//render Students
function renderStudents(){
    var parent = document.getElementsByClassName("parentDiv")[0];
    parent.innerHTML = "";
    for(var i = 0; i < students.length; i++){
      parent.innerHTML += `<div class="container">
      <div class="row">
        <div class="offset-md-3 col-md-6">
          <div class="bg-light my-3 p-3 rounded shadow">
            <p><strong>Application No. </strong> ${students[i].numb} </p>
            <p><strong>Student Name : </strong> ${students[i].studentName} </p>
            <p><strong>Gender : </strong> ${students[i].gender} </p>
            <p><strong>Father's Name : </strong> ${students[i].fatherName} </p>
            <p><strong>Class Applied For: </strong> ${students[i].stdClass} </p>
            <p><strong>School/College Name: </strong> ${students[i].instituteName} </p>
            <p><strong>Contact Number: </strong> ${students[i].contactNumber} </p>
            <p><strong>WhatsApp Number: </strong> ${students[i].whatsAppNumber} </p>
            <p><strong>Address: </strong> ${students[i].address} </p>
            <p><strong>Subjects: </strong> ${students[i].subjects} </p>
            <p><strong>Reference: </strong> ${students[i].reference} </p>
          </div>
        </div>
      </div>
    </div>`
    }
    
  }

//Getting Data of Students
function getStudents(){
    var reference = ref(databs, 'Students/');
    var dummyStudents = [];
    onValue(reference,function(data){
        dummyStudents = Object.values(data.val());

        students.length = 0;
        for(var i = 0; i < dummyStudents.length; i++){
          dummyStudents[i].numb = i+1;
          students.push(dummyStudents[i]);
        } 
        renderStudents();
    })
    
  }

window.submitForm =  function (){
    var studentName = document.getElementById("studentName");
    var gender = document.getElementById("gender");
    var stdClass = document.getElementById("class");
    var fatherName = document.getElementById("fatherName");
    var instituteName = document.getElementById("instituteName");
    var contactNumber = document.getElementById("contactNumber");
    var whatsAppNumber = document.getElementById("whatsAppNumber");
    var address = document.getElementById("address");
    var subjects = document.getElementById('subjects');
    var reference = document.getElementById('reference');

    if(studentName.value != "" && stdClass.value  != "" && fatherName.value  != "" && instituteName.value  != "" && contactNumber.value  != "" && whatsAppNumber.value  != "" && address.value  != "" && subjects.value  != "" && reference.value  != "" ){
      
        
        var obj = {
            studentName: studentName.value,
            gender: gender.value,
            stdClass: stdClass.value,
            fatherName: fatherName.value,
            instituteName: instituteName.value,
            contactNumber: contactNumber.value,
            whatsAppNumber: whatsAppNumber.value,
            address: address.value,
            subjects: subjects.value,
            reference: reference.value
        }

    var reference = ref(databs, 'Students/');
    var newRef = push(reference);
    obj.id = newRef.key;
    set(newRef,obj)
    getStudents();

    
        studentName.value = "";
        gender.value = "";
        stdClass.value = "";
        fatherName.value = "";
        instituteName.value = "";
        contactNumber.value = "";
        whatsAppNumber.value = "";
        address.value = "";
        subjects.value = "";
        reference.value = "";

        alert("Form Has Submitted");
    }
    else{
        alert("Kindly, Fill Complete Form")
    }
     
}


getStudents();
