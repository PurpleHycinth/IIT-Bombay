// static/js/script.js

// Function to add a course
function addCourse() {
    const title = document.getElementById("course-title").value;
    const code = document.getElementById("course-code").value;
    const description = document.getElementById("course-description").value;

    const data = { title, course_code: code, description };

    fetch("/api/courses/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Course added:", data);
        listCourses();
    })
    .catch(error => console.error("Error adding course:", error));
}

// Function to list all courses
function listCourses() {
    fetch("/api/courses/")
    .then(response => response.json())
    .then(data => {
        const courseTable = document.getElementById("course-table-body");
        courseTable.innerHTML = "";
        data.forEach(course => {
            const row = `<tr>
                <td>${course.title}</td>
                <td>${course.course_code}</td>
                <td>
                    <div class="action-icons">
                        <img src="/static/icons/view.png" alt="View" onclick="viewCourse(${course.id})">
                        <img src="/static/icons/delete.png" alt="Delete" onclick="deleteCourse(${course.id})">
                    </div>
                </td>
            </tr>`;
            courseTable.innerHTML += row;
        });
    })
    .catch(error => console.error("Error listing courses:", error));
}

// Function to view a course's details
function viewCourse(id) {
    fetch(`/api/courses/${id}/`)
    .then(response => response.json())
    .then(course => {
        alert(`Title: ${course.title}\nCode: ${course.course_code}\nDescription: ${course.description}`);
    })
    .catch(error => console.error("Error viewing course:", error));
}

// Function to delete a course
function deleteCourse(id) {
    fetch(`/api/courses/${id}/`, {
        method: "DELETE",
    })
    .then(() => {
        console.log("Course deleted");
        listCourses();
    })
    .catch(error => console.error("Error deleting course:", error));
}

// Function to add an instance of a course delivery
function addInstance() {
    const courseId = document.getElementById("select-course").value;
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;

    const data = { course: courseId, year, semester };

    fetch("/api/instances/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Instance added:", data);
        listInstances();
    })
    .catch(error => console.error("Error adding instance:", error));
}

// Function to list instances for a specific year and semester
function listInstances() {
    const year = document.getElementById("instance-year").value;
    const semester = document.getElementById("instance-semester").value;

    fetch(`/api/instances/${year}/${semester}/`)
    .then(response => response.json())
    .then(data => {
        const instanceTable = document.getElementById("instance-table-body");
        instanceTable.innerHTML = "";
        data.forEach(instance => {
            const row = `<tr>
                <td>${instance.course_title}</td>
                <td>${instance.year}-${instance.semester}</td>
                <td>${instance.course_code}</td>
                <td>
                    <div class="action-icons">
                        <img src="/static/icons/view.png" alt="View" onclick="viewInstance(${instance.id}, ${instance.year}, ${instance.semester})">
                        <img src="/static/icons/delete.png" alt="Delete" onclick="deleteInstance(${instance.id}, ${instance.year}, ${instance.semester})">
                    </div>
                </td>
            </tr>`;
            instanceTable.innerHTML += row;
        });
    })
    .catch(error => console.error("Error listing instances:", error));
}

// Function to view a course instance's details
function viewInstance(id, year, semester) {
    fetch(`/api/instances/${year}/${semester}/${id}/`)
    .then(response => response.json())
    .then(instance => {
        alert(`Course Title: ${instance.course_title}\nYear: ${instance.year}\nSemester: ${instance.semester}`);
    })
    .catch(error => console.error("Error viewing instance:", error));
}

// Function to delete a course instance
function deleteInstance(id, year, semester) {
    fetch(`/api/instances/${year}/${semester}/${id}/`, {
        method: "DELETE",
    })
    .then(() => {
        console.log("Instance deleted");
        listInstances();
    })
    .catch(error => console.error("Error deleting instance:", error));
}

// Initialize course and instance lists on page load
document.addEventListener("DOMContentLoaded", function() {
    listCourses();
    listInstances();
});
