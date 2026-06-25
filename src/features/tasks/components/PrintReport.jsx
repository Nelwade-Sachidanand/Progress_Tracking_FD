import React from "react";

export default function PrintReport({
  project,
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
}) {
  if (!project) return null;

  // Flatten all activities
  const allActivities =
    project?.phases?.flatMap((phase) =>
      phase.milestones?.flatMap((milestone) =>
        milestone.tasks?.flatMap((task) =>
          task.subTasks?.flatMap((subTask) =>
            subTask.activities?.map((activity) => ({
              ...activity,
              phase: phase.phaseName,
              milestone: milestone.milestoneName,
              task: task.taskName,
              subTask: subTask.subTaskName,
            })) || []
          ) || []
        ) || []
      ) || []
    ) || [];

  // Apply filters
  const activities = allActivities.filter((activity) => {
    const phaseMatch =
      !selectedPhase ||
      selectedPhase === "All Phases" ||
      activity.phase === selectedPhase;

    const milestoneMatch =
      !selectedMilestone ||
      selectedMilestone.length === 0 ||
      selectedMilestone.includes(activity.milestone);

    const taskMatch =
      !selectedTask ||
      selectedTask === "All Tasks" ||
      activity.task === selectedTask;

    const subTaskMatch =
      !selectedSubTask ||
      selectedSubTask === "All Sub Tasks" ||
      activity.subTask === selectedSubTask;

    const activityMatch =
      !selectedActivity ||
      selectedActivity === "All Activities" ||
      activity.activityName === selectedActivity;

    const statusMatch =
      !selectedStatus ||
      selectedStatus === "All Status" ||
      activity.executionStatus === selectedStatus;

    return (
      phaseMatch &&
      milestoneMatch &&
      taskMatch &&
      subTaskMatch &&
      activityMatch &&
      statusMatch
    );
  });

  const total = activities.length;

  const completed = activities.filter(
    (a) => a.executionStatus === "Completed"
  ).length;

  const delayed = activities.filter(
    (a) => a.scheduleHealth === "Delayed"
  ).length;

  const inProgress = activities.filter(
    (a) => a.executionStatus === "In Progress"
  ).length;

  const notStarted = activities.filter(
    (a) => a.executionStatus === "Not Started"
  ).length;

  const overall =
    total > 0
      ? Math.round(
          activities.reduce(
            (sum, a) => sum + (a.progress || 0),
            0
          ) / total
        )
      : 0;

  return (
    <div style={{ padding: "30px", background: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>
        PROJECT PROGRESS REPORT
      </h1>

      <hr />

      <h2>Project Information</h2>

      <table width="100%">
        <tbody>
          <tr>
            <td><b>Project</b></td>
            <td>{project.projectName}</td>

            <td><b>Bank</b></td>
            <td>{project.bankName}</td>
          </tr>

          <tr>
            <td><b>Manager</b></td>
            <td>{project.projectManager}</td>

            <td><b>Date</b></td>
            <td>{new Date().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <h2>Executive Summary</h2>

      <table
        width="100%"
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Total</th>
            <th>Completed</th>
            <th>In Progress</th>
            <th>Delayed</th>
            <th>Not Started</th>
            <th>Overall Progress</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{total}</td>
            <td>{completed}</td>
            <td>{inProgress}</td>
            <td>{delayed}</td>
            <td>{notStarted}</td>
            <td>{overall}%</td>
          </tr>
        </tbody>
      </table>

      <br />

      <h2>Activity Details</h2>

      <table
        width="100%"
        border="1"
        cellPadding="6"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Phase</th>
            <th>Milestone</th>
            <th>Task</th>
            <th>Sub Task</th>
            <th>Activity</th>
            <th>Owner</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Schedule</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.phase}</td>
              <td>{activity.milestone}</td>
              <td>{activity.task}</td>
              <td>{activity.subTask}</td>
              <td>{activity.activityName}</td>
              <td>{activity.owner}</td>
              <td>{activity.progress}%</td>
              <td>{activity.executionStatus}</td>
              <td>{activity.scheduleHealth}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p
        style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: "12px",
        }}
      >
        Generated by Progress Tracking System
      </p>
    </div>
  );
}