const student_from_data = document.querySelector("#from-student-data");
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msgEidt");
const show_student = document.querySelector(".show-student");
const DeleteBtn = document.querySelector(".fa-trash")
const showSingleView = document.querySelector(".showSingleView");
const div = document.createElement("div");
const card_body = document.querySelector('.card-body');
const student_result_data = document.querySelector('.student-data-result');
const edite_student_formData = document.querySelector('.add-edit-data');
const data_result_edit_form = document.querySelector('#edit-student_result_data');





// show student data  in fonted 
const showStudent = () => {
        const students = getDataLS('student')
        let content = '';

        if (students.length > 0) {
            students.reverse().forEach((student, index) => {
                        content += ` <tr class="align-middle b-radious">
                            <td>${index+1}</td>
                            <td><img style="width: 60px; height:60px; border-radius: 50%; object-fit: cover;"
                             src="${student.photo}"
                                    alt="${student.name}"></td>
                            <td>${student.name}</td>
                            <td>${student.roll}</td>
                            <td>${student.reg}</td>
                            <td>${timeAgo(student.SeTtime)}</td>
                                
                            <td> ${student.Result === null ? `<button onclick ="addResult('${student.id}')" data-bs-toggle="modal" data-bs-target=".student-data-result" class="btn btn-sm btn-success"> Add result</button>`:
                                `<button  onclick ="editResultform('${student.id}')"  data-bs-toggle="modal" data-bs-target=".data-result-edit" class="btn btn-sm btn-warning">  View Marks</button>`} 
                            </td>
                            <td>
                                <button onclick="editUpdateData('${student.id}')" data-bs-toggle="modal" data-bs-target=".add-edit-data" class="btn btn-sm btn-info"><i class="fa fa-edit"></i></button>

                                <button onclick="showSingleData('${student.roll}')" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target=".student-single-view"><i class="fa fa-eye"></i></button>

                                <button onclick="DeleteStudent('${student.roll}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button> 
                            </td>
                          </tr>
                         `;


        });

    } else {
        content = `<strong><td class="text-center" colspan="8" >NO DATA FOUND</td></strong>`
    }
    show_student.innerHTML = content;
}

showStudent();

// All student data form submit 
student_from_data.onsubmit = (e) => {
    e.preventDefault();


    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    //  form validation start here e
    if (!data.name || !data.photo) {
        msg.innerHTML = createAlert(" All fileds are required", )
    } else if (!isNumber(data.roll)) {
        msg.innerHTML = createAlert(" Invalid roll number", )
    } else if (!isNumber(data.reg)) {
        msg.innerHTML = createAlert(" Invalid reg number", )
    } else {
        const oldStudentData = getDataLS('student');


        //  checking roll and registration  number 
        if (oldStudentData.some((item) => item.roll === data.roll)) {
            msg.innerHTML = createAlert(" Roll valready exisit", );
            return;
        } else if (oldStudentData.some((item) => item.reg === data.reg)) {
            msg.innerHTML = createAlert(" Reg valready exisit", );
            return;
        };


        oldStudentData.push({
            ...data,
            Result: null,
            SeTtime: Date.now(),
            id: getRandomId(22),
        });



        // set data in ls 
        setDataLs("student", oldStudentData);

        msg.innerHTML = createAlert("Successfuly data submited", "success");

        setTimeout(()=>{
            msg.innerHTML ="";
        },2000)
        // reset form value 
        e.target.reset();

        // show student list data 
        showStudent();


    }







};

// studet result submit form 
student_result_data.onsubmit=(e)=>{
    e.preventDefault();
    const  form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());



    // update data to ls 
    const oldStudentData = getDataLS('student');
    oldStudentData[oldStudentData.findIndex(item => item.id===data.id)]={
        ...oldStudentData[oldStudentData.findIndex(item => item.id===data.id)],
        Result: data,
    }
    setDataLs("student",oldStudentData)
    showStudent();
    e.target.reset();
    
}

//  set value  to edit form 
const editResultform =(id)=>{
    const data = getDataLS("student");
    const editresult = data.find((item)=>item.id===id);
  
    data_result_edit_form.querySelector('input[name="bangla"]').value = editresult.Result.bangla
    data_result_edit_form.querySelector('input[name= "english"]').value = editresult.Result.english
    data_result_edit_form.querySelector('input[name="math"]').value = editresult.Result.math
    data_result_edit_form.querySelector('input[name="social_science"]').value = editresult.Result.social_science
    data_result_edit_form.querySelector('input[name="science"]').value = editresult.Result.science
    data_result_edit_form.querySelector('input[name="reigion"]').value = editresult.Result.reigion
    data_result_edit_form.querySelector('input[name="id"]').value = editresult.Result.id


     
   }

// edit result form 
data_result_edit_form.onsubmit=(e)=>{
    e.preventDefault();

   
    const form_data = new FormData(e.target);
    const data = Object.fromEntries( form_data.entries());
 const oldStudentData = getDataLS('student');

 oldStudentData[oldStudentData.findIndex((item)=>item.id=== data.id)]={
    ...oldStudentData[oldStudentData.findIndex((item)=>item.id=== data.id)],
    Result:data,
 }
    setDataLs('student', data)
    setDataLs('student', oldStudentData)
    e.target.reset()
}


// Edit and update data to ls 
const editUpdateData =(id)=>{
const oldStudentData = getDataLS("student")
const editData=oldStudentData.find((data)=>data.id=== id);
edite_student_formData.querySelector('input[name="name"]').value= editData.name;
edite_student_formData.querySelector('input[name="roll"]').value= editData.roll;
edite_student_formData.querySelector('input[name="reg"]').value= editData.reg;
edite_student_formData.querySelector('input[name="id"]').value= editData.id;
edite_student_formData.querySelector('input[name="photo"]').value= editData.photo;
edite_student_formData.querySelector('img.editPriview').setAttribute("src", editData.photo)


}


// update data form 
edite_student_formData.onsubmit =(e)=>{
    e.preventDefault()
 const form_data = new FormData(e.target);
 const data = Object.fromEntries(form_data.entries())

 const getoldData = getDataLS('student');

// validation checkin 
//  if (getoldData.some((item) => item.roll === data.roll)) {
//    msgEdit.innerHTML = createAlert(" Roll valready exisit", );
//     return;
// } else if (getoldData.some((item) => item.reg === data.reg)) {
//     msgEdit.innerHTML = createAlert(" Reg valready exisit", );
//     return;
// };
  
    getoldData[getoldData.findIndex(item =>item.id === data.id)] = { 
        ...getoldData[getoldData.findIndex(item =>item.id === data.id)],
        ...data,
        Result: null,
    };
    setDataLs('student',getoldData);
    showStudent();
}

// Delete single clicking the Delete button 
const DeleteStudent = (roll) => {
    div.innerHTML = "delete successfully";
    div.classList.add("notify")
    card_body.appendChild(div);
    setTimeout(() => {

        card_body.removeChild(div);
    }, 1000)

    const oldStudentData = getDataLS('student');
    const updateData = oldStudentData.filter((data) => data.roll !== roll);
    setDataLs("student", updateData);
    showStudent();

};


//  add result functions 

const addResult =(id)=>{

  student_result_data.querySelector('input[name="id"]').value = id;
 
}

// single veiw for single student
const showSingleData = (roll) => {

    const oldStudentData = getDataLS('student');
    const single = oldStudentData.find((data) => data.roll == roll);

    showSingleView.innerHTML = ` <div class="text-center">

                                        <img class="my-3 single-image" style="width: 100px; height:100px; border-radius: 50%; object-fit: cover;" src="${single.photo}" alt="">

                                    </div>

                                    <table class="table table-striped ">
                                        <tbody >
                                            <tr>
                                                <hr>
                                            </tr>
                                            <tr>
                                                <td class="text-center" colspan="2">
                                                Name :</td>
                                                <td colspan="2"> ${single.name}</td>

                                            </tr>
                                            <tr>
                                                <td class="text-center" colspan="2">
                                                Roll :</td>
                                                <td colspan="6"> ${single.roll} </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center" colspan="2">
                                                Reg :
                                                    <td colspan="6"> ${single.reg} </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center" colspan="2"> GPA :</td>
                                                <td colspan="6"> ${null}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                        <div clsss>
                                        <p class="text-center">Powerd by : Codder</p>

                                </div>`


}