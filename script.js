function generateInputs() {
  const n = document.getElementById("numProc").value;
  let html = "<table><tr><th>PID</th><th>Arrival Time</th><th>Burst Time</th></tr>";
  for (let i = 0; i < n; i++) {
    html += `<tr>
      <td>P${i}</td>
      <td><input type="number" id="at${i}" value="0"></td>
      <td><input type="number" id="bt${i}" value="1"></td>
    </tr>`;
  }
  html += "</table>";
  document.getElementById("procInputs").innerHTML = html;
}

function runSimulation() {
  const n = document.getElementById("numProc").value;
  const algo = document.getElementById("algo").value;
  const tq = parseInt(document.getElementById("tq").value) || 2;

  let processes = [];
  for (let i = 0; i < n; i++) {
    processes.push({
      id: i,
      at: parseInt(document.getElementById("at"+i).value),
      bt: parseInt(document.getElementById("bt"+i).value),
      ct: 0, tat: 0, wt: 0, remaining: 0
    });
  }

  if (algo === "fcfs") fcfs(processes);
  else if (algo === "sjf") sjf(processes);
  else if (algo === "srtn") srtn(processes);
  else if (algo === "rr") rr(processes, tq);
  else if (algo === "mlfq") mlfq(processes);
}

function printTable(p, title) {
  let html = `<h2>${title}</h2><table><tr>
    <th>PID</th><th>AT</th><th>BT</th><th>CT</th><th>TAT</th><th>WT</th>
  </tr>`;
  let avgTAT = 0, avgWT = 0;
  p.forEach(pr => {
    html += `<tr>
      <td>P${pr.id}</td><td>${pr.at}</td><td>${pr.bt}</td>
      <td>${pr.ct}</td><td>${pr.tat}</td><td>${pr.wt}</td>
    </tr>`;
    avgTAT += pr.tat; avgWT += pr.wt;
  });
  html += `</table><p><b>Average TAT:</b> ${(avgTAT/p.length).toFixed(2)} |
           <b>Average WT:</b> ${(avgWT/p.length).toFixed(2)}</p>`;
  document.getElementById("output").innerHTML = html;
}

// ----- Scheduling Algorithms -----
function fcfs(p) {
  p.sort((a,b)=>a.at-b.at);
  let t=0;
  p.forEach(pr=>{
    if(t<pr.at) t=pr.at;
    pr.ct=t+pr.bt; t=pr.ct;
    pr.tat=pr.ct-pr.at; pr.wt=pr.tat-pr.bt;
  });
  printTable(p,"FCFS Scheduling");
}

function sjf(p) {
  p.sort((a,b)=>a.at-b.at);
  let t=0, done=0, n=p.length, vis=Array(n).fill(false);
  while(done<n){
    let idx=-1,min=1e9;
    for(let i=0;i<n;i++)
      if(!vis[i] && p[i].at<=t && p[i].bt<min){min=p[i].bt; idx=i;}
    if(idx===-1){t++; continue;}
    t+=p[idx].bt;
    p[idx].ct=t; p[idx].tat=t-p[idx].at; p[idx].wt=p[idx].tat-p[idx].bt;
    vis[idx]=true; done++;
  }
  printTable(p,"SJF Scheduling");
}

function srtn(p) {
  let n=p.length;
  p.forEach(pr=>pr.remaining=pr.bt);
  let t=0,done=0;
  while(done<n){
    let idx=-1,min=1e9;
    for(let i=0;i<n;i++)
      if(p[i].at<=t && p[i].remaining>0 && p[i].remaining<min){min=p[i].remaining; idx=i;}
    if(idx===-1){t++; continue;}
    p[idx].remaining--; t++;
    if(p[idx].remaining===0){
      done++; p[idx].ct=t; p[idx].tat=t-p[idx].at; p[idx].wt=p[idx].tat-p[idx].bt;
    }
  }
  printTable(p,"SRTN Scheduling");
}

function rr(p,tq){
  let n=p.length,rem=p.map(pr=>pr.bt),t=0,q=[],inQ=Array(n).fill(false);
  q.push(0); inQ[0]=true;
  while(q.length){
    let i=q.shift();
    if(t<p[i].at) t=p[i].at;
    let exec=Math.min(tq,rem[i]); t+=exec; rem[i]-=exec;
    for(let j=0;j<n;j++)
      if(!inQ[j] && p[j].at<=t && rem[j]>0){q.push(j); inQ[j]=true;}
    if(rem[i]>0) q.push(i);
    else {p[i].ct=t; p[i].tat=p[i].ct-p[i].at; p[i].wt=p[i].tat-p[i].bt;}
  }
  printTable(p,`Round Robin (TQ=${tq})`);
}

function mlfq(p){
  let n=p.length,rem=p.map(pr=>pr.bt),t=0,q1=[],q2=[],q3=[],inQ=Array(n).fill(false);
  let tq1=2,tq2=4; q1.push(0); inQ[0]=true;
  while(q1.length||q2.length||q3.length){
    let i,tq;
    if(q1.length){i=q1.shift(); tq=tq1;}
    else if(q2.length){i=q2.shift(); tq=tq2;}
    else {i=q3.shift(); tq=rem[i];}
    if(t<p[i].at) t=p[i].at;
    let exec=Math.min(tq,rem[i]); t+=exec; rem[i]-=exec;
    for(let j=0;j<n;j++)
      if(!inQ[j] && p[j].at<=t && rem[j]>0){q1.push(j); inQ[j]=true;}
    if(rem[i]>0){
      if(tq===tq1) q2.push(i);
      else if(tq===tq2) q3.push(i);
      else q3.push(i);
    }else {p[i].ct=t; p[i].tat=p[i].ct-p[i].at; p[i].wt=p[i].tat-p[i].bt;}
  }
  printTable(p,"MLFQ Scheduling");
}