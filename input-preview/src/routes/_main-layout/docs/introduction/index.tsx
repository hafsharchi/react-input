import { createFileRoute } from "@tanstack/react-router";
import DocsBreadcrumb from "../-components/DocsBreadcrumb";

export const Route = createFileRoute("/_main-layout/docs/introduction/")({
  component: Introduction,
});

function Introduction() {
  return (
    <div>
      <DocsBreadcrumb page="Introduction" />
      <h2>Introduction</h2>
      <p>
        Are you tired of wrestling with complex form logic, repetitive
        validation code, and excessive re-renders in your React applications?
        Say hello to FormMaster, the game-changing form management component
        that's about to revolutionize the way you build forms in React.
      </p>
      <br />
      <p>
        FormMaster is a powerful, lightweight, and highly customizable solution
        designed to simplify your form development process. By leveraging the
        efficiency of refs and smart state management, FormMaster dramatically
        reduces unnecessary re-renders, resulting in smoother, more responsive
        user interfaces.
      </p>
      <br />
      <span className="font-gblack">Key Features:</span>
      <ul>
        <li>
          - Optimized Performance: Enjoy significantly fewer re-renders compared
          to traditional useState approaches.
        </li>
        <li>
          - Comprehensive Input Types: Seamlessly handle text, decimal, integer,
          calendar, and select inputs out of the box, with more types coming
          soon.
        </li>
        <li>
          - Effortless Validation: Implement complex validation rules with ease,
          saving you time and headaches.
        </li>
        <li>
          - Flexible and Extensible: Designed to grow with your needs,
          FormMaster is perfect for projects of all sizes.
        </li>
      </ul>
      <br />
      <p>
        Whether you're building a simple contact form or a complex multi-step
        wizard, FormMaster has got you covered. Its intuitive API makes form
        creation a breeze, allowing you to focus on what matters most – creating
        great user experiences.
      </p>
      <br />
      <p>
        Don't let form management slow you down. Upgrade your React toolkit with
        FormMaster and experience the joy of hassle-free form development today.
        Try it now and see why developers are calling it the missing piece in
        their React arsenal!
      </p>
    </div>
  );
}
