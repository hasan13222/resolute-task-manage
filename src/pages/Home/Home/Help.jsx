import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Help = () => {
  return (
    <>
      <div className="container-fluid help-full py-8 border border-indigo-50">
        <div className="container help-wrap mx-auto relative z-10">
          <h2 className="text-center font-bold my-5 text-2xl">How it Helps</h2>
          <Tabs className="mx-w-[900px] w-auto mx-auto px-3">
            <TabList>
              <Tab>Professionals</Tab>
              <Tab>IT</Tab>
              <Tab>Marketing</Tab>
            </TabList>

            <TabPanel>
              <p> For corporate professionals, project management apps help organize
              tasks, deadlines, and team collaboration. It enables better
              communication among team members, streamlines workflow, and
              ensures projects are completed on time and within budget.</p>
              <p>
              Marketing teams often handle multiple campaigns simultaneously. Project management apps help organize each campaign by creating tasks, setting deadlines, and monitoring progress to ensure campaigns are executed effectively.
              </p>
              <p>
              These apps facilitate content planning by outlining content calendars, assigning tasks for content creation, editing, and reviewing. They aid in maintaining consistency across various content platforms.
              </p>
            </TabPanel>
            <TabPanel>
              <p> Project management apps are highly useful for IT and software
              development teams. They assist in managing complex tasks, tracking
              bugs, handling sprints (if using Agile methodology), and
              maintaining efficient communication among developers, designers,
              and testers.</p>
              <p>
              IT projects involve multiple tasks with varying levels of importance. Project management tools help in prioritizing tasks, allocating resources, and focusing on critical components to meet project deadlines.
              </p>
              <p>
              For teams following Agile methodologies, project management apps often include features like Kanban boards, sprint planning, and burndown charts, aiding in Agile project management and facilitating iterative development.
              </p>
            </TabPanel>
            <TabPanel>
              <p>Professionals in marketing and advertising often handle multiple
              campaigns and deadlines. Project management apps can assist in
              coordinating marketing strategies, content creation, scheduling,
              and monitoring campaign progress across various platforms.</p>
              <p>
              Marketing teams often handle multiple campaigns simultaneously. Project management apps help organize each campaign by creating tasks, setting deadlines, and monitoring progress to ensure campaigns are executed effectively.
              </p>
              <p>
              These apps facilitate content planning by outlining content calendars, assigning tasks for content creation, editing, and reviewing. They aid in maintaining consistency across various content platforms.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Help;
