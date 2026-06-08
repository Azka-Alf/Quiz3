// ======================================
// VENDING MACHINE OPTIMIZATION SIMULATOR
// ======================================

const runBtn = document.getElementById("runBtn");

let fitnessChart = null;

// ======================================
// BUTTON EVENT
// ======================================

runBtn.addEventListener("click", runSimulation);

// ======================================
// MAIN FUNCTION
// ======================================

async function runSimulation() {

    const algorithm =
        document.getElementById("algorithm").value;

    const students =
        parseInt(
            document.getElementById("students").value
        );

    const radius =
        parseInt(
            document.getElementById("radius").value
        );

    document.getElementById("statusBox").innerHTML =
        "Menjalankan simulasi...";

    try {

        const response = await fetch("/simulate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                algorithm: algorithm,
                students: students,
                radius: radius
            })

        });

        const data = await response.json();

        const studentData = data.students;
        const history = data.history;

        await animateSearch(
            studentData,
            history
        );

        updateTable(history);

        updateChart(history);

        showStatus(
            history,
            algorithm
        );

    }
    catch(error){

        console.error(error);

        document.getElementById("statusBox").innerHTML =
            "Terjadi kesalahan saat simulasi dijalankan.";

    }

}

// ======================================
// ANIMATION
// ======================================

async function animateSearch(students, history){

    const speed =
        parseInt(
            document.getElementById("speed").value
        );

    for(let i=1;i<=history.length;i++){

        drawCampus(
            students,
            history.slice(0,i)
        );

        await sleep(speed);
    }

}

// ======================================
// SLEEP
// ======================================

function sleep(ms){

    return new Promise(
        resolve => setTimeout(resolve,ms)
    );

}

// ======================================
// DRAW CAMPUS
// ======================================

function drawCampus(students, history){

    const canvas =
        document.getElementById("campusCanvas");

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const scale = 30;

    drawGrid(ctx, scale);

    drawStudents(
        ctx,
        students,
        scale
    );

    drawPath(
        ctx,
        history,
        scale
    );

    drawBestSolution(
        ctx,
        history,
        scale
    );

}

// ======================================
// GRID
// ======================================

function drawGrid(ctx, scale){

    ctx.strokeStyle = "#dddddd";

    for(let i=0;i<=20;i++){

        ctx.beginPath();
        ctx.moveTo(i*scale,0);
        ctx.lineTo(i*scale,600);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,i*scale);
        ctx.lineTo(600,i*scale);
        ctx.stroke();

    }

}

// ======================================
// STUDENTS
// ======================================

function drawStudents(ctx, students, scale){

    students.forEach(student=>{

        ctx.beginPath();

        ctx.fillStyle = "blue";

        ctx.arc(
            student[0]*scale,
            student[1]*scale,
            4,
            0,
            Math.PI*2
        );

        ctx.fill();

    });

}

// ======================================
// SEARCH PATH
// ======================================

function drawPath(ctx, history, scale){

    if(history.length === 0) return;

    ctx.beginPath();

    ctx.strokeStyle = "green";

    ctx.lineWidth = 3;

    history.forEach((step,index)=>{

        const x =
            step.position[0]*scale;

        const y =
            step.position[1]*scale;

        if(index === 0){

            ctx.moveTo(x,y);

        }
        else{

            ctx.lineTo(x,y);

        }

    });

    ctx.stroke();

    history.forEach(step=>{

        ctx.beginPath();

        ctx.fillStyle = "green";

        ctx.arc(
            step.position[0]*scale,
            step.position[1]*scale,
            5,
            0,
            Math.PI*2
        );

        ctx.fill();

    });

}

// ======================================
// BEST SOLUTION
// ======================================

function drawBestSolution(ctx, history, scale){

    if(history.length === 0) return;

    const best =
        history[history.length-1];

    const radius =
        parseInt(
            document.getElementById("radius").value
        );

    // Radius layanan

    ctx.beginPath();

    ctx.strokeStyle = "red";

    ctx.lineWidth = 2;

    ctx.arc(
        best.position[0]*scale,
        best.position[1]*scale,
        radius*scale,
        0,
        Math.PI*2
    );

    ctx.stroke();

    // Titik vending

    ctx.beginPath();

    ctx.fillStyle = "red";

    ctx.arc(
        best.position[0]*scale,
        best.position[1]*scale,
        10,
        0,
        Math.PI*2
    );

    ctx.fill();

}

// ======================================
// TABLE
// ======================================

function updateTable(history){

    const table =
        document.getElementById(
            "historyTable"
        );

    table.innerHTML = "";

    history.forEach((step,index)=>{

        table.innerHTML += `

        <tr>
            <td>${index+1}</td>
            <td>${step.position[0]}</td>
            <td>${step.position[1]}</td>
            <td>${step.fitness}</td>
        </tr>

        `;

    });

}

// ======================================
// CHART
// ======================================

function updateChart(history){

    const labels =
        history.map(
            (_,i)=>i+1
        );

    const fitness =
        history.map(
            item=>item.fitness
        );

    const ctx =
        document.getElementById(
            "fitnessChart"
        ).getContext("2d");

    if(fitnessChart){

        fitnessChart.destroy();

    }

    fitnessChart = new Chart(ctx,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Fitness",

                data:fitness,

                borderWidth:3,

                tension:0.25

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:true
                }

            }

        }

    });

}

// ======================================
// STATUS
// ======================================

function showStatus(history, algorithm){

    const best =
        history[history.length-1];

    const fitnessValues =
        history.map(
            h=>h.fitness
        );

    const maxFitness =
        Math.max(...fitnessValues);

    const condition =
        detectCondition(history);

    document.getElementById(
        "statusBox"
    ).innerHTML = `

        <b>Simulasi Selesai</b>
        <br><br>

        <b>Algoritma:</b>
        ${algorithm}
        <br>

        <b>Total Iterasi:</b>
        ${history.length}
        <br>

        <b>Posisi Terbaik:</b>
        (${best.position[0]},
        ${best.position[1]})
        <br>

        <b>Fitness:</b>
        ${best.fitness}
        <br>

        <b>Fitness Maksimum:</b>
        ${maxFitness}
        <br>

        <b>Kondisi:</b>
        ${condition}

    `;

}

// ======================================
// CONDITION DETECTOR
// ======================================

function detectCondition(history){

    if(history.length < 2){

        return "Local Optimum";

    }

    const last =
        history[history.length-1].fitness;

    const prev =
        history[history.length-2].fitness;

    if(last === prev){

        return "Plateau";

    }

    return "Local Optimum";

}

// ======================================
// RESET CANVAS
// ======================================

function clearCanvas(){

    const canvas =
        document.getElementById(
            "campusCanvas"
        );

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}