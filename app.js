const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let employees = [
    { id: 1, name: "Naithan", designation: "Developer", location: "Kerala", salary: 50000 },
    { id: 2, name: "Godwin", designation: "Cyber Security", location: "Mangalore", salary: 60000 }
];


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { employees });
});

app.get('/add', (req, res) => {
    res.render('add-employee');
});


app.post('/add', (req, res) => {
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name: employeeName,
        designation: employeeDesignation,
        location: employeeLocation,
        salary: parseFloat(employeeSalary)
    };
    employees.push(newEmployee);
    res.redirect('/');
});


app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === parseInt(id));

    if (employee) {
        res.render('edit-employee', { employee });
    } else {
        res.redirect('/');
    }
});


app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;

    let employee = employees.find(emp => emp.id === parseInt(id));

    if (employee) {
        employee.name = employeeName;
        employee.designation = employeeDesignation;
        employee.location = employeeLocation;
        employee.salary = parseFloat(employeeSalary);
    }

    res.redirect('/');
});


app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    employees = employees.filter(emp => emp.id !== parseInt(id));
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Employee app listening on port 3000!');
});
