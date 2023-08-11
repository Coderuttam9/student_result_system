const search_result = document.querySelector('.Search_result');
const show_marksSheet = document.getElementById("show_marksSheet")

search_result.onsubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    const oldStudentData = getDataLS('student');

    const findStudent = oldStudentData.find((item) => item.roll === data.roll && item.reg === data.reg);
    let content;
    if (findStudent) {
        content = `
            <div class="col-md-8 my-5">
                <img class=" my-5" src="${findStudent.photo}"
                    alt="">
                <h6> Name : <span>${findStudent.name}</span></h6>
                <h6> Roll :<span> ${findStudent.roll}</span></h6>
                <h6> Registration :<span>${findStudent.reg}</span></h6>
                <h6>Father Name :<span> Zack Mario </span></h6>
                <h6>Mother Name :<span> lui ling </span></h6>


                <table class="table-bordered table table-striped">

                    <tr>
                        <td> Subjec-code </td>
                        <td> Subject</td>
                        <td> Markes</td>
                        <td> Grade</td>
                        <td> GPA</td>
                        <td> CGPA</td>
                        <td> Fainal Result</td>
                    </tr>
                    <tr>
                        <td>100101</td>
                        <td>Bangla</td>
                        <td>${findStudent.Result.bangla}</td>
                        <td>${getResult(findStudent.Result.bangla).gpa}</td>
                        <td>${getResult(findStudent.Result.bangla).grade}</td>


                        <td class="align-middle" rowspan="6">${getFinalresult({
                            bangla : findStudent.Result.bangla,
                            english : findStudent.Result.english,
                            math : findStudent.Result.math,
                            social_science : findStudent.Result.social_science,
                            science : findStudent.Result.science,
                            reigion : findStudent.Result.reigion,
                        }).cgpa.toFixed(2)

                    }</td>

                        <td class="align-middle" rowspan="6"> ${getFinalresult({
                            bangla : findStudent.Result.bangla,
                            english : findStudent.Result.english,
                            math : findStudent.Result.math,
                            social_science : findStudent.Result.social_science,
                            science : findStudent.Result.science,
                            reigion : findStudent.Result.reigion,
                        }).result
                    }</td> 
                    </tr>
                    <tr>
                        <td>100102</td>
                        <td>English</td>
                        <td>${findStudent.Result.english}</td>
                        <td>${getResult(findStudent.Result.english).gpa}</td>
                        <td>${getResult(findStudent.Result.english).grade}</td>

                    </tr>
                    <tr>
                        <td>100103</td>
                        <td>Math</td>
                        <td>${findStudent.Result.math}</td>
                        <td>${getResult(findStudent.Result.math).gpa}</td>
                        <td>${getResult(findStudent.Result.math).grade}</td>

                    </tr>
                    <tr>
                        <td>100104</td>
                        <td>Social Science</td>
                        <td>${findStudent.Result.social_science}</td>
                        <td>${getResult(findStudent.Result.social_science).gpa}</td>
                        <td>${getResult(findStudent.Result.social_science).grade}</td>
                    </tr>
                    <tr>
                        <td>100105</td>
                        <td>Science</td>
                        <td>${findStudent.Result.science}</td>
                        <td>${getResult(findStudent.Result.science).gpa}</td>
                        <td>${getResult(findStudent.Result.science).grade}</td>

                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td>English</td>
                        <td>${findStudent.Result.reigion
                        }</td>
                        <td>${getResult(findStudent.Result.reigion).gpa}</td>
                        <td>${getResult(findStudent.Result.reigion).grade}</td>

                    </tr>
                </table>
            </div>
`
    } else {
        content = ` Result not Found`
    }
    show_marksSheet.innerHTML = content;

    e.target.reset();
}