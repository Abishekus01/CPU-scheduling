function showDefinition() {
  const algo = document.getElementById("algo").value;
  let content = "";

  if (algo === "fcfs") {
    content = `
      <h2>First Come First Serve (FCFS)</h2>
      <p><b>Definition:</b> Processes are executed in the order they arrive in the ready queue (like a queue).</p>
      <p><b>Example:</b> P1(AT=0,BT=5), P2(AT=1,BT=3), P3(AT=2,BT=8)</p>
      <table>
        <tr><th>Process</th><th>AT</th><th>BT</th><th>CT</th><th>TAT</th><th>WT</th></tr>
        <tr><td>P1</td><td>0</td><td>5</td><td>5</td><td>5</td><td>0</td></tr>
        <tr><td>P2</td><td>1</td><td>3</td><td>8</td><td>7</td><td>4</td></tr>
        <tr><td>P3</td><td>2</td><td>8</td><td>16</td><td>14</td><td>6</td></tr>
      </table>
      <h3>Gantt Chart</h3>
      <div class="gantt">
        <span>P1</span><span>P2</span><span>P3</span>
      </div>
    `;
  }

  else if (algo === "sjf") {
    content = `
      <h2>Shortest Job First (SJF - Non-preemptive)</h2>
      <p><b>Definition:</b> The process with the smallest burst time is executed first.</p>
      <p><b>Example:</b> P1(AT=0,BT=6), P2(AT=1,BT=2), P3(AT=2,BT=8), P4(AT=3,BT=3)</p>
      <table>
        <tr><th>Process</th><th>AT</th><th>BT</th><th>CT</th><th>TAT</th><th>WT</th></tr>
        <tr><td>P1</td><td>0</td><td>6</td><td>6</td><td>6</td><td>0</td></tr>
        <tr><td>P2</td><td>1</td><td>2</td><td>8</td><td>7</td><td>5</td></tr>
        <tr><td>P4</td><td>3</td><td>3</td><td>11</td><td>8</td><td>5</td></tr>
        <tr><td>P3</td><td>2</td><td>8</td><td>19</td><td>17</td><td>9</td></tr>
      </table>
      <h3>Gantt Chart</h3>
      <div class="gantt">
        <span>P1</span><span>P2</span><span>P4</span><span>P3</span>
      </div>
    `;
  }

  else if (algo === "srtn") {
    content = `
      <h2>Shortest Remaining Time Next (SRTN)</h2>
      <p><b>Definition:</b> Preemptive version of SJF. At any time, the process with the smallest remaining burst time is executed.</p>
      <p><b>Example:</b> P1(AT=0,BT=7), P2(AT=2,BT=4), P3(AT=4,BT=1), P4(AT=5,BT=4)</p>
      <p><i>(Solved values simplified for demonstration)</i></p>
      <h3>Gantt Chart</h3>
      <div class="gantt">
        <span>P1</span><span>P2</span><span>P3</span><span>P2</span><span>P4</span><span>P1</span>
      </div>
    `;
  }

  else if (algo === "rr") {
    content = `
      <h2>Round Robin (RR)</h2>
      <p><b>Definition:</b> Each process is assigned a fixed time slice (quantum). After the quantum, the process is preempted and moved to the back of the queue.</p>
      <p><b>Example:</b> P1(AT=0,BT=5), P2(AT=1,BT=4), P3(AT=2,BT=2), Quantum = 2</p>
      <h3>Gantt Chart</h3>
      <div class="gantt">
        <span>P1</span><span>P2</span><span>P3</span><span>P1</span><span>P2</span><span>P1</span>
      </div>
    `;
  }

  else if (algo === "mlfq") {
    content = `
      <h2>Multi-Level Feedback Queue (MLFQ)</h2>
      <p><b>Definition:</b> Uses multiple queues with different priorities and time quantums. Processes can move between queues based on behavior.</p>
      <p><b>Example (simplified):</b> P1, P2, P3 in 3 queues with different quantums</p>
      <h3>Gantt Chart</h3>
      <div class="gantt">
        <span>P1</span><span>P2</span><span>P3</span><span>P1</span>
      </div>
    `;
  }

  document.getElementById("definition").innerHTML = content;
}
